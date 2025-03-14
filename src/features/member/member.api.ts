import {
  type CursorPaginationResponse,
  type CursorPaginationRequest,
} from "@/libs/api";
import { apiClient } from "@/libs/api/api-client";

import { type ProductPost } from "../product";

const memberApi = {
  getProductPosts: (userhandle: string, params: CursorPaginationRequest = {}) =>
    apiClient.get<CursorPaginationResponse<ProductPost>>(
      `/v1/members/${userhandle}/posts`,
      {
        query: params,
      },
    ),
} as const;

export default memberApi;
