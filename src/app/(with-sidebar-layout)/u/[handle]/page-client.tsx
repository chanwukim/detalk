import Link from "next/link";

import paths from "@/config/paths";

import ChatCircleIcon from "@/components/icons/chat-circle-icon";
import DotsThreeIcon from "@/components/icons/dots-three-icon";
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
    </>
  );
}
