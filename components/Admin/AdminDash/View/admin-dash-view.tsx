"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AdminPageFrame } from "../../ui/admin-page-frame";

import { AdminSmallCard } from "../components/admin-small-cards";

import { AdminPendingStatCard } from "../components/admin-pendint-stat-card";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Skeleton } from "@/components/ui/skeleton";
import { getUsdcBalance } from "@/lib/solanaTrade";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Add02Icon,
  AddCircleHalfDotIcon,
} from "@hugeicons/core-free-icons";

import { AddFundsBtn } from "../../AdminCreate/components/add-fund-btn";
import { WithdrawFundsBtn } from "../../AdminCreate/components/withdraw-btn";
import { useAdminStore, useAdminStoreForUsdc } from "@/store/useAdminStore";
import { AdminPanelTable } from "../components/admin-panel-table";
import { UnansweredMarkets } from "../components/unanswered-markets";

type AdminMetrics = {
  marketsCreated: number;
  resolvedMarkets: number;
  liveMarkets: number;
  marketsEndingSoon: number;
  marketsTotalVolume: string;
};

type ProfileData = {
  walletAddress: string;
  username: string | null;
};

export const AdminDashView = () => {
  const { role } = useAdminStore();
  const { publicKey: walletPublicKey, signTransaction, connected } = useWallet();

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [metrics, setMetrics] = useState<AdminMetrics>({
    marketsCreated: 0,
    resolvedMarkets: 0,
    liveMarkets: 0,
    marketsEndingSoon: 0,
    marketsTotalVolume: "0",
  });
  // const [usdcBal, setUsdcBal] = useState<string>("0");
  const { usdcBal, setUsdcBal } = useAdminStoreForUsdc();

  useEffect(() => {
    async function fetchProfileData() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profiles/${walletPublicKey?.toBase58()}`,
      );
      const data = await res.json();
      // console.log("Profile Data",data);
      setProfileData(data);
    }

    fetchProfileData();
  }, [walletPublicKey]);

  useEffect(() => {
    async function fetchMetrics() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/metrics`,
        {
          credentials: "include",
        },
      );
      if (!res.ok) {
        console.log("Failed to fetch admin metrics");
        return;
      }

      const data = await res.json();
      setMetrics(data);
    }

    fetchMetrics();
    // Fetch USDC balance from Solana wallet
    if (walletPublicKey) {
      getUsdcBalance(walletPublicKey.toBase58())
        .then((balance) => {
          const formattedBal = (Number(balance) / 1_000_000).toString();
          setUsdcBal(formattedBal);
        })
        .catch((error) => {
          console.error("Error fetching USDC balance:", error);
        });
    }
  }, []);

  const BASE_SMALL_CARDS = [
    {
      key: "marketsCreated",
      img: "/Admin/Dash/icon-1.avif",
      label: "Market Created",
    },
    {
      key: "resolvedMarkets",
      img: "/Admin/Dash/icon-2.avif",
      label: "Market Resolved",
    },
    {
      key: "liveMarkets",
      img: "/Admin/Dash/icon-3.avif",
      label: "Market Live",
    },
    {
      key: "marketsEndingSoon",
      img: "/Admin/Dash/icon-4.avif",
      label: "Market’s Ending In 12 Hour",
    },
  ] as const;

  const isProfileLoaded = !!profileData;
  const truncateAddress = (address?: string, chars = 4) => {
    if (!address) return "";
    if (address.length <= chars * 2) return address;

    return `${address.slice(0, chars)}...${address.slice(-chars)}`;
  };

  return (
    <AdminPageFrame>
      <div className="p-5 lg:p-10 flex flex-col gap-10">
        <div className="tracking-tighter text-2xl md:text-3xl flex justify-between items-center">
          <div>
            {!isProfileLoaded && <Skeleton className="h-12 w-40 rounded-sm" />}

            {isProfileLoaded && (
              <span>
                Hello,{" "}
                {profileData?.username ?? truncateAddress(walletPublicKey?.toBase58())}
              </span>
            )}
          </div>
          {role === "admin" ? (
            <div className="hidden md:flex items-center gap-2 tracking-wide">
              <AddFundsBtn />
              <WithdrawFundsBtn />
            </div>
          ) : null}
        </div>
        <div
          className="flex flex-col gap-4
    min-[600px]:grid min-[600px]:grid-cols-2
    min-[1300px]:flex min-[1300px]:flex-row"
        >
          {BASE_SMALL_CARDS.map((data, index) => {
            return (
              <AdminSmallCard
                key={index}
                img={data.img}
                label={data.label}
                stats={metrics[data.key].toLocaleString()}
                variant={index === 0 ? "highlight" : "default"}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-1 min-[1000px]:grid-cols-2 gap-4">
          <div>
            <MapComponent
              label="Total Market Volume"
              stat={metrics.marketsTotalVolume}
              icon="tm-vol"
            />
          </div>
          <div>
            <MapComponent
              stat={usdcBal}
              label="Smart Contract Balance"
              icon="p-vol"
            />
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div>
            <span className="tracking-tighter text-2xl md:text-3xl">
              <span>Unresolved Markets</span>
            </span>
          </div>
          <div>
            <AdminPendingStatCard />
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div>
            <span className="tracking-tighter text-2xl md:text-3xl">
              <span>Unanswered Markets</span>
            </span>
          </div>
          <div>
            <UnansweredMarkets />
          </div>
        </div>
        {role === "admin" && (
          <div className="flex flex-col gap-10">
            <div>
              <span className="tracking-tighter text-2xl md:text-3xl flex justify-between">
                <span>Admin Management</span>
              </span>
            </div>
            <div>
              <AdminPanelTable />
            </div>
          </div>
        )}
      </div>
    </AdminPageFrame>
  );
};

interface MapComponentProps {
  label: string;
  stat?: number | string;
  icon?: string;
}

export const MapComponent = ({ label, stat, icon }: MapComponentProps) => {
  return (
    <div className="relative rounded-[20px] p-[1px] flex-1 bg-linear-to-br from-white/45 via-white/10 to-transparent">
      <div className="relative rounded-[20px] p-[1px] flex-1 bg-linear-to-tl from-white/45 via-white/10 to-transparent">
        <div className="rounded-[20px] bg-linear-to-t from-[#0E0E0E] to-neutral-900">
          <div className="p-6 flex flex-col gap-3">
            <div className="flex">
              <div className="flex-1">
                <img src={`/Admin/Dash/${icon}.avif`} className="w-16" />
              </div>
              <div className="flex-2 flex flex-col gap-1.5 items-end text-right">
                <span className="text-xs md:text-lg text-balance">{label}</span>
                <span className="font-bold text-xl md:text-xl lg:text-4xl">
                  {stat ? stat : 0}
                </span>
                {/* <span className="text-[10px] md:text-sm text-balance">
                  Compared To Last Month
                </span> */}
              </div>
            </div>
            {/* <div>
              <AdminSingleLineChart />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// <TotalMarketChart />
