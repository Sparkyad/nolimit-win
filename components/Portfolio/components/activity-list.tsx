"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { useTradeActivity } from "@/hooks/useTradeActivity";
import { timeAgo } from "@/lib/time";
import { ActivityListSkeleton } from "./ActivityListSkeleton";

export type MarketActivity = {
  id: number;
  image: string;
  question: string;
  answer: "yes" | "no";
  shares: string;
};

export type ActivityItem = {
  id: number;
  type: string;
  market: MarketActivity[];
  amount: string;
};

interface ActivityListProps {
  activityData: ReturnType<typeof useTradeActivity>;
}

export const ActivityList = ({ activityData }: ActivityListProps) => {
  const { data, loading, error, loadMore, hasMore, isLoadingMore } = activityData;
  const observerTarget = useRef<HTMLDivElement>(null);

  // Setup infinite scroll observer
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

  if (loading) {
    return <ActivityListSkeleton />;
  }

  if (error) {
    return <div className="p-4 text-red-400">{error}</div>;
  }

  const items = data?.items ?? [];

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="hidden md:grid grid-cols-[8fr_1fr]">
        <span className="text-sm tracking-wider text-neutral-400 font-bold">
          MARKET
        </span>
        <span className="text-sm tracking-wider text-neutral-400 font-bold text-right">
          AMOUNT
        </span>
      </div>
      {items.length === 0 && (
        <div className="p-2">
          <span className="text-sm">No activity to display</span>
        </div>
      )}
      {items.map((data, index) => {
        return (
          <div
            key={index}
            className="hidden md:grid grid-cols-[8fr_1fr] items-center"
          >
            <div key={index} className="flex gap-2">
              {/* <div>
                <img
                  src={data.image}
                  alt={`${data.amount}}-image`}
                  className="w-12 object-cover aspect-square rounded-md"
                />
              </div> */}
              <div className="flex gap-1 flex-col min-w-0">
                <p className="text-white font-semibold line-clamp-2 text-[11px] md:text-base">
                  {data.question}
                </p>
                <div className="flex gap-2 items-center">
                  <Button
                    variant={data.outcome === "YES" ? "yesBtn" : "noBtn"}
                    className="text-white px-3 text-[10px] h-5 rounded-sm w-fit pointer-events-none"
                  >
                    {data.outcome === "YES" && "Yes"}
                    {data.outcome === "NO" && "No"}
                  </Button>
                </div>
              </div>
            </div>
            <span className="text-right font-bold flex flex-col">
              ${data.amount}
              <span className="text-xs text-neutral-500 font-medium">
                {timeAgo(data.timestamp)}
              </span>
            </span>
          </div>
        );
      })}
      {items.map((data, index) => (
        <div
          key={`${index}-${data.amount}`}
          className="grid grid-cols-[4fr_1fr] md:hidden"
        >
          {/* LEFT */}
          <div className="flex gap-2 items-center">
            {/* <img
                src={data.image}
                alt=""
                className="w-12 h-12 rounded-md object-cover shrink-0"
              /> */}
            <div className="flex flex-col gap-2">
              <span className="text-xs leading-tight line-clamp-1">
                {data.question}
              </span>
              <span className="text-xs font-bold flex gap-2 items-center">
                Buy
                <Button
                  variant={data.outcome === "YES" ? "yesBtn" : "noBtn"}
                  className="text-white px-3 text-[10px] h-5 rounded-sm w-fit pointer-events-none"
                >
                  {data.outcome === "YES" && "Yes"}
                  {data.outcome === "NO" && "No"}
                </Button>
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-end">
            <span className="text-sm font-bold">${data.amount}</span>
          </div>
        </div>
      ))}

      {hasMore && (
        <div ref={observerTarget} className="flex justify-center py-4">
          {isLoadingMore && (
            <span className="text-sm text-neutral-400">Loading more activity...</span>
          )}
        </div>
      )}
    </div>
  );
};

// export const ActivityUser = ({ data }: ActivityUserProps) => {
//   const isYes = data.side === "Yes";

//   return (
//     <div className="flex justify-between items-center py-3">
//       <div className="flex gap-3 items-center">
//         <img
//           src={data.avatar}
//           alt={data.name}
//           className="rounded-full w-8 h-8 object-cover"
//         />

//         <p className="text-sm text-neutral-200 leading-snug">
//           <span className="font-semibold">{data.name}</span> {data.action}{" "}
//           <span className={isYes ? "text-emerald-500" : "text-red-400"}>
//             {data.amount} {data.side}
//           </span>{" "}
//           for {data.condition} at {data.price}{" "}
//           <span className="text-neutral-400">({data.usd})</span>
//         </p>
//       </div>

//       <span className="text-xs text-neutral-400 whitespace-nowrap">
//         {data.time}
//       </span>
//     </div>
//   );
// };
