"use client";

import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";

import cn from "@/libs/cn";

/**
 * @example
 * <Dropdown>
 *   <DropdownTrigger>Open</DropdownTrigger>
 *   <DropdownContent>
 *     <DropdownLabel>My Account</DropdownLabel>
 *     <DropdownSeparator />
 *     <DropdownItem>Profile</DropdownItem>
 *     <DropdownItem>Billing</DropdownItem>
 *     <DropdownItem>Team</DropdownItem>
 *     <DropdownItem>Subscription</DropdownItem>
 *   </DropdownContent>
 * </Dropdown>
 */
export function Dropdown(
  props: Omit<DropdownPrimitive.DropdownMenuProps, "modal">,
) {
  return (
    <DropdownPrimitive.Root
      // The modality of the dropdown menu. When set to true,
      // interaction with outside elements will be disabled
      // and only menu content will be visible to screen readers.
      modal
      {...props}
    />
  );
}
export const DropdownTrigger = DropdownPrimitive.Trigger;

export type DropdownContentProps = React.ComponentProps<
  typeof DropdownPrimitive.Content
>;
export function DropdownContent({
  sideOffset = 4,
  className,
  ...rest
}: DropdownContentProps) {
  return (
    <DropdownPrimitive.Portal>
      <DropdownPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          "bg-background/90 z-[var(--z-overlay)] min-w-32 overflow-hidden rounded-xl border p-1 shadow-lg backdrop-blur-xl outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...rest}
      />
    </DropdownPrimitive.Portal>
  );
}

export type DropdownItemProps = React.ComponentProps<
  typeof DropdownPrimitive.Item
>;
export function DropdownItem({ className, ...rest }: DropdownItemProps) {
  return (
    <DropdownPrimitive.Item
      className={cn(
        "text-foreground focus:bg-accent/90 focus:text-foreground-on-accent relative cursor-default rounded-lg px-3.5 py-2.5 text-left text-base/6 select-none focus-visible:outline-none md:px-3 md:py-1.5 md:text-sm",
        "disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...rest}
    />
  );
}

export type DropdownLabelProps = React.ComponentProps<
  typeof DropdownPrimitive.Label
>;
export function DropdownLabel({ className, ...rest }: DropdownLabelProps) {
  return (
    <DropdownPrimitive.Label
      className={cn("px-2 py-1.5 text-sm font-semibold", className)}
      {...rest}
    />
  );
}

export type DropdownSeparatorProps = React.ComponentProps<
  typeof DropdownPrimitive.Separator
>;
export function DropdownSeparator({
  className,
  ...rest
}: DropdownSeparatorProps) {
  return (
    <DropdownPrimitive.Separator
      className={cn("bg-muted -mx-1 my-1 h-px", className)}
      {...rest}
    />
  );
}
