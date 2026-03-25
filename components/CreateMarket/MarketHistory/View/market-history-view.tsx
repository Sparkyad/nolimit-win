import { SidebarTrigger } from "@/components/ui/sidebar";
import { CreateMarketPageFrame } from "../../ui/create-market-page-frame";
import { Button } from "@/components/ui/button";
import { activePositionsData } from "@/components/Portfolio/data/active-position-data";
import { marketHistoryData } from "../data/history-data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const MarketHistoryView = () => {
  return (
    <CreateMarketPageFrame>
      <div className="p-5 flex flex-col gap-20">
        <MarketHistoryHeader />
      </div>
      <div>
        <MarketHistoryTable />
      </div>
    </CreateMarketPageFrame>
  );
};

export const MarketHistoryHeader = () => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-lg md:text-2xl bg-linear-to-b from-[#676767] to-[#dddddd] font-bold bg-clip-text text-transparent">
        Market History
      </span>

      <SidebarTrigger />
    </div>
  );
};

export const MarketHistoryTable = () => {
  return (
    <div className="w-full mb-5">
      <ScrollArea className="w-full rounded-md">
        {/* 
          Mobile/Tablet: fixed-width columns (scroll)
          Desktop: fluid columns (no scroll)
        */}
        <div className="flex flex-col gap-2 min-w-[900px] md:min-w-full">
          {/* Header */}
          <div className="px-5 flex items-center text-sm tracking-widest font-semibold text-neutral-500 h-12">
            <div className="w-[360px] lg:flex-[2] text-left">MARKET</div>
            <div className="w-[100px] lg:flex-1 text-center">OUTCOME</div>
            <div className="w-[140px] lg:flex-1 text-center">STATUS</div>
            <div className="w-[180px] lg:flex-[1.5] text-center">FEEDBACK</div>
            <div className="w-[100px] lg:flex-1 text-center">LIQUIDITY</div>
            <div className="w-[160px] lg:flex-1 text-right">DATE</div>
          </div>

          {/* Rows */}
          <div>
            {marketHistoryData.map((data, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex items-center px-5 py-4 text-sm min-h-[72px]
                    ${isEven ? "bg-[#1F1F1F]" : "bg-[#232323]"}
                  `}
                >
                  {/* MARKET */}
                  <div className="w-[360px] lg:flex-[2] flex gap-4 items-center min-w-0">
                    <img
                      src={data.image}
                      alt={`${data.id}-${index}`}
                      className="w-12 aspect-square rounded-md object-cover shrink-0"
                    />

                    <div className="flex flex-col gap-1 min-w-0">
                      <p className="text-white font-semibold line-clamp-2 text-xs md:text-sm">
                        {data.question}
                      </p>

                      <div className="flex gap-2 items-center">
                        <Button
                          variant={data.answer === "yes" ? "yesBtn" : "noBtn"}
                          className="px-2 text-xs h-5 rounded-sm pointer-events-none"
                        >
                          {data.answer === "yes" ? "Yes" : "No"}
                        </Button>
                        <span className="text-xs text-neutral-400">
                          {data.shares}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* OUTCOME */}
                  <div className="w-[100px] lg:flex-1 flex items-center justify-center text-neutral-300">
                    {data.outcome ?? "—"}
                  </div>

                  {/* STATUS */}
                  <div
                    className={`w-[140px] lg:flex-1 flex items-center justify-center font-medium
                      ${data.status === "Live Market" && "text-green-400"}
                      ${data.status === "Under Review" && "text-blue-400"}
                      ${data.status === "Rejected" && "text-red-400"}
                      ${data.status === "Settled" && "text-neutral-300"}
                    `}
                  >
                    {data.status}
                  </div>

                  {/* FEEDBACK */}
                  <div className="w-[180px] lg:flex-[1.5] flex items-center justify-center text-neutral-400">
                    {data.feedback}
                  </div>

                  {/* LIQUIDITY */}
                  <div
                    className={`w-[100px] lg:flex-1 flex items-center justify-center font-medium
                      ${data.liquidity === "Good" && "text-green-400"}
                      ${data.liquidity === "Risk" && "text-red-400"}
                    `}
                  >
                    {data.liquidity ?? "—"}
                  </div>

                  {/* DATE */}
                  <div className="w-[160px] lg:flex-1 flex items-center justify-end text-neutral-400 text-xs">
                    {data.date}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Horizontal scrollbar (shows only when needed) */}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
