"use client";
import { AdminAppSidebar } from "@/components/Admin/AdminDash/components/admin-app-sidebar";
import { AdminMobileNavbar } from "@/components/Admin/ui/admin-mobile-navbar";
import { AppSidebar } from "@/components/app-sidebar";
import { CreateMarketSidebar } from "@/components/CreateMarket/ui/create-market-sidebar";

import { MobileNavbar } from "@/components/ui/mobile-navbar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "react-hot-toast";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        {/* <AdminAppSidebar /> */}
        <CreateMarketSidebar />
        <SidebarInset>{children}</SidebarInset>
        <MobileNavbar />
        {/* <AdminMobileNavbar /> */}
      </SidebarProvider>
      <Toaster />
    </>
  );
}
