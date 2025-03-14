import Link from "next/link";

import paths from "@/config/paths";

import { formatRelativeTime } from "@/libs/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { type ProductPost } from "../product.dto";

import PricingPlanBadge from "./pricing-plan-badge";
import { ProductPostFeedVoteButton } from "./product-post-feed";
import {
  ProductPostFeed,
  ProductPostFeedHeader,
  ProductPostFeedBody,
  ProductPostFeedFooter,
} from "./product-post-feed/product-post-feed";
import ProductPostPreviewImages from "./product-post-feed/product-post-preview-images";
import ProductPostFeedVisitButton from "./product-post-feed/product-post-visit-button";

type ProductPostFeedsProps = {
  isNavigable: boolean;
  posts?: ProductPost[];
};

export default function ProductPostFeeds({
  posts = [],
  isNavigable,
}: ProductPostFeedsProps) {
  return (
    <>
      {posts.map((post) => (
        <ProductPostFeed
          key={post.id}
          productPost={post}
          isNavigable={isNavigable}
        >
          <ProductPostFeedHeader>
            {/* Member */}
            <div className="flex flex-1">
              <div className="mr-2">
                <Link
                  href={paths.member.profile.getHref(post.userHandle)}
                  className="z-10"
                >
                  <Avatar className="z-10 size-10 hover:scale-105">
                    <AvatarImage src={post.avatarUrl} />
                    <AvatarFallback>
                      {post.userHandle.slice(0, 2)}
                    </AvatarFallback>
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
          </ProductPostFeedHeader>
          <ProductPostFeedBody>
            <h3 className="mt-4 line-clamp-2 text-lg leading-tight font-semibold">
              {post.title}
            </h3>

            <ProductPostPreviewImages />

            <p className="mt-2 line-clamp-3 text-sm">{post.description}</p>

            <Link
              href={paths.product.post.detail.getHref(post.id.toString())}
              className="absolute inset-0 z-0"
            >
              <span className="sr-only">View more</span>
            </Link>

            <div className="mt-2 flex flex-wrap items-center gap-1">
              <PricingPlanBadge plan={post.pricingPlan} />
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  color="zinc"
                  className="rounded-full px-3 py-1"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </ProductPostFeedBody>

          <ProductPostFeedFooter className="flex flex-col gap-2 md:flex-row md:items-center">
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
              <ProductPostFeedVisitButton />
              <ProductPostFeedVoteButton />
            </div>
          </ProductPostFeedFooter>
        </ProductPostFeed>
      ))}
    </>
  );
}
