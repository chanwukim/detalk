import {
  type CursorPaginationRequest,
  type CursorPaginationResponse,
} from "@/libs/api";
import { apiClient } from "@/libs/api/api-client";

import { type ProductPost } from "./product.dto";

const productApi = {
  post: {
    getList: (params: CursorPaginationRequest = {}) =>
      apiClient.get<CursorPaginationResponse<ProductPost>>(
        "/v1/products/posts",
        {
          query: params,
        },
      ),
    getDetail: (id: string) =>
      apiClient.get<ProductPost>(`/v1/products/posts/${id}`),
  },
};

export default productApi;
