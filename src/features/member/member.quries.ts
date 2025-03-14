import { type CursorPaginationRequest } from "@/libs/api";

import memberApi from "./member.api";

export const memberQueryKeys = {
  profile: (userhandle: string) => ["members", userhandle] as const,
  posts: (userhandle: string) =>
    [...memberQueryKeys.profile(userhandle), "posts"] as const,
};

export const memberQueryOptions = {
  posts: (userhandle: string, params: CursorPaginationRequest) => ({
    queryKey: [...memberQueryKeys.posts(userhandle), params],
    queryFn: () => memberApi.getProductPosts(userhandle, params),
  }),
} as const;
