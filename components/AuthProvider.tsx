"use client";
import { useEffect, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAdminStore } from "@/store/useAdminStore";
import { setAuthToken, clearAuthToken, getAuthToken } from "@/lib/authToken";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

/**
 * AuthProvider: Attempts auto-authentication when a Solana wallet connects.
 * If auto-login fails (e.g., user doesn't approve signature), the submit button
 * will trigger login on-demand instead.
 * 
 * Stores the JWT in localStorage for use as Bearer token in cross-origin API requests.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { publicKey, signMessage, connected } = useWallet();
  const checkAdmin = useAdminStore((state) => state.checkAdmin);
  const loginAttempted = useRef(false);

  useEffect(() => {
    if (!connected || !publicKey) {
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

    // If signMessage isn't available yet, skip auto-login
    // The submit button will handle login on-demand
    if (!signMessage) return;

    // Prevent duplicate login attempts
    if (loginAttempted.current) return;
    loginAttempted.current = true;

    // Auto-login with the backend (best-effort, non-blocking)
    (async () => {
      try {
        console.log("[AuthProvider] Starting auto-login for:", publicKey.toBase58());

        // Step 1: Get Solana login payload (nonce) from backend
        const payloadRes = await fetch(
          `${API_BASE_URL}/api/auth/solana-payload?address=${publicKey.toBase58()}`
        );
        if (!payloadRes.ok) {
          console.warn("[AuthProvider] Backend not available for auto-login, will login on-demand");
          loginAttempted.current = false;
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
            // Store JWT in localStorage for Bearer token auth
            setAuthToken(loginData.token);
            console.log("[AuthProvider] Auto-login successful, token stored");

            // Check admin role now that we're authenticated
            checkAdmin();
          }
        } else {
          console.warn("[AuthProvider] Auto-login failed, will login on-demand");
          loginAttempted.current = false;
        }
      } catch (error: any) {
        // Don't show errors for auto-login failures - the submit button will handle it
        console.warn("[AuthProvider] Auto-login skipped:", error?.message || error);
        loginAttempted.current = false;
      }
    })();
  }, [connected, publicKey, signMessage, checkAdmin]);

  return <>{children}</>;
}
