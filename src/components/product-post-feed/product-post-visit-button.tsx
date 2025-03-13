import ArrowSquareOutIcon from "../icons/arrow-square-out-icon";
import ArrowUpRightIcon from "../icons/arrow-up-right-icon";
import { Button } from "../ui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "../ui/dropdown";

export default function ProductPostFeedVisitButton() {
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
            href={"TODO"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <ArrowSquareOutIcon
              size={20}
              className="mr-2 fill-blue-600 hover:fill-blue-600/80"
            />
            detalk.net
          </a>
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}
