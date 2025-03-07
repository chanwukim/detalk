"use client";

import { useEffect } from "react";

import cn from "@/libs/cn";

import MenuIcon from "../icons/menu-icon";
import { Button } from "../ui/button";
import { SidebarProvider, SidebarTrigger, useSidebar } from "../ui/sidebar";

export type SidebarLayoutProps = React.PropsWithChildren<{
  navbar: React.ReactNode;
  sidebar: React.ReactNode;
  className?: string;
}>;

export function SidebarLayout(props: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <BaseSidebarLayout {...props} />
    </SidebarProvider>
  );
}

function BaseSidebarLayout({
  navbar,
  sidebar,
  children,
  className,
}: SidebarLayoutProps) {
  const { isOpen, setIsOpenMobile, toggleSidebar } = useSidebar();

  function handleClose() {
    setIsOpenMobile(false);
  }

  useEffect(() => {
    window.addEventListener("resize", handleClose);

    return () => {
      window.removeEventListener("resize", handleClose);
    };
  }, []);

  return (
    <div
      className={cn(
        "bg-background relative flex min-h-svh w-full flex-col md:flex-row",
        className,
      )}
    >
      <header className="bg-background sticky top-0 z-[var(--z-sticky)] flex items-center px-4 md:hidden">
        <div className="py-2.5">
          <Button size="icon" variant="ghost" onClick={toggleSidebar}>
            <span className="sr-only">Open navigation menu</span>
            <MenuIcon />
          </Button>
        </div>
        <div className="min-w-0 flex-1">{navbar}</div>
      </header>

      {sidebar}

      <div
        className={cn("hidden h-full px-1 py-2.5 md:block", !isOpen && "pl-2")}
      >
        <SidebarTrigger className="sticky top-2.5" />
      </div>

      <main className="flex flex-1 flex-col pb-2 md:min-w-0 md:px-2 md:pt-2">
        {children}
      </main>
    </div>
  );
}
