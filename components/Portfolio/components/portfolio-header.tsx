"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { PortfolioBadge } from "./portfolio-badge";
import { StatCard } from "./stat-card";
import { StatSeparator } from "./stat-separator";
import {
  PortfolioDataPoint,
  PortfolioLineChart,
} from "../chart/portfolio-chart";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useTradeHistory } from "@/hooks/useTradeHistory";
import { useRouter } from "next/navigation";
import NoLimitLoader from "@/components/Loader/nolimit-loader";

interface Props {
  walletAddress: string;
  activeData: ReturnType<typeof useTradeHistory>;
  closedData: ReturnType<typeof useTradeHistory>;
}

interface ProfileStats {
  totalVolume: number;
  totalPnl: number;
  marketsCreated: number;
}

export interface ProfileData {
  walletAddress: string;
  username: string | null;
  avatarUrl: string | null;
  joinedAt: string;
  stats: ProfileStats;
}

export const PortfolioHeader = ({ walletAddress, activeData, closedData }: Props) => {
  const router = useRouter();

  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  // Fetch profile data
  useEffect(() => {
    let cancelled = false;

    async function fetchProfileData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profiles/${walletAddress}`
        );

        if (!res.ok) {
          router.push("/");
          return;
        }

        const data = await res.json();
        if (!cancelled) setProfileData(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        router.push("/");
      }
    }

    fetchProfileData();

    return () => {
      cancelled = true;
    };
  }, [walletAddress, router]);

  // Memoized calculations
  const closedMarkets = closedData?.data?.items;

  const { chartData, pastMonthPnL, biggestWin } = useMemo(() => {
    if (!closedMarkets?.length) {
      return { chartData: [], pastMonthPnL: 0, biggestWin: 0 };
    }

    // Sort trades once
    const sortedTrades = [...closedMarkets].sort(
      (a, b) =>
        new Date(a.lastTradeDate).getTime() -
        new Date(b.lastTradeDate).getTime()
    );

    let runningPnL = 0;
    const data: PortfolioDataPoint[] = [];
    const now = Date.now();
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
    let monthPnL = 0;
    let maxWin = 0;

    // Single pass through data
    for (const trade of sortedTrades) {
      const pnl = Number(trade.pnl) || 0;
      runningPnL += pnl;

      data.push({
        date: new Date(trade.lastTradeDate).toISOString(),
        value: runningPnL,
      });

      // Calculate past month PnL
      const tradeTime = new Date(trade.lastTradeDate).getTime();
      if (now - tradeTime <= THIRTY_DAYS) {
        monthPnL += pnl;
      }

      // Track biggest win
      if (pnl > maxWin) {
        maxWin = pnl;
      }
    }

    return {
      chartData: data,
      pastMonthPnL: monthPnL,
      biggestWin: maxWin,
    };
  }, [closedMarkets]);

  const predictions = useMemo(
    () => (activeData?.data?.items.length || 0) + (closedMarkets?.length || 0),
    [activeData?.data?.items.length, closedMarkets?.length]
  );

  const displayName = useMemo(() => {
    if (!profileData) return "";
    return profileData.username
      ? profileData.username
      : `${profileData.walletAddress.slice(0, 6)}...${profileData.walletAddress.slice(-4)}`;
  }, [profileData]);

  if (!profileData) {
    return (
      <div className="flex justify-center items-center">
        <NoLimitLoader />
      </div>
    );
  }

  return (
    <div className="flex gap-5 flex-col md:flex-row">
      <div className="flex-1 bg-[#1C1C1C] p-5 rounded-md flex flex-col md:gap-16 gap-10">
        <div className="flex items-center gap-4 flex-1">
          <PortfolioBadge
            displayName={displayName}
            joinedAt={profileData.joinedAt}
            avatarUrl={profileData.avatarUrl}
            wallet={walletAddress}
          />
        </div>
        <div className="flex gap-3 md:gap-6 flex-wrap">
          <StatCard
            label="Markets Created"
            value={profileData.stats.marketsCreated}
          />
          <StatSeparator />
          <div className="text-emerald-500">
            <StatCard label="Biggest Win" wins={Number(biggestWin.toFixed(2))} />
          </div>
          <StatSeparator />
          <StatCard label="Predictions" value={predictions} />
        </div>
      </div>
      <div className="flex-1 bg-[#1C1C1C] p-5 rounded-md flex flex-col md:gap-16 gap-10">
        <div className="flex flex-col gap-1.5 flex-1">
          <span className="text-lg flex gap-1 items-center text-neutral-300">
            <HugeiconsIcon
              icon={ArrowUp01Icon}
              className={pastMonthPnL >= 0 ? "text-emerald-500" : "text-red-400"}
              size={20}
            />
            Profit/Loss
          </span>
          <span
            className={`md:text-2xl font-bold ${pastMonthPnL >= 0 ? "text-emerald-500" : "text-red-400"
              }`}
          >
            {pastMonthPnL >= 0 ? "+" : "-"}$
            {Math.abs(pastMonthPnL).toLocaleString()}
          </span>
          <span className="text-sm font-light text-neutral-300">
            Past Month
          </span>
        </div>
        <div className="h-20">
          <PortfolioLineChart data={chartData} />
        </div>
      </div>
    </div>
  );
};
