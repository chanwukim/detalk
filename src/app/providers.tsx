import { QueryClientProvider } from "@/libs/query";
import { Toaster } from "@/libs/toast";

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider>
      {children}
      <Toaster
        position="top-center"
        duration={3500}
        toastOptions={{
          className:
            "text-foreground border border-transparent dark:border-border",
          success: {
            className:
              "[&_[data-icon]]:text-green-500 dark:[&_[data-icon]]:text-green-400",
          },
          info: {
            className:
              "[&_[data-icon]]:text-blue-500 dark:[&_[data-icon]]:text-blue-400",
          },
          warning: {
            className:
              "[&_[data-icon]]:text-yellow-500 dark:[&_[data-icon]]:text-yellow-400",
          },
          error: {
            className:
              "[&_[data-icon]]:text-red-500 dark:[&_[data-icon]]:text-red-400",
          },
        }}
      />
    </QueryClientProvider>
  );
}
