"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export function useSolanaAuth() {
  const { publicKey, signMessage, connected, disconnect } = useWallet();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check login status by verifying the cookie exists on the frontend domain
  // We check both the backend (for API auth) and the frontend cookie (for SSR page access)
  const checkLoginStatus = useCallback(async () => {
    try {
      // Check if the frontend cookie is set (same-origin, always works)
      const frontendCheck = await fetch("/api/auth/check-cookie");
      if (frontendCheck.ok) {
        const data = await frontendCheck.json();
        if (data.authenticated) {
          setIsLoggedIn(true);
          setLoading(false);
          return;
        }
      }

      // Fallback: check backend directly
      const res = await fetch(`${API_BASE_URL}/api/auth/isLoggedIn`, {
        credentials: "include",
      });
      setIsLoggedIn(res.status === 200);
    } catch {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus, connected]);

  const doLogin = useCallback(async () => {
    if (!publicKey || !signMessage) return;

    try {
      // Step 1: Get Solana login payload (nonce) from backend
      const payloadRes = await fetch(
        `${API_BASE_URL}/api/auth/solana-payload?address=${publicKey.toBase58()}`,
        { credentials: "include" }
      );
      if (!payloadRes.ok) {
        throw new Error("Failed to get login payload");
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

      // Step 4: Send to backend for verification (base64 encoded signature)
      const signatureBase64 = Buffer.from(signatureBytes).toString("base64");

      const loginRes = await fetch(`${API_BASE_URL}/api/auth/solana-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payload,
          signature: signatureBase64,
        }),
        credentials: "include",
      });

      if (loginRes.ok) {
        const loginData = await loginRes.json();

        // Step 5: Set the cookie on the frontend domain via our API route
        // This is critical because the backend (onrender.com) cannot set cookies
        // for the frontend domain (nolimit.win / vercel.app)
        if (loginData.token) {
          const cookieRes = await fetch("/api/auth/set-cookie", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: loginData.token }),
          });

          if (cookieRes.ok) {
            setIsLoggedIn(true);
          } else {
            console.error("Failed to set frontend cookie");
          }
        } else {
          // Fallback: backend didn't return token, but cookie might have been set cross-origin
          setIsLoggedIn(true);
        }
      } else {
        const err = await loginRes.json().catch(() => ({}));
        console.error("Login failed:", err);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }, [publicKey, signMessage]);

  const doLogout = useCallback(async () => {
    try {
      // Clear backend cookie
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      // Clear frontend cookie
      await fetch("/api/auth/set-cookie", {
        method: "DELETE",
      });

      setIsLoggedIn(false);
      disconnect();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [disconnect]);

  return {
    isLoggedIn,
    loading,
    doLogin,
    doLogout,
    checkLoginStatus,
    walletAddress: publicKey?.toBase58() || null,
  };
}
