"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import {
  showBigSuccessToast,
  showErrorToast,
  showSuccessToast,
} from "@/components/CreateMarket/CreateMarketForm/components/form-toasts";
import { placeTrade } from "@/lib/solanaTrade";
import { PLATFORM_TREASURY } from "@/lib/solanaClient";

export const TradeBtn = ({
  onChainMarketId,
  outcome,
  amount,
  creatorAddress,
}: {
  onChainMarketId?: number;
  outcome?: number;
  amount: number;
  creatorAddress?: string;
}) => {
  const { publicKey, signTransaction, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [pending, setPending] = useState(false);

  const handleTrade = async () => {
    if (!publicKey || !signTransaction || !connected) {
      showErrorToast("Please connect your wallet to place a trade");
      setVisible(true);
      return;
    }
    if (onChainMarketId === undefined || outcome === undefined) {
      showErrorToast("No market ID or outcome selected for trade");
      return;
    }

    setPending(true);
    try {
      const isYes = outcome === 1;
      const amountMicroUsdc = BigInt(Math.round(amount * 1_000_000));
      await placeTrade(
        publicKey,
        signTransaction,
        onChainMarketId,
        isYes,
        amountMicroUsdc,
        creatorAddress || PLATFORM_TREASURY.toBase58()
      );
      showBigSuccessToast("Transaction confirmed!");
    } catch (err) {
      showErrorToast("Transaction failed: " + (err as Error).message);
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      className="bg-linear-to-t from-[#281c06] to-[#f0c15d]   cursor-pointer rounded-md w-full py-3 font-bold text-2xl"
      onClick={handleTrade}
      disabled={pending}
    >
      <span className="bg-linear-to-t from-[#fff3c4] to-[#ffd27d]  text-transparent bg-clip-text">
        {pending ? "Placing Trade..." : "Trade"}
      </span>
      {/* {pending && (
        <span
          className={`ml-2 inline-block w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin`}
        ></span>
      )} */}
    </button>
  );
};
