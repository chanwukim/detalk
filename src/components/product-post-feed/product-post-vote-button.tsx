import CaretUpIcon from "../icons/caret-up";
import { Button } from "../ui/button";

export default function VoteButton() {
  return (
    <Button
      type="button"
      className="group relative min-w-16 rounded-full bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 dark:from-blue-600 dark:via-indigo-600 dark:to-purple-600 dark:hover:from-blue-500 dark:hover:via-indigo-500 dark:hover:to-purple-500"
    >
      <CaretUpIcon className="size-4" />
      <span className="font-medium text-white">1,000,000</span>
      <span className="sr-only">votes</span>
    </Button>
  );
}
