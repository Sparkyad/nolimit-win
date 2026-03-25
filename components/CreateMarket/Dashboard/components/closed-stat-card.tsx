"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ClosedList } from "./closed-list";
import { Button } from "@/components/ui/button";
import { useMarketMetricsStore } from "../store/market-metrics-store";
import { ClosedMarketList } from "../data/closed-list";

const PAGE_SIZE = 5;

export type ClosedMarket = {
  marketId: number;
  question: string;
  image: string;
  createdAt: string;
  creatorFee: number;
};

type ClosedMarketResponse = {
  items: ClosedMarket[];
  totalCount: number;
};

export const ClosedStatCard = () => {
  const [items, setItems] = useState<ClosedMarket[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  // const setClosed = useMarketMetricsStore((s) => s.setClosed);
  // const registerMetric = useMarketMetricsStore((s) => s.registerMetric);
  const setMetric = useMarketMetricsStore((s) => s.setMetric);

  const fetchClosedMarkets = async (page: number) => {
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profiles/market-history?status=closed&page=${page}&limit=${PAGE_SIZE}`,
      { credentials: "include" }
    );
    if (!res.ok) {
      console.error("Failed to fetch closed markets");
      setLoading(false);
      return;
    }

    const data: ClosedMarketResponse = await res.json();

    setItems(data.items);
    setTotalCount(data.totalCount);
    // setClosed(data.totalCount);
    // registerMetric("closed", data.totalCount);
    setMetric("closed", data.totalCount);

    setLoading(false);
  };

  useEffect(() => {
    fetchClosedMarkets(page);
  }, [page]); // ✅ critical

  const totalPages = Math.floor(
    (totalCount === 0 ? 0 : totalCount - 1) / PAGE_SIZE
  );

  return (
    <div className="relative flex-1 rounded-[20px] p-[1px] bg-linear-to-br from-white/45 via-white/10 to-transparent">
      <div className="flex flex-col rounded-[20px] bg-linear-to-t from-[#0E0E0E] to-neutral-900">
        {/* Header */}
        <div className="grid grid-cols-[3fr_1fr_1fr] items-center p-6">
          <span className="text-sm md:text-xl font-medium bg-linear-to-t from-[#999999] to-[#FFFFFF] bg-clip-text text-transparent">
            Closed Markets
          </span>

          <span className="hidden md:block text-center text-sm text-neutral-500">
            Earned Fees (&#36;)
          </span>
          <span className="hidden md:block text-right text-sm text-neutral-500">
            Created At
          </span>
        </div>

        <Separator className="bg-linear-to-l from-neutral-800 to-neutral-700" />

        {/* Content */}
        <div className="flex flex-col gap-4 p-6 min-h-56">
          {items.map((market, index) => (
            <ClosedList
              key={index}
              title={market.question}
              createdAt={market.createdAt}
              creatorFee={market.creatorFee}
            />
          ))}

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <Button
              size="sm"
              className="cursor-pointer"
              variant="ghost"
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
              className="cursor-pointer"
              variant="ghost"
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
