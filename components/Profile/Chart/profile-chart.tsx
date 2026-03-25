"use client";

import NoLimitLoader from "@/components/Loader/nolimit-loader";
import {
  PortfolioDataPoint,
  PortfolioLineChart,
} from "@/components/Portfolio/chart/portfolio-chart";
import { useTradeHistory } from "@/hooks/useTradeHistory";
import { cn } from "@/lib/utils";
import { ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

interface Props {
  className?: string;
}

export const ProfileChart = ({ className }: Props) => {
  const { publicKey: walletPublicKey, signTransaction, connected } = useWallet();
  const closedData = useTradeHistory({
    wallet: walletPublicKey?.toBase58(),
    openMarkets: false,
  });

  //   console.log(closedData);
  const closedMarkets = closedData?.data?.items;

  const { chartData, pastMonthPnL } = useMemo(() => {
    if (!closedMarkets?.length) {
      return { chartData: [], pastMonthPnL: 0 };
    }

    const sortedTrades = [...closedMarkets].sort(
      (a, b) =>
        new Date(a.lastTradeDate).getTime() -
        new Date(b.lastTradeDate).getTime()
    );

    let runningPnL = 0;
    let monthPnL = 0;

    const now = Date.now();
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

    const data: PortfolioDataPoint[] = [];

    for (const trade of sortedTrades) {
      const pnl = Number(trade.pnl) || 0;
      runningPnL += pnl;

      const tradeTime = new Date(trade.lastTradeDate).getTime();
      if (now - tradeTime <= THIRTY_DAYS) {
        monthPnL += pnl;
      }

      data.push({
        date: new Date(trade.lastTradeDate).toISOString(),
        value: runningPnL,
      });
    }

    return {
      chartData: data,
      pastMonthPnL: monthPnL,
    };
  }, [closedMarkets]);

  if (closedData.loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <NoLimitLoader />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex-1 bg-[#1C1C1C] p-5 rounded-md flex flex-col md:gap-16 gap-10",
        className
      )}
    >
      <div className="flex flex-col gap-1.5 flex-1">
        <span className="text-lg flex gap-1 items-center text-neutral-300">
          <HugeiconsIcon
            icon={ArrowUp01Icon}
            className={pastMonthPnL >= 0 ? "text-emerald-500" : "text-red-400"}
            size={20}
          />
          Profit/Loss
        </span>

        <span
          className={`md:text-2xl font-bold ${
            pastMonthPnL >= 0 ? "text-emerald-500" : "text-red-400"
          }`}
        >
          {pastMonthPnL >= 0 ? "+" : "-"}$
          {Math.abs(pastMonthPnL).toLocaleString()}
        </span>

        <span className="text-sm font-light text-neutral-300">Past Month</span>
      </div>

      <div className="h-20">
        <PortfolioLineChart data={chartData} />
      </div>
    </div>
  );
};
