"use client";
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAdminStore } from "@/store/useAdminStore";

/**
 * AuthProvider: Re-checks admin role when a Solana wallet connects.
 * Backend authentication (Solana sign-in) is triggered on-demand when
 * the user performs protected actions (creating markets, placing bets, etc.).
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { connected } = useWallet();
  const checkAdmin = useAdminStore((state) => state.checkAdmin);

  useEffect(() => {
    if (connected) {
      checkAdmin();
    }
  }, [connected, checkAdmin]);

  return <>{children}</>;
}
