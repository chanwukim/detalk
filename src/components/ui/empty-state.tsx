import cn from "@/libs/cn";

/**
 * @example
 * <EmptyState>
 *   <EmptyIcon />
 *   <EmptyTitle>No posts found</EmptyTitle>
 *   <EmptyDescription>No posts found</EmptyDescription>
 *   <EmptyAction>
 *     <Button>Reset</Button>
 *   </EmptyAction>
 * </EmptyState>
 */
export function EmptyState({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"div">) {
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

export function EmptyIcon({
  icon,
  className,
}: {
  icon?: React.ReactNode;
  className?: string;
}) {
  const Icon = icon ?? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="52"
      height="52"
      fill="currentColor"
      viewBox="0 0 256 256"
      className="text-muted-foreground"
    >
      <path d="M116,116a16,16,0,1,1-16-16A16,16,0,0,1,116,116Zm40-16a16,16,0,1,0,16,16A16,16,0,0,0,156,100Zm72,20v96a12,12,0,0,1-19.6,9.29L186.67,207.5l-21.74,17.79a12,12,0,0,1-15.2,0L128,207.5l-21.73,17.79a12,12,0,0,1-15.2,0L69.33,207.5,47.6,225.29A12,12,0,0,1,28,216V120a100,100,0,0,1,200,0Zm-24,0a76,76,0,0,0-152,0v70.68l9.73-8a12,12,0,0,1,15.2,0L98.67,200.5l21.73-17.79a12,12,0,0,1,15.2,0l21.73,17.79,21.74-17.79a12,12,0,0,1,15.2,0l9.73,8Z"></path>
    </svg>
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

export function EmptyTitle({
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

export function EmptyDescription({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <p className={cn("text-muted-foreground text-center text-sm", className)}>
      {children}
    </p>
  );
}

export function EmptyAction({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("mt-2 flex flex-col gap-2", className)}>{children}</div>
  );
}
