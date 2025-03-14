"use client";

import cn from "@/libs/cn";

import SmileyXEyesFillIcon from "../icons/smiley-x-eyes-fill-icon";

/**
 * @example
 * <ErrorState>
 *   <ErrorIcon />
 *   <ErrorTitle>Something went wrong</ErrorTitle>
 *   <ErrorDescription>Please try again later.</ErrorDescription>
 *   <ErrorAction>
 *     <Button>Reset</Button>
 *   </ErrorAction>
 * </ErrorState>
 */
export function ErrorState({
  children,
  className,
  ...rest
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-2",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function ErrorIcon({
  icon,
  className,
}: {
  icon?: React.ReactNode;
  className?: string;
}) {
  const Icon = icon ?? (
    <SmileyXEyesFillIcon size={52} className="fill-muted-foreground" />
  );

  return (
    <div
      className={cn(
        "bg-muted/70 flex size-20 items-center justify-center rounded-full",
        className,
      )}
    >
      {Icon}
    </div>
  );
}

export function ErrorTitle({
  level = 3,
  children,
  className,
}: React.PropsWithChildren<{
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}>) {
  const Component = `h${level}` as const;

  return (
    <Component className={cn("text-lg font-medium", className)}>
      {children}
    </Component>
  );
}

export function ErrorDescription({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <p className={cn("text-muted-foreground text-center text-sm", className)}>
      {children}
    </p>
  );
}

export function ErrorAction({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("mt-2 flex flex-col gap-2", className)}>{children}</div>
  );
}
