"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ActiveListSkeleton } from "./ActiveListSkeleton";
import { claimWinnings } from "@/lib/solanaTrade";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { showErrorToast, showSuccessToast } from "@/components/CreateMarket/CreateMarketForm/components/form-toasts";

const PAGE_SIZE = 5;

type RedeemablePosition = {
  image: string;
  invested: number;
  marketId: number;
  onChainMarketId: number;
  outcome: "YES" | "NO";
  pnl: number;
  question: string;
  status: "RESOLVED_NO" | "CANCELED" | "RESOLVED_YES";
};

type RedeemableResponse = {
  items: RedeemablePosition[];
  totalCount: number;
  nextCursor: number | null;
};

export const ProfileUnclaimedRewards = () => {
  const { publicKey: walletPublicKey, signTransaction, connected } = useWallet();

  const [isRedeeming, setIsRedeeming] = useState<Map<number, boolean>>(new Map());
  const [positions, setPositions] = useState<RedeemablePosition[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchRedeemMarkets = async (page: number) => {
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profiles/redeemable-positions?page=${page}&limit=${PAGE_SIZE}`,
      { credentials: "include" }
    );

    const data: RedeemableResponse = await res.json();
    // console.log("Redeem", data.items);
    setPositions(data.items);
    setTotalCount(data.totalCount);
    setLoading(false);
  };

  useEffect(() => {
    fetchRedeemMarkets(page);
  }, [page]);

  const totalPages = Math.floor((totalCount === 0 ? 0 : totalCount - 1) / PAGE_SIZE);

  async function redeemPosition(onChainMarketId: number) {
    if (!walletPublicKey || !signTransaction || !positions || isRedeeming.get(onChainMarketId)) { return; }

    const position = positions.find((p) => p.onChainMarketId === onChainMarketId);
    if (!position) { return; }

    try {
      setIsRedeeming((prev) => new Map(prev).set(onChainMarketId, true));
      await claimWinnings(walletPublicKey, signTransaction, onChainMarketId);
      setPositions((prev) => prev.filter((p) => p.onChainMarketId !== onChainMarketId));
      setTotalCount((prev) => prev - 1);
      setIsRedeeming((prev) => {
        const newMap = new Map(prev);
        newMap.delete(onChainMarketId);
        return newMap;
      });
      showSuccessToast("Redeemed successfully!");
    } catch (error) {
      console.error("Redeem failed", error);
      showErrorToast("Redeem failed. Please try again.");
      return;
    }
  }

  if (loading || !positions || positions.length === 0) { return }

  return (
    <div className="flex flex-col gap-2 lg:gap-4 mb-3">
      {/* Header */}
      <div className="px-5">
        <span className="text-xs tracking-widest font-semibold text-neutral-500">
          UNCLAIMED REWARDS
        </span>
      </div>

      {/* List */}
      <div>
        {positions.map((data, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={data.marketId}
              className={`flex items-center gap-3 py-3 px-4
                ${isEven ? "bg-[#1F1F1F]" : "bg-[#232323]"}`}
            >
              {/* Left */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <img
                  src={data.image}
                  alt={data.question}
                  className="w-9 md:w-12 aspect-square rounded-md object-cover shrink-0"
                />

                <div className="flex gap-2 flex-col min-w-10 md:min-w-20">
                  <Link
                    href={`/market/${data.marketId}`}
                    className="text-white font-semibold line-clamp-1 text-[11px] md:text-base"
                  >
                    {data.question}
                  </Link>

                  <div className="hidden md:flex gap-2 items-center">
                    <Button
                      variant={data.outcome === "YES" ? "yesBtn" : "noBtn"}
                      className="px-3 text-[10px] h-5 rounded-sm pointer-events-none"
                    >
                      {data.outcome === "YES" ? "Yes" : "No"}
                    </Button>

                    <span className="text-[11px] text-neutral-400">
                      {data.invested}
                    </span>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="flex-1 text-xs md:text-base font-bold text-emerald-500 text-center flex justify-end">
                ${Math.abs(data.invested + data.pnl).toFixed(2)}
              </div>

              {/* Action */}
              <div className="flex-1 text-center justify-end flex">
                <Button
                  variant="marketGradient"
                  className="text-xs cursor-pointer"
                  onClick={() => redeemPosition(data.onChainMarketId)}
                  disabled={isRedeeming.get(data.onChainMarketId)}
                >
                  Redeem
                  {isRedeeming.get(data.onChainMarketId) && (<span className={`ml-2 inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin`}></span>)}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-5 pt-2">
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
            Page {page + 1} of {totalPages + 1}
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
      )}
    </div>
  );
};
