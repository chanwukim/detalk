"use client";

import createSafeContext from "../create-safe-context";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Api = {};

const api: Api = {};

/**
 * for development
 */
// const mockApi: Api = {
//   products: {
//     getList: () => Promise.resolve([]),
//   },
// };

type ApiContextValue = {
  api: Api;
};

const [BaseApiProvider, useApi] = createSafeContext<ApiContextValue>();

function ApiProvider({ children }: React.PropsWithChildren) {
  return <BaseApiProvider value={{ api }}>{children}</BaseApiProvider>;
}

export { ApiProvider, useApi };
