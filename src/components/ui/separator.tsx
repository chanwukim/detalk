"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";

import cn from "@/libs/cn";

export type SeparatorProps = React.ComponentProps<
  typeof SeparatorPrimitive.Root
>;

export function Separator({
  orientation = "horizontal",
  decorative = true,
  className,
  ...rest
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      orientation={orientation}
      decorative={decorative}
      className={cn(
        "bg-border shrink-0",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      {...rest}
    />
  );
}
