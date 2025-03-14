"use client";

import Link from "next/link";
import { Suspense } from "react";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import paths from "@/config/paths";

import { productPostQueryOptions } from "@/features/product";
import ProductPostFeedSkeleton from "@/features/product/components/product-post-feed-skeleton";
import ProductPostFeeds from "@/features/product/components/product-post-feeds";

import LoggingErrorBoundary from "@/components/common/logging-error-boundary";
import { Button } from "@/components/ui/button";
import {
  ErrorState,
  ErrorIcon,
  ErrorTitle,
  ErrorDescription,
} from "@/components/ui/error-state";

export default function HomePageClient() {
  return (
    <div className="flex h-full flex-col">
      <Banner />
      <section className="flex flex-1 flex-col">
        <h2 className="sr-only">New Posts</h2>
        <LoggingErrorBoundary fallback={ProductPostFeedsErrorState}>
          <Suspense fallback={<ProductPostFeedSkeleton length={20} />}>
            <InfiniteProductPostFeeds />
          </Suspense>
        </LoggingErrorBoundary>
      </section>
    </div>
  );
}

function Banner() {
  return (
    <div className="relative border-b px-6 pt-10 pb-8">
      <picture className="absolute inset-0 h-full w-full">
        <source
          srcSet="/images/banner-carl-wang-lsxADNRNmc8-unsplash.avif"
          type="image/avif"
        />
        <source
          srcSet="/images/banner-carl-wang-lsxADNRNmc8-unsplash.webp"
          type="image/webp"
        />
        <img
          src="/images/banner-carl-wang-lsxADNRNmc8-unsplash.jpg"
          alt="Banner image"
          width={1000}
          height={1000}
          className="block h-full w-full object-cover"
        />
      </picture>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 flex flex-col gap-2">
        <h1 className="text-primary-foreground text-xl font-semibold tracking-tight">
          🚀 Welcome to Detalk!
        </h1>
        <p className="text-primary-foreground/80 text-sm">
          A community-driven platform where users share and discover great
          products. <br /> Whether you&apos;re a maker showcasing your creation
          or a user recommending your favorites - every product deserves to be
          seen.
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={paths.product.post.new.getHref()}>Share a Product</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProductPostFeedsErrorState() {
  return (
    <ErrorState>
      <ErrorIcon />
      <ErrorTitle>Something went wrong</ErrorTitle>
      <ErrorDescription>Please try again later.</ErrorDescription>
    </ErrorState>
  );
}

const SIZE_PER_PAGE = 10;

function InfiniteProductPostFeeds() {
  const { data } = useSuspenseInfiniteQuery({
    ...productPostQueryOptions.all({
      size: SIZE_PER_PAGE,
      startId: undefined,
    }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
  });

  const posts = data.pages.flatMap((page) => page.items);

  return <ProductPostFeeds posts={posts} isNavigable={true} />;
}
