import NextLink from "next/link";

import cn from "@/libs/cn";

export type TabNavigationProps = React.ComponentProps<"div">;

export function TabNavigation({ children, className }: TabNavigationProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <ul className="flex items-center overflow-x-auto overflow-y-hidden">
        {children}
      </ul>
      <div className="bg-border absolute right-0 bottom-0 left-0 h-px" />
    </div>
  );
}

export type TabNavigationLinkProps = React.ComponentProps<"a"> & {
  href: string;
  isSelected?: boolean;
};

export function TabNavigationLink({
  href,
  isSelected,
  children,
  className,
  ...rest
}: TabNavigationLinkProps) {
  return (
    <li className={cn("group relative flex-shrink-0", className)}>
      <NextLink
        href={href}
        className={cn(
          "flex h-12 items-center justify-center px-5 font-medium",
          "group-hover:bg-muted group-hover:text-foreground",
          isSelected ? "text-foreground" : "text-muted-foreground",
        )}
        {...rest}
      >
        {children}
      </NextLink>
      {isSelected && (
        <span className="bg-primary absolute right-0 bottom-0 left-0 z-10 mx-3 block h-1" />
      )}
    </li>
  );
}
