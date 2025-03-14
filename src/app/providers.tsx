import { QueryClientProvider } from "@/libs/query";

export default function Providers({ children }: React.PropsWithChildren) {
  return <QueryClientProvider>{children}</QueryClientProvider>;
}
