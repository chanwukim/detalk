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
  },
};

export default productApi;
