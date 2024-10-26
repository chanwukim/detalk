import QueryClientProvider from "@/lib/react-query/query-client-provider";
import type { PropsWithChildren } from "@/lib/types";

export default function Providers({ children }: PropsWithChildren) {
  return <QueryClientProvider>{children}</QueryClientProvider>;
}
