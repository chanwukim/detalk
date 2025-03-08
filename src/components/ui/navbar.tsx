import Link from "next/link";

import cn from "@/libs/cn";

import { Button, type ButtonProps } from "./button";

export function Navbar({ children }: React.PropsWithChildren) {
  return (
    <nav className="flex flex-1 items-center gap-4 py-2.5">{children}</nav>
  );
}

export function NavbarDivider() {
  return <div aria-hidden className="bg-primary/10 h-6 w-px" />;
}

export type NavbarItemProps = ButtonProps & {
  href?: string;
  isCurrent?: boolean;
};
export function NavbarItem({
  href,
  isCurrent = false,
  children,
  className,
  ...rest
}: NavbarItemProps) {
  if (href) {
    return (
      <div className="relative">
        <Button variant="ghost" className={className} {...rest} asChild>
          <Link href={href}>{children}</Link>
        </Button>
        {isCurrent && (
          <span className="bg-primary absolute inset-x-2 -bottom-2.5 h-0.5 rounded-full" />
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <Button variant="ghost" className={className} {...rest}>
        {children}
      </Button>
      {isCurrent && (
        <span className="bg-primary absolute inset-x-2 -bottom-2.5 h-0.5 rounded-full" />
      )}
    </div>
  );
}

export type NavbarLabelProps = React.PropsWithChildren & {
  className?: string;
};
export function NavbarLabel({ children, className }: NavbarLabelProps) {
  return <div className={cn("text-sm font-medium", className)}>{children}</div>;
}

export type NavbarSectionProps = React.PropsWithChildren & {
  className?: string;
};
export function NavbarSection({ children, className }: NavbarSectionProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>{children}</div>
  );
}

export function NavbarSpacer() {
  return <div aria-hidden className="flex-1" />;
}
