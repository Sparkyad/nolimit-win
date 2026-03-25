import { AppSidebar } from "@/components/app-sidebar";
import { CreateMarketSidebar } from "@/components/CreateMarket/ui/create-market-sidebar";

import { MobileNavbar } from "@/components/ui/mobile-navbar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { UserAppSidebar } from "@/components/UserDashboard/user-app-sidebar";

import { Toaster } from "react-hot-toast";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function CreateMarketLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  if (!cookieStore.get("auth_token")) {
    redirect("/");
  }

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
