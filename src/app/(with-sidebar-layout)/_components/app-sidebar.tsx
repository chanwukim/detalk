"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import paths from "@/config/paths";

import HomeFillIcon from "@/components/icons/home-fill-icon";
import HomeIcon from "@/components/icons/home-icon";
import PlusIcon from "@/components/icons/plus-icon";
import UserCircleFillIcon from "@/components/icons/user-circle-fill-icon";
import UserCircleIcon from "@/components/icons/user-circle-icon";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarGroup,
  SidebarHeader,
  SidebarContent,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export default function AppSidebar() {
  const pathname = usePathname();

  function isActive(path: string): boolean {
    return pathname === path;
  }

  function isProfileActive(handle: string): boolean {
    if (!handle) {
      return false;
    }
    const profilePath = paths.member.profile.getHref(handle);
    return pathname === profilePath || pathname.startsWith(`${profilePath}/`);
  }

  return (
    <Sidebar className="md:border-none">
      <SidebarHeader>
        <div className="flex items-center py-4 pl-2">
          <Link
            href={paths.home.getHref()}
            className="inline-flex items-center gap-2"
          >
            <Logo />
            <span className="text-xl font-bold">Detalk</span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link href={paths.home.getHref()}>
                    {isActive(paths.home.getHref()) ? (
                      <HomeFillIcon />
                    ) : (
                      <HomeIcon />
                    )}
                    Home
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link href={paths.posts.new.getHref()}>
                    {isActive(paths.posts.new.getHref()) ? (
                      <PlusIcon />
                    ) : (
                      <PlusIcon />
                    )}
                    New Post
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link href={paths.member.profile.getHref("TODO")}>
                    {isProfileActive("TODO") ? (
                      <UserCircleFillIcon />
                    ) : (
                      <UserCircleIcon />
                    )}
                    Profile
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="mt-4 flex justify-center">
                <Button className="rounded-full px-10" asChild>
                  <Link href={paths.auth.signIn.getHref()}>Sign in</Link>
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
