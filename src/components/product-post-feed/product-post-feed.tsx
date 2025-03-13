"use client";

import cn from "@/libs/cn";

export function ProductPostFeed({
  children,
  className,
  ...rest
}: React.ComponentProps<"article">) {
  return (
    <article className={cn("relative border-b", className)} {...rest}>
      {children}
    </article>
  );
}

export function ProductPostFeedHeader({
  children,
  className,
  ...rest
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center px-4 pt-6", className)} {...rest}>
      {children}
    </div>
  );
}

export function ProductPostFeedBody({
  children,
  className,
  ...rest
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("px-4", className)} {...rest}>
      {children}
    </div>
  );
}

export function ProductPostFeedFooter({
  children,
  className,
  ...rest
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("mt-4 px-4 pb-6", className)} {...rest}>
      {children}
    </div>
  );
}
