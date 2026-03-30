"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * AuthGuard: Client-side auth guard for protected pages.
 * Redirects to homepage if wallet is not connected.
 * Shows wallet modal to prompt connection.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { connected, connecting } = useWallet();
  const { setVisible } = useWalletModal();
  const router = useRouter();

  useEffect(() => {
    // Wait for wallet adapter to finish initializing
    if (connecting) return;

    if (!connected) {
      // Show wallet modal and redirect to home
      setVisible(true);
      router.push("/");
    }
  }, [connected, connecting, setVisible, router]);

  // Show nothing while checking or if not connected
  if (!connected) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white">
        <div className="text-center">
          <p className="text-lg mb-2">Connecting wallet...</p>
          <p className="text-sm text-neutral-400">Please connect your Solana wallet to continue.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
