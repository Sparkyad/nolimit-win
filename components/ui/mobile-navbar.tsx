"use client";
import {
  Analytics01Icon,
  Award01Icon,
  Home01Icon,
  ManagerIcon,
  Menu01Icon,
  PlusSignIcon,
  UserStoryIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { useRouter } from "next/navigation";
import { ThirdWebConnectBtn } from "../thirdweb-connect-btn";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useAdminStore } from "@/store/useAdminStore";
import { AddFundsBtn } from "../Admin/AdminCreate/components/add-fund-btn";
import { useState } from "react";
import { WithdrawFundsBtn } from "../Admin/AdminCreate/components/withdraw-btn";
import { HowItWorksDialog } from "../CreateMarket/CreateMarketForm/View/create-market-view";
import { useSolanaAuth } from "@/hooks/useSolanaAuth";

interface ProfileData {
  username: string | null;
}

export const MobileNavbar = () => {
  const { role, loading, checkAdmin } = useAdminStore();

  const { publicKey, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const router = useRouter();
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
      } catch (err) {
        console.error("Login failed:", err);
        return;
      }
    }
    // Use window.location.href for protected routes to force a full server render
    // so the (Create) layout can read the auth_token cookie
    window.location.href = url;
  }

  return (
    <div className="block md:hidden w-full h-24 bg-linear-to-t from-neutral-900 to-neutral-800 fixed bottom-0 rounded-t-3xl border-t border-neutral-600 shadow-lg">
      <div className="p-4 h-full flex justify-center items-center text-xs">
        <div
          onClick={() => submit("/create-market")}
          className="flex-1 flex justify-center flex-col items-center gap-2"
        >
          <HugeiconsIcon icon={PlusSignIcon} />
          <span>Create</span>
        </div>

        <Link
          href="/"
          className="flex-1 flex justify-center flex-col items-center gap-2"
        >
          <HugeiconsIcon icon={Home01Icon} />
          <span>Home</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex-1 flex justify-center flex-col items-center gap-2">
              <HugeiconsIcon icon={Menu01Icon} />
              <span>Menu</span>
            </div>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="bg-neutral-900 border-transparent text-white pb-10"
          >
            <SheetHeader>
              <SheetTitle className="text-white text-xl flex gap-4 items-center">
                <img
                  src="/Logo/logo-2.png"
                  alt="logo"
                  className="w-8 aspect-square object-cover rounded-md"
                />
                NoLimit
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 px-5">
              <div className="pb-3">
                <span className="text-xl font-semibold line-clamp-1 truncate">
                  Hello, {publicKey?.toBase58()?.slice(0, 6) ?? "there"}
                </span>
              </div>
              <SheetTrigger asChild>
                <Link
                  href="/leaderboard"
                  className="text-lg font-semibold flex gap-4 items-center"
                >
                  <HugeiconsIcon
                    icon={Award01Icon}
                    className="text-yellow-500"
                  />
                  Leaderboard
                </Link>
              </SheetTrigger>
              <SheetTrigger asChild>
                <div
                  onClick={() => submit("/dashboard")}
                  className="text-lg font-semibold flex gap-4 items-center"
                >
                  <HugeiconsIcon
                    icon={Analytics01Icon}
                    className="text-pink-400"
                  />
                  Dashboard
                </div>
              </SheetTrigger>
              <SheetTrigger asChild>
                <div
                  onClick={() => submit("/profile")}
                  className="text-lg font-semibold flex gap-4 items-center"
                >
                  <HugeiconsIcon
                    icon={UserStoryIcon}
                    className="text-blue-400"
                  />
                  Profile
                </div>
              </SheetTrigger>
              {!loading && (role === "admin" || role === "moderator") && (
                <SheetTrigger asChild>
                  <div
                    onClick={() => submit("/admin-dash")}
                    className="text-lg font-semibold flex gap-4 items-center"
                  >
                    <HugeiconsIcon
                      icon={ManagerIcon}
                      className="text-orange-400"
                    />
                    Admin
                  </div>
                </SheetTrigger>
              )}

              <div className="flex flex-col gap-4">
                {!loading && (role === "admin") && (
                  <div className="w-full flex gap-3 justify-center">
                    <AddFundsBtn />
                    <WithdrawFundsBtn />
                  </div>
                )}
                <ThirdWebConnectBtn />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
