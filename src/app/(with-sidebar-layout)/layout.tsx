import { SidebarLayout } from "@/components/layouts/sidebar-layout";

import AppNavbar from "./_components/app-navbar";
import AppSidebar from "./_components/app-sidebar";

export default function WithSidebarLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <SidebarLayout
      className="md:bg-sidebar"
      navbar={<AppNavbar />}
      sidebar={<AppSidebar />}
    >
      <div className="bg-background h-full w-full md:mx-auto md:max-w-2xl md:overflow-hidden md:rounded-lg md:border md:shadow-xs">
        {children}
      </div>
    </SidebarLayout>
  );
}
