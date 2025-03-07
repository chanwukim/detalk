"use client";

import cn from "@/libs/cn";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export default function Skeleton({ className, ...rest }: SkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn("bg-primary/10 animate-pulse rounded-lg", className)}
      {...rest}
    />
  );
}
