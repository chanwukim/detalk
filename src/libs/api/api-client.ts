import clientEnv from "@/config/client-env";

import { ApiError } from "./errors";

type Primitive = string | number | boolean | undefined | null;
type QueryString = Record<string, Primitive | Primitive[]>;

type HttpClientOptions = {
  baseUrl: string;
  headers?: RequestInit["headers"];
  credentials?: RequestInit["credentials"];
};

type RequestOptions = {
  headers?: RequestInit["headers"];
  body?: unknown;
  query?: QueryString;
  credentials?: RequestInit["credentials"];
  // https://nextjs.org/docs/app/api-reference/functions/fetch
  cache?: RequestInit["cache"];
  next?: NextFetchRequestConfig;
};

export class ApiClient {
  private readonly internalOptions: HttpClientOptions;

  constructor(options: HttpClientOptions) {
    this.internalOptions = options;
  }

  public async get<T>(path: string, options?: RequestOptions) {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  public async post<T>(path: string, options?: RequestOptions) {
    return this.request<T>(path, { ...options, method: "POST" });
  }

  public async put<T>(path: string, options?: RequestOptions) {
    return this.request<T>(path, { ...options, method: "PUT" });
  }

  public async patch<T>(path: string, options?: RequestOptions) {
    return this.request<T>(path, { ...options, method: "PATCH" });
  }

  public async delete<T>(path: string, options?: RequestOptions) {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }

  private async request<T>(
    path: string,
    options: RequestOptions & { method: RequestInit["method"] },
  ) {
    const {
      method = "GET",
      headers,
      body,
      query,
      credentials,
      cache = "no-store",
      next,
    } = options;

    const url = new URL(`${this.internalOptions.baseUrl}${path}`);

    if (query) {
      Object.entries(query)
        .filter(([_, value]) => value !== undefined && value !== null)
        .forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((item) => {
              url.searchParams.append(key, String(item));
            });
          } else {
            url.searchParams.append(key, String(value));
          }
        });
    }

    const requestHeaders: RequestInit["headers"] & {
      "Content-Type"?: string;
    } = {
      ...this.internalOptions.headers,
      ...headers,
    };

    let requestBody: BodyInit | null = null;
    if (body !== undefined && body !== null) {
      if (body instanceof FormData) {
        requestBody = body;
        delete requestHeaders["Content-Type"];
      } else {
        requestBody = JSON.stringify(body);
        requestHeaders["Content-Type"] = "application/json";
      }
    }

    const request = new Request(url, {
      method,
      headers: requestHeaders,
      body: requestBody,
      credentials,
      cache,
      next,
    });

    const response = await fetch(request);

    if (!response.ok) {
      const errorBody = await response.json();
      throw new ApiError({
        request,
        response,
        message: errorBody.message,
        code: errorBody.code,
        details: errorBody.details,
      });
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const arrayBuffer = await response.clone().arrayBuffer();
    if (arrayBuffer.byteLength === 0) {
      return undefined as T;
    }

    return response.json() as T;
  }
}

export const apiClient = new ApiClient({
  baseUrl: `${clientEnv.baseUrl}/api`,
});
