"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";

import cn from "@/libs/cn";

export type OverlayProps = DialogPrimitive.DialogProps;
export const Overlay = DialogPrimitive.Root;

export type OverlayTriggerProps = DialogPrimitive.DialogTriggerProps;
export const OverlayTrigger = DialogPrimitive.Trigger;

export type OverlayCloseProps = DialogPrimitive.DialogCloseProps;
export const OverlayClose = DialogPrimitive.Close;

export type OverlayTitleProps = DialogPrimitive.DialogTitleProps;
export const OverlayTitle = DialogPrimitive.Title;

export type OverlayDescriptionProps = DialogPrimitive.DialogDescriptionProps;
export const OverlayDescription = DialogPrimitive.Description;

export type OverlayContentProps = DialogPrimitive.DialogContentProps;
export function OverlayContent({
  className,
  children,
  ...rest
}: OverlayContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[var(--z-overlay-backdrop)] bg-black/30" />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-[var(--z-overlay)] transition-shadow",
          className,
        )}
        {...rest}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
