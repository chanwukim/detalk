import CaretUpIcon from "@/components/icons/caret-up-icon";
import { Button } from "@/components/ui/button";

import { useProductPostFeed } from "./product-post-feed";

export default function VoteButton() {
  const { productPost } = useProductPostFeed();

  return (
    <Button
      type="button"
      className="group relative min-w-16 rounded-full bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 dark:from-blue-600 dark:via-indigo-600 dark:to-purple-600 dark:hover:from-blue-500 dark:hover:via-indigo-500 dark:hover:to-purple-500"
    >
      <CaretUpIcon className="size-4" />
      <span className="font-medium text-white">
        {productPost.recommendCount.toLocaleString()}
      </span>
      <span className="sr-only">votes</span>
    </Button>
  );
}
