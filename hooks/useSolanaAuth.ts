"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";

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
        setIsLoggedIn(true);
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
