import { ApiProvider } from "@/libs/api";

export default function Providers({ children }: React.PropsWithChildren) {
  return <ApiProvider>{children}</ApiProvider>;
}
