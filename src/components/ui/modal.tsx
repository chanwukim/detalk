"use client";

import cn from "@/libs/cn";

import XIcon from "../icons/x-icon";

import { Button } from "./button";
import {
  Overlay,
  OverlayContent,
  OverlayTrigger,
  OverlayClose,
  OverlayTitle,
  OverlayDescription,
  type OverlayContentProps,
  type OverlayTitleProps,
  type OverlayDescriptionProps,
} from "./overlay";

export const Modal = Overlay;
export const ModalTrigger = OverlayTrigger;
export const ModalClose = OverlayClose;

export type ModalContentProps = OverlayContentProps & {
  hasCloseButton?: boolean;
};
export function ModalContent({
  hasCloseButton = true,
  children,
  className,
  ...rest
}: ModalContentProps) {
  return (
    <OverlayContent
      className={cn(
        "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-xl p-6 pb-4 shadow-lg duration-200",
        className,
      )}
      {...rest}
    >
      {children}
      {hasCloseButton && (
        <OverlayClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full"
          >
            <span className="sr-only">Close</span>
            <XIcon size={16} />
          </Button>
        </OverlayClose>
      )}
    </OverlayContent>
  );
}

export type ModalHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export function ModalHeader({ className, ...rest }: ModalHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5 text-center md:text-left",
        className,
      )}
      {...rest}
    />
  );
}

export type ModalTitleProps = OverlayTitleProps;
export function ModalTitle({ children, className, ...rest }: ModalTitleProps) {
  return (
    <OverlayTitle
      className={cn(
        "text-lg leading-none font-medium tracking-tight",
        className,
      )}
      {...rest}
    >
      {children}
    </OverlayTitle>
  );
}

export type ModalDescriptionProps = OverlayDescriptionProps;
export function ModalDescription({
  children,
  className,
  ...rest
}: ModalDescriptionProps) {
  return (
    <OverlayDescription
      className={cn("text-muted-foreground text-sm", className)}
      {...rest}
    >
      {children}
    </OverlayDescription>
  );
}

export function ModalFooter({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 md:flex-row md:justify-end",
        className,
      )}
      {...rest}
    />
  );
}
