"use client";

import { Suspense } from "react";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import paths from "@/config/paths";

import { memberQueryOptions } from "@/features/member";
import ProductPostFeeds from "@/features/product/components/product-post-feeds";

import LoggingErrorBoundary from "@/components/common/logging-error-boundary";
import DotsThreeIcon from "@/components/icons/dots-three-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "@/components/ui/dropdown";
import {
  TabNavigation,
  TabNavigationLink,
} from "@/components/ui/tav-navigation";

export default function ProfilePageClient() {
  return (
    <>
      <section>
        <div className="bg-accent h-52 w-full"></div>
        <div className="relative px-4 pt-2 pb-6">
          {/* Avatar */}
          <div className="absolute -top-16 left-4">
            <Avatar className="bg-background size-28 border">
              <AvatarImage src="https://github.com/chanwukim.png" />
              <AvatarFallback className="font-semibold select-none">
                NI
              </AvatarFallback>
            </Avatar>
          </div>
          {/* Actions */}
          <div className="flex min-h-9 justify-end gap-1">
            <Dropdown>
              <DropdownTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <span className="sr-only">More</span>
                  <DotsThreeIcon />
                </Button>
              </DropdownTrigger>
              <DropdownContent>
                <DropdownItem> Sign out</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>
          {/* Info */}
          <div className="pt-3">
            <h1 className="text-xl font-semibold">Nickname</h1>
            <div className="text-muted-foreground text-sm">@userhandle</div>
            <p className="mt-3 text-sm">
              description description description description description
              description description description description description
              description description
            </p>
          </div>
        </div>
      </section>
      <TabNavigation>
        <TabNavigationLink
          href={paths.member.profile.getHref("TODO")}
          isSelected
        >
          Posts
        </TabNavigationLink>
      </TabNavigation>
      <section>
        <h2 className="sr-only">Posts</h2>
        <LoggingErrorBoundary fallback={() => <div>TODO Error State</div>}>
          <Suspense fallback={<div>TODO Loading State</div>}>
            <InfiniteProductPostFeeds />
          </Suspense>
        </LoggingErrorBoundary>
      </section>
    </>
  );
}

const SIZE_PER_PAGE = 10;
const DEV_USER_HANDLE = "afdsafdsfads"; // TODO: remove this

function InfiniteProductPostFeeds() {
  const { data } = useSuspenseInfiniteQuery({
    ...memberQueryOptions.posts(DEV_USER_HANDLE, {
      size: SIZE_PER_PAGE,
      startId: undefined,
    }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
  });

  const posts = data.pages.flatMap((page) => page.items);

  return <ProductPostFeeds posts={posts} isNavigable={true} />;
}
