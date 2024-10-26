export const HTTP_STATUS_CODE = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  conflict: 409,
  internalServerError: 500,
} as const;
export type HttpStatus =
  (typeof HTTP_STATUS_CODE)[keyof typeof HTTP_STATUS_CODE];

export const HTTP_STATUS_ERROR_MESSAGE = {
  badRequest: "Bad Request",
  unauthorized: "Unauthorized",
  forbidden: "Forbidden",
  notFound: "Not Found",
  methodNotAllowed: "Method Not Allowed",
  conflict: "Conflict",
  internalServerError: "Internal Server Error. Please try again later.",
} as const;
export type HttpStatusErrorMessage =
  (typeof HTTP_STATUS_ERROR_MESSAGE)[keyof typeof HTTP_STATUS_ERROR_MESSAGE];
