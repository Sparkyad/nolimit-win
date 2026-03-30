import { CreateMarketSidebar } from "@/components/CreateMarket/ui/create-market-sidebar";

import { MobileNavbar } from "@/components/ui/mobile-navbar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Toaster } from "react-hot-toast";

export default function CreateMarketLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <CreateMarketSidebar />
        <SidebarInset>{children}</SidebarInset>
        <MobileNavbar />
      </SidebarProvider>
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
}
