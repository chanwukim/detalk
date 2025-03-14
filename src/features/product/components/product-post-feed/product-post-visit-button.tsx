import ArrowSquareOutIcon from "@/components/icons/arrow-square-out-icon";
import ArrowUpRightIcon from "@/components/icons/arrow-up-right-icon";
import { Button } from "@/components/ui/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/ui/dropdown";

import { useProductPostFeed } from "./product-post-feed";

export default function ProductPostFeedVisitButton() {
  const { productPost } = useProductPostFeed();

  const href = productPost.urls[0];
  const domain = href.split("https://")[1];

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button type="button" variant="outline" className="rounded-full">
          <ArrowUpRightIcon className="size-4" />
          <span className="font-medium">Visit</span>
        </Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem asChild>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <ArrowSquareOutIcon
              size={20}
              className="mr-2 fill-blue-600 hover:fill-blue-600/80"
            />
            {domain}
          </a>
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}
