import { type CursorPaginationRequest } from "@/libs/api";

import productApi from "./product.api";

export const productPostQueryKeys = {
  all: ["products", "posts"] as const,
  detail: (id: string) => [...productPostQueryKeys.all, id] as const,
};

export const productPostQueryOptions = {
  all: (params: CursorPaginationRequest) => ({
    queryKey: [...productPostQueryKeys.all, params],
    queryFn: ({ pageParam }: { pageParam?: number }) =>
      productApi.post.getList({ ...params, startId: pageParam }),
  }),
  detail: (id: string) => ({
    queryKey: [...productPostQueryKeys.detail(id)],
    queryFn: () => productApi.post.getDetail(id),
  }),
};
