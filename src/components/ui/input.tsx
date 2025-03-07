"use client";

import cn from "@/libs/cn";

export type InputGroupProps = React.HTMLAttributes<HTMLDivElement>;
export function InputGroup({ className, ...rest }: InputGroupProps) {
  return (
    <span
      className={cn(
        "relative block w-full max-w-sm",
        // icon base style
        "[&>svg]:pointer-events-none [&>svg]:absolute [&>svg]:z-10",
        "[&>svg]:top-1/2 [&>svg]:-translate-y-1/2",
        "[&>svg]:size-5 lg:[&>svg]:size-4",
        "[&>svg]:text-muted-foreground",
        "[&:has(input:disabled)>svg]:opacity-50",
        // left icon
        "[&>svg:first-child]:left-3",
        "lg:[&>svg:first-child]:left-2.5",
        // right icon
        "[&>svg:last-child]:right-3",
        "lg:[&>svg:last-child]:right-2.5",
        // input padding
        "[&>svg:first-child~input]:pl-10",
        "lg:[&>svg:first-child~input]:pl-9",
        "[&:has(svg:last-child)>input]:pr-10",
        "lg:[&:has(svg:last-child)>input]:pr-9",
        className,
      )}
      {...rest}
    />
  );
}

export type InputProps = React.ComponentProps<"input">;
export function Input({ type = "text", className, ...rest }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground aria-invalid:outline-destructive/60 aria-invalid:ring-destructive/20 dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive/50 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 aria-invalid:outline-destructive/60 dark:aria-invalid:outline-destructive dark:aria-invalid:ring-destructive/40 aria-invalid:ring-destructive/20 aria-invalid:border-destructive/60 dark:aria-invalid:border-destructive flex h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-4 focus-visible:outline-1 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:focus-visible:ring-[3px] aria-invalid:focus-visible:outline-none md:text-sm dark:aria-invalid:focus-visible:ring-4",
        className,
      )}
      {...rest}
    />
  );
}
