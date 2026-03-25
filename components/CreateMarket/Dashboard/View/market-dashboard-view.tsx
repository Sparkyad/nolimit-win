"use client";
import { PageFrame } from "@/components/page-frame";
import { CreateMarketPageFrame } from "../../ui/create-market-page-frame";
import { SidebarTrigger } from "@/components/ui/sidebar";
// import { smallCardData } from "../data/small-card-data";
import { cn } from "@/lib/utils";
import { SmallCard } from "../components/small-stat-card";
import { PingIndicator } from "../../ui/ping-indicator";
import { Separator } from "@/components/ui/separator";
import { LiveEndDateListData } from "../data/end-date-list";
import { EndDateList } from "../components/end-date-list";
import { Progress } from "@/components/ui/progress";
import { liquidityListData } from "../data/liquidity-list";
import { LiveStatCard } from "../components/live-stat-card";
import { PendingStatCard } from "../components/pending-stat-card";
import { LiquidityList } from "../components/liquidity-list";
import { LiveInsufficientStatCard } from "../components/live-insuff-stat-card";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon, RefreshIcon } from "@hugeicons/core-free-icons";
import { ClosedMarketList } from "../data/closed-list";
import { ClosedList } from "../components/closed-list";
import Link from "next/link";
import { ClosedStatCard } from "../components/closed-stat-card";
import { RejectedStatCard } from "../components/rejected-stat-card";
import { useMarketMetricsStore } from "../store/market-metrics-store";
import { OverviewHint } from "../components/overhint";


export const CreateMarketDashboard = () => {
  // const { pending, rejected, opened } = useMarketMetricsStore();
  const { created, pending, rejected, opened } = useMarketMetricsStore();

  const smallCardData = [
    {
      img: "/CreateMarket/Dash/icon-1.avif",
      label: "Market Created",
      stats: created.toLocaleString(),
    },
    {
      img: "/CreateMarket/Dash/icon-2.avif",
      label: "Insufficient Liquidity Markets",
      stats: pending.toLocaleString(),
    },
    {
      img: "/CreateMarket/Dash/icon-3.avif",
      label: "Market Rejected",
      stats: rejected.toLocaleString(),
      labelColor: "text-red-400",
    },
    {
      img: "/CreateMarket/Dash/icon-4.avif",
      label: "Market Opened",
      stats: opened.toLocaleString(),
      labelColor: "text-emerald-500",
    },
  ];

  return (
    <CreateMarketPageFrame>
      <div className="p-5 lg:p-10 flex flex-col gap-10">
        <div className="md:flex md:justify-between md:items-end">
          <span className="tracking-tighter text-2xl flex flex-col gap-1">
            {/* <span className="flex items-center gap-1">
              <motion.button className="cursor-pointer">
                <HugeiconsIcon icon={RefreshIcon} className="-rotate-90" />
              </motion.button>
              verview
            </span> */}
            <OverviewHint />
            <span className="text-sm text-neutral-400 tracking-tight flex items-center gap-3">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              <span className="hidden md:block">
                <SidebarTrigger />
              </span>
            </span>
          </span>
          <div className="hidden md:block ">
            <Button
              className="tracking-tight cursor-pointer flex items-center"
              variant="marketGradient"
              asChild
            >
              <Link href="/create-market">
                Create Market
                <HugeiconsIcon icon={ArrowRight02Icon} size={24} />
              </Link>
            </Button>
          </div>
        </div>
        <div
          className="
    flex flex-col gap-4
    min-[600px]:grid min-[600px]:grid-cols-2
    min-[1300px]:flex min-[1300px]:flex-row
  "
        >
          {smallCardData.map((data, index) => (
            <SmallCard
              key={index}
              img={data.img}
              label={data.label}
              stats={data.stats}
              labelColor={data.labelColor}
            />
          ))}
        </div>
        {/* <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <LiveStatCard />
          </div>
          <div className="flex-1">
            <PendingStatCard />
          </div>
        </div> */}
        <div>
          <LiveStatCard />
        </div>
        {/* <div>
          <PendingStatCard />
        </div> */}
        <div>
          <LiveInsufficientStatCard />
        </div>
        <div>
          <RejectedStatCard />
        </div>
        <div>
          <ClosedStatCard />
        </div>
      </div>
    </CreateMarketPageFrame>
  );
};

// const GRID_COLS = "grid-cols-[2fr_2fr_1fr]";

// export const RejectedStatCard = ()=>{
//   return (
//     <div>

//     </div>
//   )
// }
