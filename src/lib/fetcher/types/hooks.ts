import type { HttpError } from "../errors";

import type { FetcherRequestInit } from "./options";
import type { FetcherRequest } from "./request";
import type { FetcherResponse } from "./response";

export type BeforeRequestHook = (
  request: FetcherRequest,
  options: FetcherRequestInit,
) => Request | Response | void | Promise<Request | Response | void>;

export type AfterResponseHook = (
  request: FetcherRequest,
  options: FetcherRequestInit,
  response: FetcherResponse,
) => Response | void | Promise<Response | void>;

export type BeforeErrorHook = (
  error: HttpError,
) => HttpError | Promise<HttpError>;

export interface Hooks {
  beforeRequest?: BeforeRequestHook[];
  afterResponse?: AfterResponseHook[];
  beforeError?: BeforeErrorHook[];
}
