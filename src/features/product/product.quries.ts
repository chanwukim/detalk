import { type CursorPaginationRequest } from "@/libs/api";

import productApi from "./product.api";

export const productPostQueryKeys = {
  all: ["products", "posts"] as const,
};

export const productPostQueryOptions = {
  all: (params: CursorPaginationRequest) => ({
    queryKey: [...productPostQueryKeys.all, params],
    queryFn: ({ pageParam }: { pageParam?: number }) =>
      productApi.post.getList({ ...params, startId: pageParam }),
  }),
};
