"use client";

import Link from "next/link";

import paths from "@/config/paths";

import ChatCircleIcon from "@/components/icons/chat-circle-icon";
import ShareIcon from "@/components/icons/share-icon";
import {
  ProductPostFeed,
  ProductPostFeedHeader,
  ProductPostFeedBody,
  ProductPostPreviewImages,
  ProductPostFeedFooter,
  ProductPostFeedVisitButton,
  ProductPostFeedVoteButton,
} from "@/components/product-post-feed";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PostDetailPageClient() {
  return (
    <div className="flex h-full flex-col">
      <ProductPostFeed>
        <ProductPostFeedHeader>
          {/* Member */}
          <div className="flex min-w-0 flex-shrink overflow-hidden">
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
              <time className="text-muted-foreground text-xs">2025-01-01</time>
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
            Title Title Title Title Title Title Title Title Title Title Title
            Title Title Title Title Title Title Title
          </h3>

          <p className="mt-2 line-clamp-3 text-sm">
            description description description description description
            description description
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-1">
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

          <ProductPostPreviewImages
            postTitle="TODO"
            imageUrls={["/mock.png", "/mock.png", "/mock.png"]}
          />
        </ProductPostFeedBody>

        <ProductPostFeedFooter className="flex flex-col md:flex-row md:items-center">
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
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShareIcon className="size-4" />
            </Button>
          </div>
        </ProductPostFeedFooter>
      </ProductPostFeed>
    </div>
  );
}
