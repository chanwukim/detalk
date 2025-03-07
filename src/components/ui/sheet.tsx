"use client";

import { cva, type VariantProps } from "cva";

import cn from "@/libs/cn";

import XIcon from "../icons/x-icon";

import { Button } from "./button";
import {
  Overlay,
  OverlayClose,
  OverlayContent,
  OverlayDescription,
  OverlayTitle,
  OverlayTrigger,
} from "./overlay";

export const Sheet = Overlay;
export const SheetTrigger = OverlayTrigger;

export const SheetClose = OverlayClose;

export type SheetProps = React.ComponentProps<typeof OverlayContent> &
  VariantProps<typeof sheetVariants> & {
    hasCloseButton?: boolean;
  };

export function SheetContent({
  side = "right",
  hasCloseButton = true,
  children,
  className,
  ...rest
}: SheetProps) {
  return (
    <OverlayContent className={sheetVariants({ side, className })} {...rest}>
      {children}
      {hasCloseButton && (
        <OverlayClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 rounded-full"
          >
            <span className="sr-only">Close</span>
            <XIcon size={20} />
          </Button>
        </OverlayClose>
      )}
    </OverlayContent>
  );
}
const sheetVariants = cva(
  [
    "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-[var(--z-overlay)] flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  ],
  {
    variants: {
      side: {
        left: [
          "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
        ],
        right: [
          "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
        ],
        top: [
          "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
        ],
        bottom: [
          "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
        ],
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

export function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-1.5 p-4", className)} {...props} />
  );
}

export function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof OverlayTitle>) {
  return (
    <OverlayTitle className={cn("text-lg font-medium", className)} {...props} />
  );
}

export function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof OverlayDescription>) {
  return (
    <OverlayDescription
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export function SheetFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}
