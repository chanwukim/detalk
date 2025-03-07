"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";

import cn from "@/libs/cn";

export type PopoverProps = Omit<PopoverPrimitive.PopoverProps, "modal">;

/**
 * @example
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button>Open</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     Content
 *   </PopoverContent>
 * </Popover>
 */
export function Popover(props: PopoverProps) {
  return (
    <PopoverPrimitive.Root
      // The modality of the dropdown menu. When set to true,
      // interaction with outside elements will be disabled
      // and only menu content will be visible to screen readers.
      modal
      {...props}
    />
  );
}

export const PopoverTrigger = PopoverPrimitive.Trigger;

export type PopoverContentProps = React.ComponentProps<
  typeof PopoverPrimitive.Content
>;
export function PopoverContent({
  align = "center",
  sideOffset = 4,
  className,
  ...rest
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-background/90 text-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-[var(--z-overlay)] min-w-52 rounded-xl border p-4 shadow-md backdrop-blur-xl outline-none",
          className,
        )}
        {...rest}
      />
    </PopoverPrimitive.Portal>
  );
}
