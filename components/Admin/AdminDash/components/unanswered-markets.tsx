"use client";

import { PingIndicator } from "@/components/CreateMarket/ui/ping-indicator";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Market {
  id: string;
  question: string;
  umaTxHash: string;
}

interface UnansweredMarketsResponse {
  markets: Market[];
  totalCount: number;
}

export const UnansweredMarkets = () => {
  const limit = 5;

  const [markets, setMarkets] = useState<Market[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const totalPages = Math.floor((totalCount === 0 ? 0 : totalCount - 1) / limit);

  useEffect(() => {
    const fetchUnansweredMarkets = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/unanswered-markets?limit=${limit}&page=${page}`,
          { credentials: "include" }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch unanswered markets");
        }

        const data: UnansweredMarketsResponse = await response.json();
        setTotalCount(data.totalCount);
        setMarkets(data.markets);
      } catch (error) {
        console.error("Error fetching unanswered markets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnansweredMarkets();
  }, [page]);

  return (
    <div className="relative rounded-[20px] p-[1px] bg-linear-to-br from-white/45 via-white/10 to-transparent flex-1">
      <div className="relative rounded-[20px] p-[1px] bg-linear-to-tl from-white/45 via-white/10 to-transparent flex-1">
        <div className="rounded-[20px] bg-linear-to-t from-[#0E0E0E] to-neutral-900 flex flex-col">
          <div className="grid grid-cols-[2fr_1fr] items-center p-6">
            <span className="flex gap-3 items-center">
              <span className="text-sm md:text-xl bg-linear-to-t from-[#999999] to-[#FFFFFF] bg-clip-text text-transparent font-medium">
                Market
              </span>
              <PingIndicator color="orange" />
            </span>

            <div className="flex items-center text-center justify-end gap-2">
              <span className="text-sm  bg-linear-to-t from-[#999999] to-[#FFFFFF] bg-clip-text text-transparent font-medium">
                UMA Resolution
              </span>
            </div>
          </div>
          <div>
            <Separator className="bg-linear-to-l from-neutral-800 to-neutral-700" />
          </div>
          <div className="p-6 flex flex-col gap-4 min-h-44">
            {loading ? (
              <div className="flex items-center justify-center min-h-44">
                <p className="text-neutral-500">Loading...</p>
              </div>
            ) : markets.length === 0 ? (
              <div className="flex items-center justify-center min-h-44">
                <p className="text-neutral-500">No unanswered markets found</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {markets.map((market) => (
                  <UnansweredMarketsList
                    key={market.id}
                    question={market.question}
                    umaTxHash={market.umaTxHash}
                  />
                ))}
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
                    Page {page} of {totalPages || 0}
                  </span>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="cursor-pointer"
                    disabled={page >= totalPages || loading}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface UnansweredMarketsProps {
  question: string;
  umaTxHash: string;
}

const UnansweredMarketsList = ({
  question,
  umaTxHash,
}: UnansweredMarketsProps) => {
  return (
    <div className="grid grid-cols-[3fr_1fr] items-center gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <p className="line-clamp-2 text-sm lg:text-lg font-medium">
          {question}
        </p>
      </div>
      <div className="flex justify-end">
        <Button asChild variant="newYesBtn">
          <Link
            href={`${process.env.NEXT_PUBLIC_UMA_ORACLE_URL?.replace(/^"|"$/g, '')}/propose?transactionHash=${umaTxHash}`}
            target="_blank"
          >
            Resolve
          </Link>
        </Button>
      </div>
    </div>
  );
};
