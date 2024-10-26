import { STOP } from "./constants";
import {
  FETCHER_OPTIONS_KEYS,
  HTTP_METHODS,
  MAX_SAFE_TIMEOUT,
  REQUEST_OPTIONS_REGISTRY,
  RESPONSE_TYPES,
} from "./constants";
import { HttpError } from "./errors";
import { mergeHeaders, mergeHooks, validateOptionsAndMerge } from "./merge";
import timeout from "./timeout";
import type {
  FetcherRequestInit,
  Input,
  InternalOptions,
  Options,
  SearchParamsInit,
} from "./types/options";
import type { ResponsePromise } from "./types/response";
import type { ObjectEntries } from "./types/utils";

export class Fetcher {
  public request: Request;
  protected abortController?: AbortController;
  protected input: Input;
  protected options: InternalOptions;

  private constructor(input: Input, options: Options = {}) {
    this.input = input;
    this.options = {
      ...options,
      method:
        options.method ??
        (this.input instanceof Request ? this.input.method : "get"),
      baseUrl: "",
      timeout: options.timeout ?? 10_000,
      headers:
        this.input instanceof Request
          ? mergeHeaders(this.input.headers, options.headers)
          : mergeHeaders(options.headers),
      hooks: mergeHooks(
        {
          beforeRequest: [],
          afterResponse: [],
          beforeError: [],
        },
        options.hooks,
      ),
      fetch: options.fetch ?? globalThis.fetch.bind(globalThis),
    };

    // input 검증
    if (
      typeof this.input !== "string" &&
      !(this.input instanceof URL || this.input instanceof Request)
    ) {
      throw new TypeError("`input` must be a string, URL, or Request");
    }

    // baseUrl
    if (this.options.baseUrl && typeof this.input === "string") {
      this.input = this.options.baseUrl + this.input;
    }

    // abortController
    if (typeof globalThis.AbortController === "function") {
      this.abortController = new globalThis.AbortController();

      const originalSignal =
        this.options.signal ??
        (this.input instanceof Request ? this.input.signal : null) ??
        null;

      originalSignal?.addEventListener("abort", () => {
        this.abortController?.abort();
      });

      this.options.signal = this.abortController.signal;
    }

    // json
    if (this.options.json) {
      this.options.body =
        this.options.stringifyJson?.(this.options.json) ??
        JSON.stringify(this.options.json);
      this.options.headers.set(
        "content-type",
        this.options.headers.get("content-type") ?? "application/json",
      );
    }

    // request
    this.request = new globalThis.Request(this.input, this.options);

    if (this.options.searchParams) {
      const textSearchParams =
        typeof this.options.searchParams === "string"
          ? this.options.searchParams.replace(/^\?/, "")
          : new URLSearchParams(
              this.options.searchParams as unknown as SearchParamsInit,
            ).toString();

      const searchParams = "?" + textSearchParams;
      const url = this.request.url.replace(/(?:\?.*?)?(?=#|$)/, searchParams);

      // FormData나 URLSearchParams를 body로 보낼 때는 content-type 헤더를 수동으로 설정하면 안됨
      // 브라우저가 자동으로 적절한 content-type과 form boundary를 설정하도록 하기 위해 헤더를 삭제
      // - FormData의 경우: multipart/form-data; boundary=xxx 형식으로 자동 설정됨
      // - URLSearchParams의 경우: application/x-www-form-urlencoded로 자동 설정됨
      if (
        // FormData를 지원하고 body가 FormData인 경우 또는 URLSearchParams인 경우
        ((typeof globalThis.FormData === "function" &&
          this.options.body instanceof globalThis.FormData) ||
          this.options.body instanceof URLSearchParams) &&
        // 사용자가 직접 content-type 헤더를 설정하지 않은 경우에만
        !(
          this.options.headers &&
          (this.options.headers as unknown as Record<string, string>)[
            "content-type"
          ]
        )
      ) {
        this.request.headers.delete("content-type");
      }

      this.request = new globalThis.Request(url, {
        ...this.request,
      } as RequestInit);
    }
  }

  static create(input: Input, options?: Options) {
    const fetcher = new Fetcher(input, options);

    // 요청을 수행하고 응답을 처리하는 함수
    async function request() {
      if (
        fetcher.options.timeout &&
        fetcher.options.timeout > MAX_SAFE_TIMEOUT
      ) {
        throw new RangeError(
          `Timeout value cannot be greater than ${MAX_SAFE_TIMEOUT}`,
        );
      }

      let response = await fetcher.fetch();

      // 응답 훅
      for (const hook of fetcher.options.hooks.afterResponse) {
        const hookResult = await hook(
          fetcher.request,
          fetcher.options as FetcherRequestInit,
          fetcher.decorateResponse(response.clone()),
        );

        if (hookResult instanceof globalThis.Response) {
          response = hookResult;
        }
      }

      response = fetcher.decorateResponse(response);

      // 에러 훅 및 에러 발생
      if (!response.ok) {
        let error = new HttpError(
          fetcher.request,
          response,
          fetcher.options as FetcherRequestInit,
        );

        for (const hook of fetcher.options.hooks.beforeError) {
          error = await hook(error);
        }

        throw error;
      }

      return response;
    }

    const result = request() as ResponsePromise;

    // 응답 타입에 따른 메서드 추가
    for (const [type, mimeType] of Object.entries(
      RESPONSE_TYPES,
    ) as ObjectEntries<typeof RESPONSE_TYPES>) {
      result[type] = async () => {
        const accept = fetcher.request.headers.get("accept");
        fetcher.request.headers.set("accept", accept || mimeType);

        const awaitedResult = await result;
        const response = awaitedResult.clone();

        if (type === "json") {
          if (response.status === 204) {
            return "";
          }

          const arrayBuffer = await response.clone().arrayBuffer();
          const responseSize = arrayBuffer.byteLength;
          if (responseSize === 0) {
            return "";
          }

          if (options?.parseJson) {
            return options.parseJson!(await response.text());
          }
        }

        return response[type]();
      };
    }

    return result;
  }

  protected async fetch(): Promise<Response> {
    for (const hook of this.options.hooks.beforeRequest) {
      const result = await hook(
        this.request,
        this.options as FetcherRequestInit,
      );

      if (result instanceof Request) {
        this.request = result;
        break;
      }

      if (result instanceof Response) {
        return result;
      }
    }

    function findUnknownOptions(
      request: Request,
      options: Record<string, unknown>,
    ) {
      const unknownOptions: Record<string, unknown> = {};

      for (const key in options) {
        if (
          !(key in REQUEST_OPTIONS_REGISTRY) &&
          !(key in FETCHER_OPTIONS_KEYS) &&
          !(key in request)
        ) {
          unknownOptions[key] = options[key];
        }
      }

      return unknownOptions;
    }

    const nonRequestOptions = findUnknownOptions(
      this.request,
      this.options as unknown as Record<string, unknown>,
    );

    if (!this.options.timeout) {
      return this.options.fetch(this.request, nonRequestOptions);
    }

    return timeout(
      this.request,
      nonRequestOptions,
      this.options.timeout,
      this.options.fetch,
      this.abortController,
    );
  }

  protected decorateResponse(response: Response) {
    if (this.options.parseJson) {
      response.json = async () =>
        this.options.parseJson!(await response.text());
    }

    return response;
  }
}

interface FetcherInstance {
  <T>(url: Input, options?: Options): ResponsePromise<T>;
  get: <T>(url: Input, options?: Options) => ResponsePromise<T>;
  post: <T>(url: Input, options?: Options) => ResponsePromise<T>;
  put: <T>(url: Input, options?: Options) => ResponsePromise<T>;
  patch: <T>(url: Input, options?: Options) => ResponsePromise<T>;
  head: (url: Input, options?: Options) => ResponsePromise;
  delete: <T>(url: Input, options?: Options) => ResponsePromise<T>;
  create: (defaultOptions?: Options) => FetcherInstance;
  extend: (
    defaultOptions: Options | ((parentOptions: Options) => Options),
  ) => FetcherInstance;
  readonly stop: typeof STOP;
}

export function createInstance(defaultOptions?: Partial<Options>) {
  const fetcher: Partial<FetcherInstance> = (input: Input, options?: Options) =>
    Fetcher.create(input, validateOptionsAndMerge(defaultOptions, options));

  // 메서드 추가
  for (const method of HTTP_METHODS) {
    fetcher[method] = (input: Input, options?: Options) =>
      Fetcher.create(
        input,
        validateOptionsAndMerge(defaultOptions, options ?? {}, { method }),
      );
  }

  fetcher.create = (newOptions?: Partial<Options>) =>
    createInstance(validateOptionsAndMerge(newOptions));
  fetcher.extend = (
    newOptions?:
      | Partial<Options>
      | ((parentDefaults: Partial<Options>) => Partial<Options>),
  ) => {
    if (typeof newOptions === "function") {
      newOptions = newOptions(defaultOptions ?? {});
    }

    return createInstance(validateOptionsAndMerge(defaultOptions, newOptions));
  };

  Object.defineProperty(fetcher, "stop", {
    value: STOP,
    writable: false,
    configurable: false,
  });

  return fetcher as FetcherInstance;
}
