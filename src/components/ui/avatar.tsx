"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

import cn from "@/libs/cn";

export type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root>;
export function Avatar({ className, ...rest }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full border",
        className,
      )}
      {...rest}
    />
  );
}

export type AvatarImageProps = React.ComponentProps<
  typeof AvatarPrimitive.Image
>;
export function AvatarImage({ className, ...rest }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      className={cn("aspect-square size-full", className)}
      {...rest}
    />
  );
}

export type AvatarFallbackProps = React.ComponentProps<
  typeof AvatarPrimitive.Fallback
>;
export function AvatarFallback({ className, ...rest }: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...rest}
    />
  );
}
