"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "cva";

import cn from "@/libs/cn";

import LoadingIcon from "../icons/loading-icon";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  };

export function Button({
  variant = "default",
  size = "default",
  isLoading = undefined,
  asChild,
  children,
  className,
  ...rest
}: ButtonProps) {
  const Component = (asChild ?? false) ? Slot : "button";

  return (
    <Component
      aria-busy={isLoading}
      data-loading={isLoading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...rest}
    >
      {children}
      {isLoading && (
        <LoadingIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
      )}
    </Component>
  );
}

const buttonVariants = cva(
  [
    "relative",
    "inline-flex",
    "justify-center",
    "items-center",
    "gap-2",
    "cursor-pointer",
    "select-none",
    "whitespace-nowrap",
    "border",
    "border-transparent",
    "rounded-lg",
    "text-sm",
    "font-medium",
    "transition-[color,box-shadow,transform,background]",
    "ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[loading]:pointer-events-none data-[loading]:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "active:scale-97",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-primary",
          "hover:bg-primary/90",
          "active:bg-primary",
          "text-primary-foreground",
          "shadow-sm",
          "border-transparent",
        ],
        secondary: [
          "bg-secondary",
          "hover:bg-secondary/80",
          "active:bg-secondary",
          "border-transparent",
          "text-secondary-foreground",
          "shadow-xs",
        ],
        outline: [
          "bg-background",
          "hover:bg-accent/80",
          "active:bg-accent",
          "border-input",
          "shadow-xs",
          "text-foreground",
          "hover:shadow-sm",
        ],
        ghost: ["border-transparent", "hover:bg-accent/80", "active:bg-accent"],
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive shadow-xs",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        lg: "h-12 rounded-[0.625rem] px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
