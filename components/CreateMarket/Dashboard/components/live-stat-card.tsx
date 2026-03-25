"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { PingIndicator } from "../../ui/ping-indicator";
import { EndDateList } from "./end-date-list";
import { Button } from "@/components/ui/button";
import { formatUtcDate } from "@/lib/formatUtcDate";
import { useMarketMetricsStore } from "../store/market-metrics-store";

const PAGE_SIZE = 5;

type LiveMarket = {
  marketId: number;
  question: string;
  image: string;
  createdAt: string;
};

type LiveMarketResponse = {
  items: LiveMarket[];
  totalCount: number;
};

export const LiveStatCard = () => {
  const [items, setItems] = useState<LiveMarket[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  // const setOpened = useMarketMetricsStore((s) => s.setOpened);
  // const registerMetric = useMarketMetricsStore((s) => s.registerMetric);
  const setMetric = useMarketMetricsStore((s) => s.setMetric);


  const fetchMarkets = async (page: number) => {
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profiles/market-history?status=open&page=${page}&limit=${PAGE_SIZE}`,
      { credentials: "include" }
    );
    if (!res.ok) {
      console.error("Failed to fetch live markets");
      setLoading(false);
      return;
    }

    const data: LiveMarketResponse = await res.json();
    // console.log("Live Market", data);

    setItems(data.items);
    setTotalCount(data.totalCount);
    // registerMetric("opened", data.totalCount);
    // setOpened(data.totalCount);
    setMetric("opened", data.totalCount);


    setLoading(false);
  };

  useEffect(() => {
    fetchMarkets(page);
  }, [page]); // ✅ THIS WAS MISSING

  const totalPages = Math.floor((totalCount === 0 ? 0 : totalCount - 1) / PAGE_SIZE);

  return (
    <div className="relative rounded-[20px] p-[1px] bg-linear-to-br from-white/45 via-white/10 to-transparent">
      <div className="rounded-[20px] bg-linear-to-t from-[#0E0E0E] to-neutral-900 flex flex-col">
        <div className="flex items-center p-6">
          <span className="flex gap-3 items-center flex-1">
            <span className="text-sm md:text-xl bg-linear-to-t from-[#999999] to-[#FFFFFF] bg-clip-text text-transparent font-medium">
              Live Market
            </span>
            <PingIndicator />
          </span>
          <span className="text-neutral-500 text-sm hidden md:block">
            End Date
          </span>
        </div>

        <Separator className="bg-linear-to-l from-neutral-800 to-neutral-700" />

        <div className="p-6 flex flex-col gap-4 min-h-44">
          {items.map((market) => (
            <EndDateList
              key={market.marketId}
              img={market.image}
              title={market.question}
              endDate={formatUtcDate(market.createdAt)}
              marketId={market.marketId}
            />
          ))}

          <div className="flex justify-between items-center pt-4">
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
