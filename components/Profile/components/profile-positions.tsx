"use client"
import { useTradeHistory } from "@/hooks/useTradeHistory";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { ActiveListSkeleton } from "./ActiveListSkeleton";
import { ClosedListSkeleton } from "./ClosedListSkeleton";
import { ActiveList, ClosedList } from "@/components/Portfolio/components/position-list";

export const ProfilePositions = () => {
  const { publicKey } = useWallet();
  const wallet = publicKey?.toBase58() ?? "";

  const [activeTab, setActiveTab] = useState<"active" | "closed">("active");

  // Separate hook instances for caching both datasets
  const activeData = useTradeHistory({
    wallet,
    openMarkets: true,
  });

  const closedData = useTradeHistory({
    wallet,
    openMarkets: false,
  });

  // Select current tab's data
  const currentData = activeTab === "active" ? activeData : closedData;
  const { data, loading, error, loadMore, hasMore, isLoadingMore } = currentData;

  return (
    <div className="flex flex-col lg:gap-16 gap-8 ">
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
