import { type ErrorMessage } from "./types";

export class HttpError extends Error {
  request: Request;
  response: Response;

  constructor({
    request,
    response,
    message,
  }: {
    request: Request;
    response: Response;
    message: string;
  }) {
    super(message);
    this.name = "HttpError";
    this.request = request;
    this.response = response;
  }
}

export class ApiError extends HttpError {
  code: ErrorMessage["code"];
  details: ErrorMessage["details"];

  constructor({
    request,
    response,
    message,
    code,
    details,
  }: ErrorMessage & {
    request: Request;
    response: Response;
    message: string;
  }) {
    super({ request, response, message });
    this.name = "ApiError";
    this.code = code;
    this.details = details;
  }
}
