import { isObject } from "../utils/is";

import type { Hooks } from "./types/hooks";
import type { FetcherHeadersInit, Options } from "./types/options";

export function validateOptionsAndMerge(
  ...sources: Array<Partial<Options> | undefined>
) {
  for (const source of sources) {
    if (!isObject(source) || (Array.isArray(source) && source !== undefined)) {
      throw new TypeError("The `options` argument must be an object");
    }
  }

  return deepMergeOptions({}, ...sources);
}

export function mergeHeaders(
  original: FetcherHeadersInit = {},
  override: FetcherHeadersInit = {},
) {
  const result = new globalThis.Headers(original as RequestInit["headers"]);
  const overrideHeaders = new globalThis.Headers(
    override as RequestInit["headers"],
  );
  const isHeaders = override instanceof globalThis.Headers;

  for (const [key, value] of overrideHeaders.entries()) {
    if ((isHeaders && value === "undefined") || value === undefined) {
      result.delete(key);
    } else {
      result.set(key, value);
    }
  }

  return result;
}

export function mergeHooks(original: Hooks = {}, override: Hooks = {}) {
  return {
    beforeRequest: mergeHook(original, override, "beforeRequest"),
    afterResponse: mergeHook(original, override, "afterResponse"),
    beforeError: mergeHook(original, override, "beforeError"),
  };
}

function mergeHook<K extends keyof Hooks>(
  original: Hooks,
  override: Hooks,
  key: K,
): Required<Hooks>[K] {
  if (Object.hasOwn(original, key) && override[key] === undefined) {
    return [];
  }

  return deepMergeOptions<Required<Hooks>[K]>(
    original[key] ?? [],
    override[key] ?? [],
  );
}

export function deepMergeOptions<T>(...sources: Array<Partial<T> | undefined>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = {};
  let headers = {};
  let hooks = {};

  for (const source of sources) {
    if (Array.isArray(source)) {
      if (!Array.isArray(result)) {
        result = [];
      }

      result = [...result, ...source];
    } else if (isObject(source)) {
      for (const [key, sourceValue] of Object.entries(source)) {
        let value = sourceValue;
        if (isObject(value) && key in result) {
          value = deepMergeOptions(result[key], value);
        }

        result = { ...result, [key]: value };
      }

      if (isObject((source as Partial<Options>).hooks)) {
        hooks = mergeHooks(hooks, (source as Partial<Options>).hooks);
        result.hooks = hooks;
      }

      if (isObject((source as Partial<Options>).headers)) {
        headers = mergeHeaders(headers, (source as Partial<Options>).headers);
        result.headers = headers;
      }
    }
  }

  return result;
}
