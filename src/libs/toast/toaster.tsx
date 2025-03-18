import { Toaster as SonnerToaster } from "sonner";

type ToasterProps = {
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

  duration?: number;

  toastOptions?: {
    className?: string;
    success?: {
      className?: string;
    };
    info?: {
      className?: string;
    };
    warning?: {
      className?: string;
    };
    error?: {
      className?: string;
    };
  };
};

export default function Toaster({
  position = "top-center",
  duration = 3500,
  toastOptions,
}: ToasterProps) {
  return (
    <SonnerToaster
      position={position}
      duration={duration}
      toastOptions={{
        className: "bg-background",
        classNames: {
          toast: toastOptions?.className,
          success: toastOptions?.success?.className,
          info: toastOptions?.info?.className,
          warning: toastOptions?.warning?.className,
          error: toastOptions?.error?.className,
        },
        style: {
          pointerEvents: "auto",
          display: "flex",
        },
      }}
    />
  );
}
