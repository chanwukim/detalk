"use client";

import { QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import getQueryClient from "./get-query-client";

export default function QueryClientProvider({
  children,
}: React.PropsWithChildren) {
  const queryClient = getQueryClient();
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryClientProvider>
  );
}
