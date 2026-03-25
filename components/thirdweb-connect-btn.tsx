"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useAdminStore } from "@/store/useAdminStore";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export const ThirdWebConnectBtn = () => {
  const { publicKey, disconnect, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const checkAdmin = useAdminStore((state) => state.checkAdmin);

  useEffect(() => {
    if (connected) {
      checkAdmin();
    }
  }, [connected, checkAdmin]);

  const handleClick = () => {
    if (connected) {
      disconnect();
    } else {
      setVisible(true);
    }
  };

  const truncatedAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : null;

  return (
    <div className="w-full px-2 pb-2">
      <button
        onClick={handleClick}
        className={cn(
          "w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer",
          connected
            ? "bg-[#1a1a1a] border border-emerald-500/30 text-emerald-400 hover:bg-[#222]"
            : "bg-gradient-to-t from-[#0A2F1F] to-[#14B87A] text-white hover:opacity-90"
        )}
      >
        {connected ? truncatedAddress : "Connect Wallet"}
      </button>
    </div>
  );
};
