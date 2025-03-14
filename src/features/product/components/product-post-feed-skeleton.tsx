"use client";

import Skeleton from "@/components/ui/skeleton";

export default function ProductPostFeedSkeleton({
  length,
}: {
  length: number;
}) {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <div key={index} className="border-b">
          {/* Header */}
          <div className="px-4 pt-6">
            <div className="flex">
              {/* Avatar */}
              <div>
                <Skeleton className="mr-2 h-10 w-10 rounded-full" />
              </div>
              <Skeleton className="h-10 w-5/12" />
            </div>
          </div>

          {/* Body */}
          <div className="px-4">
            {/* Title */}
            <Skeleton className="mt-4 h-6 w-full" />

            {/* Media */}
            <div className="mt-2">
              <Skeleton className="h-76 w-full" />
            </div>

            {/* Description */}
            <Skeleton className="mt-2 h-14 w-full" />
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center px-4 pb-6">
            <div className="flex flex-1 items-center gap-2">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-20 rounded-full" />
              <Skeleton className="h-9 w-20 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
