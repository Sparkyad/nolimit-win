"use client";
import { useEffect, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAdminStore } from "@/store/useAdminStore";
import { setAuthToken, clearAuthToken, getAuthToken } from "@/lib/authToken";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

/**
 * AuthProvider: Automatically authenticates with the backend when a Solana wallet connects.
 * Stores the JWT in localStorage for use as Bearer token in cross-origin API requests.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { publicKey, signMessage, connected, disconnect } = useWallet();
  const checkAdmin = useAdminStore((state) => state.checkAdmin);
  const loginAttempted = useRef(false);

  useEffect(() => {
    if (!connected || !publicKey || !signMessage) {
      // Wallet disconnected - clear token
      if (!connected) {
        clearAuthToken();
        loginAttempted.current = false;
      }
      return;
    }

    // Check if we already have a valid token
    const existingToken = getAuthToken();
    if (existingToken) {
      // Token exists, just check admin role
      checkAdmin();
      return;
    }

    // Prevent duplicate login attempts
    if (loginAttempted.current) return;
    loginAttempted.current = true;

    // Auto-login with the backend
    (async () => {
      try {
        console.log("[AuthProvider] Starting auto-login for:", publicKey.toBase58());

        // Step 1: Get Solana login payload (nonce) from backend
        const payloadRes = await fetch(
          `${API_BASE_URL}/api/auth/solana-payload?address=${publicKey.toBase58()}`
        );
        if (!payloadRes.ok) {
          console.error("[AuthProvider] Failed to get login payload:", payloadRes.status);
          return;
        }
        const payload = await payloadRes.json();

        // Step 2: Build the human-readable sign message
        const messageText = [
          `${payload.domain} wants you to sign in with your Solana account:`,
          payload.address,
          "",
          payload.statement,
          "",
          `Nonce: ${payload.nonce}`,
          `Issued At: ${payload.issued_at}`,
          `Expiration Time: ${payload.expiration_time}`,
        ].join("\n");

        // Step 3: Sign the message with Solana wallet
        const messageBytes = new TextEncoder().encode(messageText);
        const signatureBytes = await signMessage(messageBytes);

        // Step 4: Send to backend for verification
        const signatureBase64 = Buffer.from(signatureBytes).toString("base64");
        const loginRes = await fetch(`${API_BASE_URL}/api/auth/solana-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            payload,
            signature: signatureBase64,
          }),
        });

        if (loginRes.ok) {
          const loginData = await loginRes.json();
          if (loginData.token) {
            // Step 5: Store JWT in localStorage for Bearer token auth
            setAuthToken(loginData.token);
            console.log("[AuthProvider] Login successful, token stored");

            // Check admin role now that we're authenticated
            checkAdmin();
          }
        } else {
          const err = await loginRes.json().catch(() => ({}));
          console.error("[AuthProvider] Login failed:", err);
          loginAttempted.current = false; // Allow retry
        }
      } catch (error: any) {
        console.error("[AuthProvider] Auto-login error:", error?.message || error);
        loginAttempted.current = false; // Allow retry
      }
    })();
  }, [connected, publicKey, signMessage, checkAdmin]);

  return <>{children}</>;
}
