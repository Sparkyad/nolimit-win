"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { PingIndicator } from "../../ui/ping-indicator";
import { LiquidityList } from "./liquidity-list";
import { Button } from "@/components/ui/button";
import { useMarketMetricsStore } from "../store/market-metrics-store";

const PAGE_SIZE = 5; // match LiveStatCard pattern

export type LiveInsuff = {
  marketId: number;
  question: string;
  image: string;
  LIQUIDATION_THRESHOLD: number;
  totalVolume: number;
};

type LiveInsuffResponse = {
  items: LiveInsuff[];
  totalCount: number;
};

export const LiveInsufficientStatCard = () => {
  const [items, setItems] = useState<LiveInsuff[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  // const setPending = useMarketMetricsStore((s) => s.setPending);
  // const registerMetric = useMarketMetricsStore((s) => s.registerMetric);
  const setMetric = useMarketMetricsStore((s) => s.setMetric);



  const fetchInsufficientMarkets = async (page: number) => {
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profiles/market-history?status=insufficientLiquidity&page=${page}&limit=${PAGE_SIZE}`,
      { credentials: "include" }
    );
    if (!res.ok) {
      console.error("Failed to fetch insufficient liquidity markets");
      setLoading(false);
      return;
    }

    const data: LiveInsuffResponse = await res.json();
    // console.log("Insufficiant Liquidity", data);

    setItems(data.items);
    setTotalCount(data.totalCount);
    // setPending(data.totalCount)
    // registerMetric("pending", data.totalCount);
    setMetric("pending", data.totalCount);

    setLoading(false);
  };

  useEffect(() => {
    fetchInsufficientMarkets(page);
  }, [page]); // ✅ critical

  const totalPages = Math.floor((totalCount === 0 ? 0 : totalCount - 1) / PAGE_SIZE);

  return (
    <div
      className="
        relative flex-1 rounded-[20px] p-[1px]
        bg-linear-to-br from-white/45 via-white/10 to-transparent
      "
    >
      <div className="flex flex-col rounded-[20px] bg-linear-to-t from-[#0E0E0E] to-neutral-900">
        {/* Header */}
        <div className="grid grid-cols-[3fr_1fr] md:grid-cols-[2fr_2fr] items-center p-6">
          <div className="flex items-center gap-3">
            <span className="text-sm md:text-xl font-medium bg-linear-to-t from-[#999999] to-[#FFFFFF] bg-clip-text text-transparent">
              Live — Insufficient Liquidity
            </span>
            <span className="hidden md:block">
              <PingIndicator color="red" />
            </span>
          </div>

          <span className="block text-right text-sm text-neutral-500">
            Liquidity
          </span>
        </div>

        <Separator className="bg-linear-to-l from-neutral-800 to-neutral-700" />

        {/* Content */}
        <div className="flex flex-col gap-4 p-6 min-h-56">
          {items.map((market) => (
            <LiquidityList
              key={market.marketId}
              marketId={market.marketId}
              question={market.question}
              image={market.image}
              liquidityThreshold={market.LIQUIDATION_THRESHOLD}
              totalVolume={market.totalVolume}
            />
          ))}

          {/* Pagination */}
          <div className="flex justify-between items-center pt-4">
            <Button
              size="sm"
              variant="ghost"
              className="cursor-pointer"
              disabled={page === 0 || loading}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>

            <span className="text-sm text-neutral-500">
              Page {page} of {totalPages}
            </span>

            <Button
              size="sm"
              variant="ghost"
              className="cursor-pointer"
              disabled={page === totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
