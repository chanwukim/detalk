import { NextResponse } from "next/server";

import { ZodError } from "zod";

import { HTTP_STATUS_ERROR_MESSAGE, HTTP_STATUS_CODE } from "../constants/http";

export const API_ERROR_MESSAGE = {
  ...HTTP_STATUS_ERROR_MESSAGE,
  invalidRequestBody: "Invalid request body",
} as const;

export class ApiError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export interface ErrorResponse {
  error: {
    message: string;
    details?: Array<{
      key: string;
      message: string;
    }>;
  };
}

export function handleErrorAndReturnResponse(error: unknown) {
  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map((err) => ({
      key: err.path.join("."),
      message: err.message,
    }));

    return NextResponse.json<ErrorResponse>(
      {
        error: {
          message: API_ERROR_MESSAGE.invalidRequestBody,
          details: formattedErrors,
        },
      },
      { status: HTTP_STATUS_CODE.badRequest },
    );
  }

  if (error instanceof ApiError) {
    return NextResponse.json<ErrorResponse>(
      { error: { message: error.message } },
      { status: error.status },
    );
  }

  return NextResponse.json<ErrorResponse>(
    { error: { message: API_ERROR_MESSAGE.internalServerError } },
    { status: HTTP_STATUS_CODE.internalServerError },
  );
}
