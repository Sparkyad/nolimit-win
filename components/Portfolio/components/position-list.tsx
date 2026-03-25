"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CancelCircleIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { TradeHistoryItem } from "@/types/trade-history";
import { useTradeHistory } from "@/hooks/useTradeHistory";
import { ActiveListSkeleton } from "@/components/Profile/components/ActiveListSkeleton";
import { ClosedListSkeleton } from "@/components/Profile/components/ClosedListSkeleton";
import Link from "next/link";

interface PositionsListProps {
  activeData: ReturnType<typeof useTradeHistory>;
  closedData: ReturnType<typeof useTradeHistory>;
}

export const PositionsList = ({ activeData, closedData }: PositionsListProps) => {
  const [activeTab, setActiveTab] = useState<"active" | "closed">("active");

  // Select current tab's data
  const currentData = activeTab === "active" ? activeData : closedData;
  const { data, loading, error, loadMore, hasMore, isLoadingMore } = currentData;

  return (
    <div className="flex flex-col gap-8">
      <div className="px-5">
        <div className="inline-flex rounded-xl bg-neutral-800 p-1 self-start">
          <button
            onClick={() => setActiveTab("active")}
            className={cn(
              "lg:px-6 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer",
              activeTab === "active"
                ? "bg-neutral-900 text-white"
                : "text-neutral-400"
            )}
          >
            Active
          </button>

          <button
            onClick={() => setActiveTab("closed")}
            className={cn(
              "lg:px-6 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer",
              activeTab === "closed"
                ? "bg-neutral-900 text-white"
                : "text-neutral-400"
            )}
          >
            Closed
          </button>
        </div>
      </div>

      {loading && activeTab === "active" && <ActiveListSkeleton />}
      {loading && activeTab === "closed" && <ClosedListSkeleton />}
      {error && <div className="p-5 text-red-400">{error}</div>}

      {!loading && !error && activeTab === "active" && (
        <ActiveList
          items={data?.items ?? []}
          loadMore={loadMore}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
        />
      )}

      {!loading && !error && activeTab === "closed" && (
        <ClosedList
          items={data?.items ?? []}
          loadMore={loadMore}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
        />
      )}
    </div>
  );
};

export const ActiveList = ({
  items,
  loadMore,
  hasMore,
  isLoadingMore
}: {
  items: TradeHistoryItem[];
  loadMore?: () => Promise<void>;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMore || !hasMore || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMore, hasMore, isLoadingMore]);

  return (
    <div className="flex flex-col">
      <div className="px-5 flex mb-2">
        <span className="flex-3 text-xs tracking-widest font-semibold text-neutral-500">
          MARKET
        </span>
        <span className="text-xs tracking-widest font-semibold text-neutral-500 uppercase">
          Est. Payout
        </span>
      </div>

      {items.length === 0 && (
        <div className="p-5">
          <span className="text-sm">No positions to display</span>
        </div>
      )}

      {items.map((data, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={index}
            className={`flex items-center p-4
    ${isEven ? "bg-[#1F1F1F]" : "bg-[#232323]"}`}
          >
            {/* Left content */}
            <div className="flex gap-4 items-center min-w-0 flex-3">
              <img
                src={data.image}
                alt={data.question}
                className="w-12 aspect-square rounded-md object-cover"
              />

              <div className="flex flex-col gap-1 min-w-0">
                <Link href={`/market/${data.marketId}}`}>
                  <p className="text-white font-semibold line-clamp-1 text-[11px] md:text-base">
                    {data.question}
                  </p>
                </Link>

                <div className="flex gap-2 items-center">
                  <Button
                    variant={data.outcome === "YES" ? "yesBtn" : "noBtn"}
                    className="px-3 text-[10px] h-5 rounded-sm pointer-events-none"
                  >
                    {data.outcome}
                  </Button>

                  <span className="text-[11px] text-neutral-400">
                    {data.invested} shares
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Potential Payout */}
            <div className="flex-1 flex flex-col items-end shrink-0 md:pr-4 pr-1">
              <span
                className={`text-xs md:text-sm font-semibold ${data.pnl >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
              >
                {data.pnl >= 0 ? "+" : ""}
                {data.pnl.toFixed(2)}
              </span>
            </div>
          </div>
        );
      })}

      {hasMore && (
        <div ref={observerTarget} className="flex justify-center py-4">
          {isLoadingMore && (
            <span className="text-sm text-neutral-400">Loading more...</span>
          )}
        </div>
      )}
    </div>
  );
};

export const ClosedList = ({
  items,
  loadMore,
  hasMore,
  isLoadingMore
}: {
  items: TradeHistoryItem[];
  loadMore?: () => Promise<void>;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMore || !hasMore || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMore, hasMore, isLoadingMore]);

  return (
    <div className="flex flex-col">
      <div className="px-5 flex mb-2">
        <span className="flex-3 text-xs tracking-widest font-semibold text-neutral-500">
          MARKET
        </span>
        <span className="hidden md:block flex-1 text-xs tracking-widest font-semibold text-neutral-500">
          RESULT
        </span>
        <span className="hidden md:block flex-1 text-xs tracking-widest font-semibold text-neutral-500 text-right">
          PROFIT / LOSS
        </span>
      </div>

      {items.length === 0 && (
        <div className="p-5">
          <span className="text-sm">No positions to display</span>
        </div>
      )}

      {items.map((data, index) => {
        const isEven = index % 2 === 0;
        const pnl = Number(data.pnl) || 0;

        return (
          <div
            key={index}
            className={`flex items-center py-4 px-4
              ${isEven ? "bg-[#1F1F1F]" : "bg-[#232323]"}`}
          >
            <div className="flex-3 flex gap-4 items-center">
              {/* <img
                src={data.image}
                alt={data.question}
                className="w-12 aspect-square rounded-md object-cover"
              /> */}

              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex flex-col gap-1 min-w-0">
                  <Link href={`/market/${data.marketId}`}>
                    <p className="text-white font-semibold line-clamp-1 text-[11px] md:text-base">
                      {data.question}
                    </p>
                  </Link>
                  <div className="flex gap-2 items-center">
                    <Button
                      variant={data.outcome === "YES" ? "yesBtn" : "noBtn"}
                      className="px-3 text-[10px] h-5 rounded-sm pointer-events-none"
                    >
                      {data.outcome}
                    </Button>
                    <span className="text-[11px] text-neutral-400">
                      {data.invested} shares
                    </span>
                    <span
                      className={`flex md:hidden text-[11px] font-semibold items-center gap-1 ${pnl > 0
                        ? "text-emerald-500"
                        : pnl < 0
                          ? "text-red-400"
                          : "text-neutral-400"
                        }`}
                    >
                      <HugeiconsIcon
                        icon={
                          pnl > 0 ? CheckmarkCircle02Icon : CancelCircleIcon
                        }
                        size={12}
                      />
                      {pnl > 0 ? "WON" : pnl < 0 ? "LOSS" : "BREAK EVEN"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 hidden md:block pl-8">
              <span
                className={`text-xs font-semibold flex items-center gap-1 ${pnl > 0
                  ? "text-emerald-500"
                  : pnl < 0
                    ? "text-red-400"
                    : "text-neutral-400"
                  }`}
              >
                <HugeiconsIcon
                  icon={pnl > 0 ? CheckmarkCircle02Icon : CancelCircleIcon}
                  size={14}
                />
                {pnl > 0 ? "WON" : pnl < 0 ? "LOSS" : "BREAK EVEN"}
              </span>
            </div>

            <div className="flex-1 hidden md:block text-right pr-5">
              <span
                className={`text-sm font-semibold ${pnl > 0
                  ? "text-emerald-500"
                  : pnl < 0
                    ? "text-red-400"
                    : "text-neutral-400"
                  }`}
              >
                {/* {pnl > 0 ? "+" : ""}${pnl.toFixed(2)} */}
                {pnl > 0 ? "+" : ""}${pnl.toFixed(2)}
              </span>
            </div>
          </div>
        );
      })}

      {hasMore && (
        <div ref={observerTarget} className="flex justify-center py-4">
          {isLoadingMore && (
            <span className="text-sm text-neutral-400">Loading more...</span>
          )}
        </div>
      )}
    </div>
  );
};
