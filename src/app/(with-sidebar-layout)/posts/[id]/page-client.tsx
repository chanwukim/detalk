"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";

import paths from "@/config/paths";

import { productPostQueryOptions } from "@/features/product";
import PricingPlanBadge from "@/features/product/components/pricing-plan-badge";
import {
  ProductPostFeed,
  ProductPostFeedHeader,
  ProductPostFeedBody,
  ProductPostPreviewImages,
  ProductPostFeedFooter,
  ProductPostFeedVisitButton,
  ProductPostFeedVoteButton,
} from "@/features/product/components/product-post-feed";

import { ApiError } from "@/libs/api";
import { formatRelativeTime } from "@/libs/utils";

import LoggingErrorBoundary from "@/components/common/logging-error-boundary";
import LoadingIcon from "@/components/icons/loading-icon";
import ShareIcon from "@/components/icons/share-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  EmptyAction,
} from "@/components/ui/empty-state";
import {
  ErrorState,
  ErrorIcon,
  ErrorTitle,
  ErrorDescription,
  ErrorAction,
} from "@/components/ui/error-state";

export default function PostDetailPageClient() {
  return (
    <div className="flex h-full flex-col">
      <LoggingErrorBoundary fallback={ProductPostDetailErrorState}>
        <Suspense
          fallback={
            <div className="flex flex-1 items-center justify-center">
              <LoadingIcon className="text-primary size-8 animate-spin" />
            </div>
          }
        >
          <ProductPostDetail />
        </Suspense>
      </LoggingErrorBoundary>
    </div>
  );
}

function ProductPostDetailErrorState({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  if (error instanceof ApiError && error.code === "product_post_not_found") {
    return (
      <EmptyState>
        <EmptyIcon />
        <EmptyTitle>Post not found</EmptyTitle>
        <EmptyDescription>
          The post you are looking for does not exist.
        </EmptyDescription>
        <EmptyAction>
          <Button variant="outline" asChild>
            <Link href={paths.home.getHref()}>Go to home</Link>
          </Button>
        </EmptyAction>
      </EmptyState>
    );
  }

  return (
    <ErrorState>
      <ErrorIcon />
      <ErrorTitle>Something went wrong</ErrorTitle>
      <ErrorDescription>Please try again later.</ErrorDescription>
      <ErrorAction>
        <Button variant="outline" onClick={reset}>
          Retry
        </Button>
      </ErrorAction>
    </ErrorState>
  );
}

function ProductPostDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: post } = useSuspenseQuery({
    ...productPostQueryOptions.detail(id),
  });

  return (
    <ProductPostFeed productPost={post} isNavigable={false}>
      <ProductPostFeedHeader>
        {/* Member */}
        <div className="flex min-w-0 flex-shrink overflow-hidden">
          <div className="mr-2">
            <Link
              href={paths.member.profile.getHref(post.userHandle)}
              className="z-10"
            >
              <Avatar className="z-10 size-10 hover:scale-105">
                <AvatarImage src={post.avatarUrl} />
                <AvatarFallback>{post.userHandle.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
          <div className="flex flex-col items-start">
            <Link
              href={paths.member.profile.getHref(post.userHandle)}
              className="z-10 line-clamp-1 text-sm font-medium hover:underline"
            >
              {post.nickname}
            </Link>
            <time className="text-muted-foreground text-xs">
              {formatRelativeTime(post.createdAt)}
            </time>
          </div>
        </div>
        {/* Actions */}
        <div className="flex flex-1 justify-end gap-2">
          <ProductPostFeedVisitButton />
          <ProductPostFeedVoteButton />
        </div>
      </ProductPostFeedHeader>
      <ProductPostFeedBody>
        <h3 className="mt-4 line-clamp-2 text-lg leading-tight font-semibold">
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm">{post.description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-1">
          <PricingPlanBadge plan={post.pricingPlan} />
          {post.tags.map((tag) => (
            <Badge key={tag} color="zinc" className="rounded-full px-3 py-1">
              {tag}
            </Badge>
          ))}
        </div>

        <ProductPostPreviewImages />
      </ProductPostFeedBody>

      <ProductPostFeedFooter className="flex flex-col md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-6">
          {/* <span className="text-muted-foreground flex items-center">
            <ChatCircleIcon className="mr-1 size-4" />
            <span className="text-sm">10</span>
          </span>

          <span className="text-sm text-green-600 dark:text-green-500">
            +10% MoM
          </span> */}
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ShareIcon className="size-4" />
          </Button>
        </div>
      </ProductPostFeedFooter>
    </ProductPostFeed>
  );
}
