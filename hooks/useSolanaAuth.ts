"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import bs58 from "bs58";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export function useSolanaAuth() {
  const { publicKey, signMessage, connected, disconnect } = useWallet();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkLoginStatus = useCallback(async () => {
    try {
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
      // Get login payload from backend
      const payloadRes = await fetch(
        `${API_BASE_URL}/api/auth/generate-login-payload?address=${publicKey.toBase58()}`
      );
      const payload = await payloadRes.json();

      // Sign the message
      const message = new TextEncoder().encode(
        payload.message || JSON.stringify(payload)
      );
      const signature = await signMessage(message);

      // Send signed payload to backend
      const loginRes = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payload,
          signature: {
            signature: bs58.encode(signature),
            type: "solana",
          },
        }),
        credentials: "include",
      });

      if (loginRes.ok) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }, [publicKey, signMessage]);

  const doLogout = useCallback(async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
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
