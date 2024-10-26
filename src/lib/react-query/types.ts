import type { UseQueryOptions } from "@tanstack/react-query";

export type UseQueryOptionsWithoutKeyAndFn<T = unknown> = Omit<
  UseQueryOptions<T>,
  "queryKey" | "queryFn"
>;
