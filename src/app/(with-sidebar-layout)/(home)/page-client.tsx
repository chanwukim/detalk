"use client";

import Link from "next/link";

import paths from "@/config/paths";

import ChatCircleIcon from "@/components/icons/chat-circle-icon";
import {
  ProductPostFeed,
  ProductPostFeedBody,
  ProductPostFeedFooter,
  ProductPostFeedHeader,
  ProductPostFeedVisitButton,
  ProductPostFeedVoteButton,
  ProductPostPreviewImages,
} from "@/components/product-post-feed";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HomePageClient() {
  return (
    <div className="flex h-full flex-col">
      {/* Banner */}

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
            products. <br /> Whether you&apos;re a maker showcasing your
            creation or a user recommending your favorites - every product
            deserves to be seen.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href={paths.posts.new.getHref()}>Share a Product</Link>
            </Button>
          </div>
        </div>
      </div>

      <section className="flex-1">
        <h2 className="sr-only">New Posts</h2>

        {Array.from({ length: 10 }).map((_, index) => (
          <ProductPostFeed key={index}>
            <ProductPostFeedHeader>
              {/* Member */}
              <div className="flex flex-1">
                <div className="mr-2">
                  <Link
                    href={paths.member.profile.getHref("TODO")}
                    className="z-10"
                  >
                    <Avatar className="z-10 size-10 hover:scale-105">
                      <AvatarImage src={"https://github.com/chanwukim.png"} />
                      <AvatarFallback>US</AvatarFallback>
                    </Avatar>
                  </Link>
                </div>
                <div className="flex flex-col items-start">
                  <Link
                    href={paths.member.profile.getHref("TODO")}
                    className="z-10 line-clamp-1 text-sm font-medium hover:underline"
                  >
                    nickname nickname nickname nickname nickname nickname
                    nicknamemnicknamemnickname
                  </Link>
                  <time className="text-muted-foreground text-xs">
                    2025-01-01
                  </time>
                </div>
              </div>
            </ProductPostFeedHeader>
            <ProductPostFeedBody>
              <h3 className="mt-4 line-clamp-2 text-lg leading-tight font-semibold">
                Title Title Title Title Title Title Title Title Title Title
                Title Title Title Title Title Title Title Title
              </h3>

              <ProductPostPreviewImages
                postTitle="TODO"
                imageUrls={["/mock.png", "/mock.png", "/mock.png"]}
              />

              <p className="mt-2 line-clamp-3 text-sm">
                description description description description description
                description description
              </p>

              <Link
                href={paths.posts.detail.getHref("TODO")}
                className="absolute inset-0 z-0"
              >
                <span className="sr-only">View more</span>
              </Link>

              <div className="mt-2 flex flex-wrap items-center gap-1">
                <Badge color="green" className="rounded-full px-3 py-1">
                  Free
                </Badge>
                <Badge color="zinc" className="rounded-full px-3 py-1">
                  tag-1
                </Badge>
                <Badge color="zinc" className="rounded-full px-3 py-1">
                  tag-2
                </Badge>
                <Badge color="zinc" className="rounded-full px-3 py-1">
                  tag-3
                </Badge>
                <Badge color="zinc" className="rounded-full px-3 py-1">
                  tag-4
                </Badge>
                <Badge color="zinc" className="rounded-full px-3 py-1">
                  tag-5
                </Badge>
              </div>
            </ProductPostFeedBody>

            <ProductPostFeedFooter className="flex flex-col gap-2 md:flex-row md:items-center">
              <div className="flex flex-1 items-center gap-6">
                <span className="text-muted-foreground flex items-center">
                  <ChatCircleIcon className="mr-1 size-4" />
                  <span className="text-sm">10</span>
                </span>

                <span className="text-sm text-green-600 dark:text-green-500">
                  +10% MoM
                </span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <ProductPostFeedVisitButton />
                <ProductPostFeedVoteButton />
              </div>
            </ProductPostFeedFooter>
          </ProductPostFeed>
        ))}
      </section>
    </div>
  );
}
