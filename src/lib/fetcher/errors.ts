import type { FetcherRequestInit } from "./types/options";
import type { FetcherRequest } from "./types/request";
import type { FetcherResponse } from "./types/response";

export class HttpError extends Error {
  public response: FetcherResponse;
  public request: FetcherRequest;
  public options: FetcherRequestInit;

  constructor(
    request: Request,
    response: Response,
    options: FetcherRequestInit,
    message?: string,
  ) {
    super(message ?? `Request failed with status code ${response.status}`);
    this.name = "HttpError";
    this.request = request;
    this.response = response;
    this.options = options;
  }
}

export class TimeoutError extends Error {
  public request: FetcherRequest;

  constructor(request: Request) {
    super(`Request timed out: ${request.method} ${request.url}`);
    this.name = "TimeoutError";
    this.request = request;
  }
}
