"use client";

import { PageFrame } from "@/components/page-frame";
import { PortfolioHeader } from "../components/portfolio-header";
import { UserPositions } from "../components/user-positions";
import { useTradeHistory } from "@/hooks/useTradeHistory";

interface Props {
  walletAddress: string;
}

export const PortfolioView = ({ walletAddress }: Props) => {
  // Fetch trade data once at top level
  const activeData = useTradeHistory({
    wallet: walletAddress,
    openMarkets: true,
  });

  const closedData = useTradeHistory({
    wallet: walletAddress,
    openMarkets: false,
  });

  return (
    <PageFrame>
      <div className="p-2 md:p-4 md:px-4 lg:py-10 mb-32 md:mb-0 max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 p-2 lg:p-5 bg-[#151515] rounded-lg">
          <PortfolioHeader
            walletAddress={walletAddress}
            activeData={activeData}
            closedData={closedData}
          />
          <UserPositions
            walletAddress={walletAddress}
            activeData={activeData}
            closedData={closedData}
          />
        </div>
      </div>
    </PageFrame>
  );
};
