import type { FetcherOptionsRegistry } from "./types/options";
import type { RequestInitRegistry } from "./types/request";

export const STOP = Symbol("stop");

// The maximum value of a 32bit int
export const MAX_SAFE_TIMEOUT = 2_147_483_647;

export const HTTP_METHODS = [
  "get",
  "post",
  "put",
  "patch",
  "head",
  "delete",
] as const;

export const RESPONSE_TYPES = {
  json: "application/json",
  text: "text/*",
  formData: "multipart/form-data",
  arrayBuffer: "*/*",
  blob: "*/*",
} as const;

export const REQUEST_OPTIONS_REGISTRY: RequestInitRegistry = {
  method: true,
  headers: true,
  body: true,
  mode: true,
  credentials: true,
  cache: true,
  redirect: true,
  referrer: true,
  referrerPolicy: true,
  integrity: true,
  keepalive: true,
  signal: true,
  window: true,
  dispatcher: true,
  duplex: true,
  priority: true,
  // next 옵션은 타입스크립트에서 정의되지 않은 옵션이므로 추가
  next: true,
} as const;

export const FETCHER_OPTIONS_KEYS: FetcherOptionsRegistry = {
  json: true,
  parseJson: true,
  stringifyJson: true,
  searchParams: true,
  baseUrl: true,
  timeout: true,
  hooks: true,
  fetch: true,
} as const;
