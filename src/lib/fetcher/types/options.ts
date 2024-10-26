import type { HTTP_METHODS } from "../constants";

import type { Hooks } from "./hooks";
import type { LiteralUnion } from "./utils";

export type HttpMethod = (typeof HTTP_METHODS)[number];

export type Input = string | URL | Request;

export type Fetch = (input: Input, init?: RequestInit) => Promise<Response>;

export type SearchParamsInit =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

export type SearchParamsOption =
  | SearchParamsInit
  | Record<string, string | number | boolean>
  | Array<Array<string | number | boolean>>;

export type FetcherHeadersInit =
  | NonNullable<RequestInit["headers"]>
  | Record<string, string | undefined>;

/** Fetcher 커스텀 옵션 */
export interface FetcherOptions {
  /** JSON.stringify 자동 호출 */
  json?: unknown;

  /** 사용자 정의 JSON 파서 */
  parseJson?: (value: string) => unknown;

  /** 사용자 정의 JSON 파서 */
  stringifyJson?: (value: unknown) => string;

  /** 쿼리 문자열 자동 호출 */
  searchParams?: SearchParamsOption;

  /** 기본 URL */
  baseUrl?: string;

  /** 요청 제한 시간 */
  timeout?: number;

  /** 훅 */
  hooks?: Hooks;

  /** 사용자 정의 fetch */
  fetch?: Fetch;
}

export type FetcherOptionsRegistry = {
  [K in keyof FetcherOptions]-?: true;
};

/** HTTP 요청을 보낼 때 사용되는 옵션 */
export interface Options extends FetcherOptions, Omit<RequestInit, "headers"> {
  /** 요청 메서드 */
  method?: LiteralUnion<HttpMethod>;

  /** 	HTTP headers used to make the request.

	You can pass a `Headers` instance or a plain object.

	You can remove a header with `.extend()` by passing the header with an `undefined` value. */
  headers?: FetcherHeadersInit;
}

/** 내부 옵션 */
export interface InternalOptions extends Omit<Options, "hooks"> {
  // 강제설정
  fetch: Fetch;
  baseUrl: string;
  headers: Required<Headers>;
  hooks: Required<Hooks>;
}

/**
 * fetch와 beforeRequest 훅에 전달되는 옵션
 */
export interface FetcherRequestInit extends RequestInit {
  // 요청 메서드, 인증 정보 강제 설정
  method: NonNullable<RequestInit["method"]>;
  credentials: NonNullable<RequestInit["credentials"]>;

  // Fetcher 옵션 강제 설정
  baseUrl: string;
}
