"use client";

import Image from "next/image";
import {
  Award01Icon,
  ChartLineData01Icon,
  Clock01Icon,
  DashboardBrowsingIcon,
  Home01Icon,
  ManagerIcon,
  Medal01Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ThirdWebConnectBtn } from "@/components/thirdweb-connect-btn";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useSolanaAuth } from "@/hooks/useSolanaAuth";
import { useAdminStore } from "@/store/useAdminStore";

export function CreateMarketSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  const { role, loading } = useAdminStore();
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* LOGO */}
      <SidebarHeader>
        <Link href="/">
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-4 transition-all duration-300",
              "group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:items-center"
            )}
          >
            <img
              src="/Logo/logo-2.png"
              alt="NoLimit"
              className={cn(
                "rounded-sm shadow-sm object-cover transition-all duration-300 ease-in-out w-8"
              )}
            />
            <span
              className={cn(
                "text-xl font-semibold tracking-tight transition-all duration-300",
                "group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:-translate-x-3 group-data-[collapsible=icon]:pointer-events-none"
              )}
            >
              NoLimit
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <Separator className="bg-neutral-800 mb-4" />

      <SidebarContent>
        <SidebarMenu className="flex flex-col gap-3">
          <NavItem
            label="Home"
            icon={<HugeiconsIcon icon={Home01Icon} className="size-6" />}
            href="/"
          />
          {!loading && (role === "admin" || role === "moderator") && (
            <NavItem
              label="Admin"
              icon={
                <HugeiconsIcon
                  icon={ManagerIcon}
                  className="size-6 text-[#F5C16C]"
                />
              }
              href="/admin-dash"
            />
          )}

          <NavItem
            label="Dashboard"
            href="/dashboard"
            icon={
              <HugeiconsIcon icon={DashboardBrowsingIcon} className="size-6" />
            }
          />
          {/* <NavItem
            label="Create"
            href="/create-market"
            icon={<HugeiconsIcon icon={PlusSignIcon} className="size-6" />}
          /> */}
          <NavItem
            label="Profile"
            href="/profile"
            icon={<HugeiconsIcon icon={Medal01Icon} className="size-6" />}
          />
          <CreateMarketBtn
            label="Create"
            icon={
              <HugeiconsIcon
                icon={PlusSignIcon}
                className="size-6 text-white"
              />
            }
          />
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <ThirdWebConnectBtn />
      </SidebarFooter>
    </Sidebar>
  );
}

<HugeiconsIcon icon={PlusSignIcon} />;

function NavItem({
  label,
  icon,
  href,
}: {
  label: string;
  icon: React.ReactNode;
  href: string;
}) {
  const pathName = usePathname();
  const isActive = pathName === href || pathName.startsWith(`${href}/`);
  return (
    <SidebarMenuItem>
      <Link href={href}>
        <div
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-3 cursor-pointer transition-all duration-300 overflow-hidden",
            "group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-start",
            isActive ? "bg-[#202020]" : "hover:bg-[#2a2a2a]"
          )}
        >
          <div className="size-6 text-white transition-transform duration-300">
            {icon}
          </div>
          <span
            className={cn(
              "text-base transition-all duration-300",
              "group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:pointer-events-none"
            )}
          >
            {label}
          </span>
        </div>
      </Link>
    </SidebarMenuItem>
  );
}

export function CreateMarketBtn({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  const router = useRouter();
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const { isLoggedIn, doLogin } = useSolanaAuth();

  async function handleClick() {
    if (!connected) {
      setVisible(true);
      return;
    }
    if (!isLoggedIn) {
      try {
        await doLogin();
      } catch (err) {
        console.error("Login failed:", err);
        return;
      }
    }
    // Use window.location.href to force full server render so cookie is read
    window.location.href = "/create-market";
  }

  return (
    <SidebarMenuItem>
      <div
        onClick={handleClick}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-3 cursor-pointer transition-all duration-300 overflow-hidden",
          "group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-start bg-gradient-to-t from-[#0A2F1F] to-[#14B87A] transition-colors text-white"
        )}
      >
        <div className="size-6 text-white transition-transform duration-300">
          {icon}
        </div>
        <span
          className={cn(
            "text-base transition-all duration-300",
            "group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:pointer-events-none"
          )}
        >
          {label}
        </span>
      </div>
    </SidebarMenuItem>
  );
}
