import { ApiProvider } from "@/libs/api";
import { QueryClientProvider } from "@/libs/query";

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <ApiProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
    </ApiProvider>
  );
}
