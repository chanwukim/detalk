import { HTTP_STATUS_CODE } from "../constants/http";

import { API_ERROR_MESSAGE, ApiError } from "./errors";

export async function parseRequestBody<T>(request: Request) {
  try {
    return request.json() as T;
  } catch (error) {
    throw new ApiError(
      API_ERROR_MESSAGE.invalidRequestBody,
      HTTP_STATUS_CODE.badRequest,
    );
  }
}
