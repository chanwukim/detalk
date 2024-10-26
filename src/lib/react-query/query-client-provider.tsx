"use client";

import { QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import type { PropsWithChildren } from "../types";

import { getQueryClient } from "./utils";

// QueryClientProvider는 내부적으로 useContext를 사용하므로, 상단에 'use client'를 넣어야 합니다
export default function QueryClientProvider({ children }: PropsWithChildren) {
  // 참고: query client를 초기화할 때 useState를 피하세요
  // 일시 중단될 수 있는 코드와 이 사이에 suspense 경계가 없다면
  // React는 일시 중단 시 클라이언트를 버릴 것이기 때문입니다
  const queryClient = getQueryClient();

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryClientProvider>
  );
}
