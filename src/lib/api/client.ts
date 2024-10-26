import clientEnv from "../client-env";
import fetcher from "../fetcher";

import type { ErrorResponse } from "./errors";
import { ApiError } from "./errors";

export const api = fetcher.create({
  baseUrl: clientEnv.NEXT_PUBLIC_API_URL,
  credentials: "include",
  hooks: {
    beforeError: [
      async (error) => {
        const { response } = error;
        if (
          response &&
          response.headers.get("content-type")?.includes("json")
        ) {
          // fetcher에서 HttpError로 처리하기전에 Api Error로 throw
          const body = await response.json<ErrorResponse>();
          throw new ApiError(body.error.message, response.status);
        }
        return error;
      },
    ],
  },
});
