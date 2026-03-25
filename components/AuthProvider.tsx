"use client";
import { useEffect, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSolanaAuth } from "@/hooks/useSolanaAuth";
import { useAdminStore } from "@/store/useAdminStore";

/**
 * AuthProvider: Automatically authenticates with the backend when a Solana wallet connects.
 * This sets the `auth_token` cookie required by protected routes (profile, dashboard, create-market, admin).
 * After successful login, it re-checks admin role so admin UI elements appear.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { connected } = useWallet();
  const { isLoggedIn, loading, doLogin } = useSolanaAuth();
  const checkAdmin = useAdminStore((state) => state.checkAdmin);
  const hasAttemptedLogin = useRef(false);

  useEffect(() => {
    // When wallet is connected but not logged in to backend, trigger login
    if (connected && !isLoggedIn && !loading && !hasAttemptedLogin.current) {
      hasAttemptedLogin.current = true;
      doLogin()
        .then(() => {
          // After successful login, re-check admin role
          checkAdmin();
        })
        .finally(() => {
          // Reset flag after attempt so user can retry if needed
          setTimeout(() => {
            hasAttemptedLogin.current = false;
          }, 2000);
        });
    }

    // Reset when wallet disconnects
    if (!connected) {
      hasAttemptedLogin.current = false;
    }
  }, [connected, isLoggedIn, loading, doLogin, checkAdmin]);

  return <>{children}</>;
}
