"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMarketMetricsStore } from "../store/market-metrics-store";

const PAGE_SIZE = 5;

export type RejectMarket = {
  marketId: number;
  createdAt: string;
  question: string;
};

type RejectMarketResponse = {
  items: RejectMarket[];
  totalCount: number;
};

export const RejectedStatCard = () => {
  const router = useRouter();
  const [items, setItems] = useState<RejectMarket[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  // const setRejected = useMarketMetricsStore((s) => s.setRejected);
  // const registerMetric = useMarketMetricsStore((s) => s.registerMetric);
  const setMetric = useMarketMetricsStore((s) => s.setMetric);


  const fetchRejectedMarkets = async (page: number) => {
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profiles/market-history?status=rejected&page=${page}&limit=${PAGE_SIZE}`,
      { credentials: "include" }
    );
    if (!res.ok) {
      console.error("Failed to fetch rejected markets");
      setLoading(false);
      return;
    }

    const data: RejectMarketResponse = await res.json();
    // console.log("Rejected: ", data);
    setItems(data.items);
    setTotalCount(data.totalCount);
    // registerMetric("rejected", data.totalCount);
    setMetric("rejected", data.totalCount);

    // setRejected(data.totalCount)
    setLoading(false);
  };

  useEffect(() => {
    fetchRejectedMarkets(page);
  }, [page]); // ✅ critical

  const totalPages = Math.floor((totalCount === 0 ? 0 : totalCount - 1) / PAGE_SIZE);

  return (
    <div className="relative rounded-[20px] p-[1px] bg-linear-to-br from-white/45 via-white/10 to-transparent">
      <div className="rounded-[20px] bg-linear-to-t from-[#0E0E0E] to-neutral-900 flex flex-col">
        {/* Header */}
        <div className="flex items-center p-6">
          <span className="flex-1 text-sm md:text-xl font-medium bg-linear-to-t from-[#999999] to-[#FFFFFF] bg-clip-text text-transparent">
            Rejected Market
          </span>

          <span className="hidden md:block text-neutral-500 text-sm">
            Reason
          </span>
        </div>

        <Separator className="bg-linear-to-l from-neutral-800 to-neutral-700" />

        {/* Content */}
        <div className="p-6 flex flex-col gap-4 min-h-44">
          {items.map((market, index) => (
            <div
              key={`${market.createdAt}-${index}`}
              className="grid grid-cols-[3fr_1fr] items-center gap-4"
            >
              {/* Question */}
              <p className="truncate line-clamp-2 text-sm lg:text-lg font-medium">
                {market.question}
              </p>

              {/* Reason */}
              <div className="text-right">
                <Button
                  variant="marketGradient"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(`/create-market?edit=${market.marketId}`)
                  }
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-between items-center pt-4">
            <Button
              size="sm"
              variant="ghost"
              disabled={page === 0 || loading}
              onClick={() => setPage((p) => p - 1)}
              className="cursor-pointer"
            >
              Previous
            </Button>

            <span className="text-sm text-neutral-500">
              Page {page} of {totalPages}
            </span>

            <Button
              size="sm"
              variant="ghost"
              disabled={page === totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              className="cursor-pointer"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
