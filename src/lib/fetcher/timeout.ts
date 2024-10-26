import { TimeoutError } from "./errors";
import type { Fetch } from "./types/options";

export default function timeout(
  request: Request,
  init: RequestInit,
  timeout: number,
  fetch: Fetch,
  abortController?: AbortController,
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      if (abortController) {
        abortController.abort();
      }

      reject(new TimeoutError(request));
    }, timeout);

    fetch(request, init)
      .then(resolve)
      .catch(reject)
      .finally(() => {
        clearTimeout(timeoutId);
      });
  });
}
