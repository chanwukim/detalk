"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import cn from "@/libs/cn";

export type CheckboxGroupProps = React.ComponentProps<"div">;
/**
 * @example
 * <CheckboxGroup>
 *  <CheckboxField>
 *    <Checkbox id="terms" />
 *    <Label htmlFor="terms">Checkbox</Label>
 *    <p>Description</p>
 *  </CheckboxField>
 *  <CheckboxField>
 *    <Checkbox id="policy" />
 *    <Label htmlFor="policy">Checkbox</Label>
 *    <p>Description</p>
 *  </CheckboxField>
 * </CheckboxGroup>
 */
export function CheckboxGroup({ className, ...rest }: CheckboxGroupProps) {
  return <div className={cn("grid gap-4", className)} {...rest} />;
}

export type CheckboxFieldProps = React.ComponentProps<"div">;
export function CheckboxField({ className, ...rest }: CheckboxFieldProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1",
        "[&>[role=checkbox]]:col-start-1 [&>[role=checkbox]]:row-start-1 [&>[role=checkbox]]:items-center [&>[role=checkbox]]:justify-self-start",
        "[&>label]:col-start-2 [&>label]:row-start-1 [&>label]:cursor-pointer [&>label]:items-center [&>label]:justify-self-start",
        "[&>p]:text-muted-foreground [&>p]:col-start-2 [&>p]:row-start-2 [&>p]:items-center [&>p]:justify-self-start [&>p]:text-sm",
        className,
      )}
      {...rest}
    />
  );
}

export type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root>;
export function Checkbox({ className, ...rest }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer size-5 shrink-0 rounded border shadow-xs transition-shadow hover:shadow-sm",
        "ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-primary/80 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className,
      )}
      {...rest}
    >
      <CheckboxPrimitive.Indicator
        className={"flex items-center justify-center text-current"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="4"
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
