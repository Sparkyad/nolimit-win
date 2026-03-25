"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { PositionsList } from "./position-list";
import { ActivityList } from "./activity-list";
import { useTradeHistory } from "@/hooks/useTradeHistory";
import { useTradeActivity } from "@/hooks/useTradeActivity";

interface Props {
  walletAddress: string;
  activeData: ReturnType<typeof useTradeHistory>;
  closedData: ReturnType<typeof useTradeHistory>;
}

export const UserPositions = ({ walletAddress, activeData, closedData }: Props) => {
  const [activeTab, setActiveTab] = useState<"positions" | "activity">(
    "positions"
  );

  // Fetch activity data once at parent level
  const activityData = useTradeActivity({ wallet: walletAddress });
  return (
    <div className="bg-[#1C1C1C] rounded-md">
      <div>
        <div>
          <div className="p-5">
            <div className="flex gap-6 text-[15px] font-semibold">
              <button
                onClick={() => setActiveTab("positions")}
                className={cn(
                  activeTab === "positions"
                    ? "text-white border-b-2"
                    : "text-neutral-600 border-b-2 border-[#1C1C1C]",
                  "cursor-pointer pb-2"
                )}
              >
                Positions
              </button>
              <button
                onClick={() => setActiveTab("activity")}
                className={cn(
                  activeTab === "activity"
                    ? "text-white border-b-2"
                    : "text-neutral-600 border-b-2 border-[#1C1C1C]",
                  "cursor-pointer pb-2"
                )}
              >
                Activity
              </button>
            </div>
            <Separator className="bg-neutral-800" />
          </div>
          <div>
            <div>{activeTab === "positions" && <PositionsList activeData={activeData} closedData={closedData} />}</div>
            <div>{activeTab === "activity" && <ActivityList activityData={activityData} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
