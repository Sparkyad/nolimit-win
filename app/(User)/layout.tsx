import { AppSidebar } from "@/components/app-sidebar";

import { MobileNavbar } from "@/components/ui/mobile-navbar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { UserAppSidebar } from "@/components/UserDashboard/user-app-sidebar";
import { Toaster } from "react-hot-toast";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <UserAppSidebar />
        <SidebarInset>{children}</SidebarInset>
        <MobileNavbar />
        <Toaster />
      </SidebarProvider>
    </>
  );
}
