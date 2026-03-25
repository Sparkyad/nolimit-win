"use client";
import { Separator } from "@/components/ui/separator";
import { EndDateList } from "@/components/CreateMarket/Dashboard/components/end-date-list";
import { LiveEndDateListData } from "@/components/CreateMarket/Dashboard/data/end-date-list";
import { PingIndicator } from "@/components/CreateMarket/ui/ping-indicator";
import { AdminPendingListData } from "../data/admin-pending-list-data";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export type UnresolvedMarket = {
  id: number;
  marketId: number;
  onChainMarketId: number;
  question: string;
  resolutionTime: string; // ISO string
  rules: string;
  status: "PENDING_RESOLUTION";
  text: string;
  totalVolume: string;
  yesVolume: string;
};

const PAGE_SIZE = 5;

export const AdminPendingStatCard = () => {
  const [markets, setMarkets] = useState<UnresolvedMarket[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUnresolvedMarkets() {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/unresolved-markets?page=${page}&limit=${PAGE_SIZE}`,
        { credentials: "include" }
      );

      if (!res.ok) {
        console.log("Failed to fetch unresolved markets");
        setLoading(false);
        return;
      }

      const data: { markets: UnresolvedMarket[]; totalCount: number } =
        await res.json();

      // console.log(data);

      setMarkets(data.markets);
      setTotalCount(data.totalCount);
      setLoading(false);
    }

    fetchUnresolvedMarkets();
  }, [page]);

  const totalPages = Math.floor(
    (totalCount === 0 ? 0 : totalCount - 1) / PAGE_SIZE
  );

  const mapStatusToUI = (
    status: UnresolvedMarket["status"]
  ): PendingMarketStatusType => {
    if (status === "PENDING_RESOLUTION") return "review";
    return "pending";
  };

  return (
    <div
      className="relative rounded-[20px] p-[1px] 
  bg-linear-to-br from-white/45 via-white/10 to-transparent flex-1"
    >
      <div
        className="relative rounded-[20px] p-[1px] 
  bg-linear-to-tl from-white/45 via-white/10 to-transparent flex-1"
      >
        <div className="rounded-[20px] bg-linear-to-t from-[#0E0E0E] to-neutral-900 flex flex-col">
          <div className="grid grid-cols-[2fr_1fr] items-center p-6">
            <span className="flex gap-3 items-center">
              <span className="text-sm md:text-xl bg-linear-to-t from-[#999999] to-[#FFFFFF] bg-clip-text text-transparent font-medium">
                Market
              </span>
              <PingIndicator color="red" />
            </span>

            <span className="text-neutral-500 text-sm text-right">Action</span>
          </div>
          <div>
            <Separator className="bg-linear-to-l from-neutral-800 to-neutral-700" />
          </div>
          <div className="p-6 flex flex-col gap-4 min-h-44">
            <div className="flex flex-col gap-4 min-h-44">
              {markets.map((market) => (
                <AdminPendingList
                  key={market.id}
                  title={market.question}
                  status={mapStatusToUI(market.status)}
                  onChainMarketId={market.onChainMarketId}
                  question={market.question}
                  rules={market.rules}
                  marketId={market.marketId}
                  onResolved={() => setPage((p) => p)}
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
      </div>
    </div>
  );
};

export type PendingMarketStatusType = "failed" | "pending" | "review";

interface EndDateListProps {
  title: string;
  status: PendingMarketStatusType;
  onChainMarketId: number;
  question: string;
  rules: string;
  marketId: number;
  onResolved?: () => void;
}

export const AdminPendingList = ({
  title,
  status,
  onChainMarketId,
  question,
  rules,
  marketId,
  onResolved,
}: EndDateListProps) => {
  return (
    <div className="grid grid-cols-[3fr_1fr] items-center gap-4">
      <div className="flex items-center gap-3">
        <p className="line-clamp-2 text-sm lg:text-lg font-medium">{title}</p>
      </div>

      <div className="flex justify-end">
        <ResolveDialog
          question={question}
          onChainMarketId={onChainMarketId}
          status={status}
          rules={rules}
          binaryMarketId={marketId}
        />
      </div>
    </div>
  );
};

type ResolveOutcome = "YES" | "NO" | "CANCEL";

interface ResolveDialogProps {
  binaryMarketId: number;
  onChainMarketId: number;
  status: string;
  question: string;
  rules: string;
  onResolved?: () => void; // optional callback for refetch / optimistic update
}

export const ResolveDialog = ({
  binaryMarketId,
  onChainMarketId,
  status,
  question,
  rules,
  onResolved,
}: ResolveDialogProps) => {
  const [showFullQuestion, setShowFullQuestion] = useState(false);
  const [showFullRules, setShowFullRules] = useState(false);
  const [outcome, setOutcome] = useState<ResolveOutcome | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResolve = async () => {
    if (!outcome || loading) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/resolve`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            binaryMarketId,
            outcome,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to resolve market");
      }

      onResolved?.();
    } catch (err) {
      console.error("Resolve failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="marketGradient">
          Resolve
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-linear-to-b from-neutral-900 to-neutral-950 border-none">
        <DialogTitle className="flex gap-3 items-center">
          Resolve Market <PingIndicator color="red" />
        </DialogTitle>

        <div className="text-sm text-neutral-400 flex gap-3">
          <span>Market ID: {onChainMarketId}</span>
          <span>Status: {status}</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm text-neutral-400">Question</span>
          <p
            className={`text-sm text-neutral-300 ${
              showFullQuestion ? "" : "line-clamp-1"
            }`}
          >
            {question}
          </p>
          {question.length > 60 && (
            <button
              onClick={() => setShowFullQuestion((v) => !v)}
              className="text-xs text-emerald-400 hover:underline self-start"
            >
              {showFullQuestion ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm text-neutral-400">Rules</span>
          <div
            className={`rounded-md bg-neutral-900/60 p-3 text-sm text-neutral-300 custom-scrollbar ${
              showFullRules ? "max-h-52 overflow-y-auto" : "line-clamp-2"
            }`}
          >
            {rules}
          </div>
          {rules.length > 70 && (
            <button
              onClick={() => setShowFullRules((v) => !v)}
              className="text-xs text-emerald-400 hover:underline self-start"
            >
              {showFullRules ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm text-neutral-400">
            Select Resolution Outcome
          </span>

          <div className="flex gap-3">
            <Button
              variant="newYesBtn"
              onClick={() => setOutcome("YES")}
              className={cn(
                outcome === "YES" ? "ring-1 ring-emerald-500" : "",
                "flex-1"
              )}
            >
              YES
            </Button>

            <Button
              variant="newNoBtn"
              onClick={() => setOutcome("NO")}
              className={cn(
                outcome === "NO" ? "ring-1 ring-emerald-400" : "",
                "flex-1"
              )}
            >
              NO
            </Button>

            <Button
              variant="noBtn"
              onClick={() => setOutcome("CANCEL")}
              className={cn(
                outcome === "CANCEL" ? "ring-1 ring-red-400" : "",
                "flex-1 cursor-pointer"
              )}
            >
              CANCEL
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <DialogClose asChild>
            <Button
              variant="ghost"
              disabled={loading}
              className="cursor-pointer"
            >
              Cancel
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              variant="ghost"
              disabled={!outcome || loading}
              onClick={handleResolve}
              className="cursor-pointer"
            >
              {loading ? "Resolving..." : "Confirm Resolution"}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// const ReasonBadge = ({
//   status,
// }: {
//   status: "failed" | "pending" | "review";
// }) => {
//   const styles = {
//     failed: "bg-red-500/15 text-red-400",
//     pending: "bg-yellow-500/15 text-yellow-400",
//     review: "bg-blue-500/15 text-blue-400",
//   };

//   return (
//     <span
//       className={`rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
//     >
//       {status === "review"
//         ? "Needs Review"
//         : status.charAt(0).toUpperCase() + status.slice(1)}
//     </span>
//   );
// };
