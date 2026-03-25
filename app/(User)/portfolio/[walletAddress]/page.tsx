import { PortfolioView } from "@/components/Portfolio/View/portfolio-view";
import { redirect } from "next/navigation";

import React from "react";

interface Props {
  params: Promise<{ walletAddress: string }>;
}

const isValidWalletAddress = (address: string) =>
  /^0x[a-fA-F0-9]{40}$/.test(address);

async function Page({ params }: Props) {
  const walletAddress = await (await params).walletAddress;

  if (!isValidWalletAddress(walletAddress)) {
    redirect("/");
  }

  return (
    <div>
      <PortfolioView walletAddress={walletAddress} />
    </div>
  );
}

export default Page;
