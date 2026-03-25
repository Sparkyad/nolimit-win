"use client";

import Image from "next/image";
import {
  Award01Icon,
  DashboardBrowsingIcon,
  Home01Icon,
  ManagerIcon,
  Medal01Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";

import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ThirdWebConnectBtn } from "../thirdweb-connect-btn";
import { useAdminStore } from "@/store/useAdminStore";
import { useSolanaAuth } from "@/hooks/useSolanaAuth";

export function UserAppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { publicKey, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const router = useRouter();

  const checkAdmin = useAdminStore((state) => state.checkAdmin);
  const { isLoggedIn, doLogin } = useSolanaAuth();

  async function submit(url: string) {
    if (!connected) {
      setVisible(true);
      return;
    }
    // Ensure user is authenticated with backend before navigating to protected routes
    if (!isLoggedIn) {
      try {
        await doLogin();
        // Small delay to allow cookie to be set
        await new Promise((r) => setTimeout(r, 500));
      } catch (err) {
        console.error("Login failed:", err);
        return;
      }
    }
    router.push(url);
  }

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
          {/* <NavItem
            label="Admin"
            icon={<HugeiconsIcon icon={ManagerIcon} className="size-6 text-[#F5C16C]" />}
            href="/admin-dash"
          /> */}
          <NavItem
            label="Home"
            icon={<HugeiconsIcon icon={Home01Icon} className="size-6" />}
            href="/"
          />
          <NavItem
            label="Leaderboard"
            icon={
              <HugeiconsIcon
                icon={Award01Icon}
                className="size-6 text-[#FFCC86]"
              />
            }
            href="/leaderboard"
          />
          <SidebarMenuItem>
            <div
              onClick={() => submit("/dashboard")}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-3 cursor-pointer transition-all duration-300 overflow-hidden",
                "group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-start",
                "hover:bg-[#2a2a2a]"
              )}
            >
              <div className="size-6 text-white shrink-0">
                <HugeiconsIcon
                  icon={DashboardBrowsingIcon}
                  className="size-6"
                />
              </div>

              <span
                className={cn(
                  "text-base transition-all duration-300",
                  "group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:pointer-events-none"
                )}
              >
                Dashboard
              </span>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div
              onClick={() => submit("/profile")}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-3 cursor-pointer transition-all duration-300 overflow-hidden",
                "group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-start",
                "hover:bg-[#2a2a2a]"
              )}
            >
              <div className="size-6 text-white shrink-0">
                <HugeiconsIcon
                  icon={Medal01Icon}
                  className="size-6"
                />
              </div>

              <span
                className={cn(
                  "text-base transition-all duration-300",
                  "group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:pointer-events-none"
                )}
              >
                Profile
              </span>
            </div>
          </SidebarMenuItem>
          {/* <div
            onClick={() => submit("/dashboard")}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-3 cursor-pointer transition-all duration-300 overflow-hidden",
              "group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-start",
              "hover:bg-[#2a2a2a]"
            )}
          >
            <HugeiconsIcon icon={DashboardBrowsingIcon} className="size-6" />
            Dashboard
          </div> */}

          <CreateMarketBtn
            label="Create"
            icon={
              <HugeiconsIcon
                icon={PlusSignIcon}
                className="size-6 text-white"
              />
            }
            submit={submit}
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
function CreateMarketBtn({
  label,
  icon,
  submit,
}: {
  label: string;
  icon: React.ReactNode;
  submit: (url: string) => Promise<void>;
}) {
  return (
    <SidebarMenuItem>
      <div
        onClick={() => submit("/create-market")}
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
