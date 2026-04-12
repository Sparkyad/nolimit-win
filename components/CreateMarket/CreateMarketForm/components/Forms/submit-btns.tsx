"use client";

import { MarketFormData } from "../../View/create-market-view";
import { Button } from "@/components/ui/button";
import { showErrorToast, showSuccessToast } from "../form-toasts";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { slugifyFilename } from "@/utils/slugify-filename";
import { getUsdcBalance, getUsdcBalanceDebug } from "@/lib/solanaTrade";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useAdminStore } from "@/store/useAdminStore";
import { authFetch, getAuthToken, setAuthToken } from "@/lib/authToken";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const uploadToCloudflare = async (file: File) => {
  const safeFilename = slugifyFilename(file.name);
  const res = await authFetch(
    `${API_BASE_URL}/api/markets/upload-url?filename=${encodeURIComponent(
      safeFilename
    )}&contentType=${encodeURIComponent(file.type)}`
  );

  if (!res.ok) throw new Error("Failed to get upload URL");

  const { putUrl, publicUrl } = await res.json();

  const uploadRes = await fetch(putUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadRes.ok) throw new Error("Upload failed");

  return publicUrl;
};

export const SubmitBtns = ({
  data,
  editId,
}: {
  data: MarketFormData;
  editId?: string | null;
}) => {
  const { publicKey: walletPublicKey, signMessage, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const router = useRouter();

  const isAdminOrMod = useAdminStore((state) => state.role === "admin" || state.role === "moderator");

  const [inProgress, setInProgress] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [showDebug, setShowDebug] = useState(false);

  // Auto-check balance when wallet connects
  useEffect(() => {
    if (walletPublicKey && connected) {
      getUsdcBalanceDebug(walletPublicKey.toBase58()).then(info => {
        setDebugInfo(info);
      });
    }
  }, [walletPublicKey, connected]);

  /**
   * Ensure we have a valid auth token. If not, trigger the Solana sign-in flow.
   * Returns the token string on success, or null on failure.
   */
  const ensureAuth = useCallback(async (): Promise<string | null> => {
    // Check if we already have a token
    const existing = getAuthToken();
    if (existing) return existing;

    if (!walletPublicKey || !signMessage) {
      showErrorToast("Please connect your wallet first.");
      return null;
    }

    try {
      setStatusMsg("Requesting sign-in from wallet...");

      // Step 1: Get nonce from backend
      const payloadRes = await fetch(
        `${API_BASE_URL}/api/auth/solana-payload?address=${walletPublicKey.toBase58()}`
      );
      if (!payloadRes.ok) {
        throw new Error("Failed to get login payload from server");
      }
      const payload = await payloadRes.json();

      // Step 2: Build sign message
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

      // Step 3: Prompt wallet signature
      setStatusMsg("Please approve the sign-in request in your wallet...");
      const messageBytes = new TextEncoder().encode(messageText);
      const signatureBytes = await signMessage(messageBytes);

      // Step 4: Send to backend for verification
      setStatusMsg("Verifying signature...");
      const signatureBase64 = Buffer.from(signatureBytes).toString("base64");
      const loginRes = await fetch(`${API_BASE_URL}/api/auth/solana-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload, signature: signatureBase64 }),
      });

      if (!loginRes.ok) {
        const err = await loginRes.json().catch(() => ({}));
        throw new Error(err.message || "Login verification failed");
      }

      const loginData = await loginRes.json();
      if (loginData.token) {
        setAuthToken(loginData.token);
        setStatusMsg("");
        return loginData.token;
      }

      throw new Error("No token received from server");
    } catch (error: any) {
      console.error("[ensureAuth] Error:", error);
      if (error?.message?.includes("User rejected")) {
        showErrorToast("Sign-in was rejected. Please approve the wallet signature to continue.");
      } else {
        showErrorToast(error?.message || "Authentication failed. Please try again.");
      }
      setStatusMsg("");
      return null;
    }
  }, [walletPublicKey, signMessage]);

  const handleSubmit = async () => {
    if (!connected || !walletPublicKey) {
      setVisible(true);
      return;
    }
    if (!data) return;

    if (!data.question.trim()) {
      showErrorToast("Please enter a question for the market.");
      return;
    }

    if (data.question.trim().length < 10) {
      showErrorToast("Question must be at least 10 characters.");
      return;
    }

    if (!data.rules.trim()) {
      showErrorToast("Please enter a description for the market.");
      return;
    }

    if (data.rules.trim().length < 20) {
      showErrorToast("Rules must be at least 20 characters.");
      return;
    }

    if (!data.category.trim()) {
      showErrorToast("Please select a category for the market.");
      return;
    }

    if (data.outcomes.length > 0) {
      if (data.outcomes.length < 2) {
        showErrorToast("Please provide at least two outcomes.");
        return;
      }

      if (data.outcomes.some((o) => o.trim() === "")) {
        showErrorToast("Please fill in all outcome fields.");
        return;
      }
    }

    if (!data.imageUrl.trim()) {
      showErrorToast("Please upload a thumbnail image for the market.");
      return;
    }

    if (!data.closeTime) {
      showErrorToast("Please select an end date for the market.");
      return;
    }

    if (data.interval) {
      if (data.interval < 1440) {
        const now = new Date();
        const maxCloseTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        if (data.closeTime > maxCloseTime) {
          showErrorToast("For intervals less than 1 day, the close time must be within 24 hours from now.");
          return;
        }
      }
    }

    try {
      setInProgress(true);

      // Ensure we have auth - this will trigger wallet sign-in if needed
      const token = await ensureAuth();
      if (!token) {
        setInProgress(false);
        return;
      }

      // Check USDC balance (skip for admins/mods)
      if (!isAdminOrMod && walletPublicKey) {
        setStatusMsg("Checking USDC balance...");
        const marketCreationFee = BigInt(10_000_000); // $10 USDC in 6 decimals
        const usdcBalance = await getUsdcBalance(walletPublicKey.toBase58());
        
        // Refresh debug info
        const freshDebug = await getUsdcBalanceDebug(walletPublicKey.toBase58());
        setDebugInfo(freshDebug);
        
        if (usdcBalance < marketCreationFee) {
          showErrorToast(`You need at least $10 USDC to create a market. Your balance: ${(Number(usdcBalance) / 1_000_000).toFixed(2)} USDC`);
          setInProgress(false);
          setStatusMsg("");
          return;
        }
      }

      setStatusMsg("Uploading assets...");
      let imageUrl = data.imageUrl;
      let videoUrl = data.videoUrl;

      if (data.imageFile) {
        imageUrl = await uploadToCloudflare(data.imageFile);
      }

      if (data.videoFile) {
        videoUrl = await uploadToCloudflare(data.videoFile);
      }

      setStatusMsg("Submitting market...");
      const url = `${API_BASE_URL}/api/markets`;

      const res = await authFetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...(editId ? { rejectedMarketId: editId } : {}),
          question: data.question,
          rules: data.rules,
          category: data.category,
          outcomes: JSON.stringify(data.outcomes),
          imageUrl,
          ...(videoUrl ? { videoUrl } : {}),
          closeTime: data.closeTime,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          ...(data.interval && data.outcomes.length < 2 ? { interval: data.interval } : {})
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        console.error("[Submit] API error:", res.status, errBody);
        throw new Error(errBody.error || "Market submission failed");
      }

      showSuccessToast(
        editId
          ? "Market resubmitted successfully! Our team will review it shortly. This may take up to 1 hour."
          : "Market submitted successfully! It's now under review and may take up to 1 hour to appear live."
      );

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error submitting market:", error);
      showErrorToast(
        error?.message || "There was an error submitting the market. Please try again."
      );
    }
    finally {
      setInProgress(false);
      setStatusMsg("");
    }
  };

  return (
    <div className="max-w-96 flex flex-col gap-2">
      {/* Debug Panel */}
      {connected && walletPublicKey && (
        <div className="text-xs">
          <button 
            onClick={() => setShowDebug(!showDebug)}
            className="text-emerald-400 underline cursor-pointer mb-1"
          >
            {showDebug ? "Hide" : "Show"} Wallet Debug Info
          </button>
          {showDebug && debugInfo && (
            <div className="bg-gray-900 border border-gray-700 rounded p-2 mb-2 font-mono text-[10px] break-all">
              <div><span className="text-gray-400">Wallet:</span> {debugInfo.wallet}</div>
              <div><span className="text-gray-400">USDC Mint:</span> {debugInfo.mint}</div>
              <div><span className="text-gray-400">ATA:</span> {debugInfo.ata}</div>
              <div><span className="text-gray-400">RPC:</span> {debugInfo.rpc}</div>
              <div><span className="text-gray-400">Balance (raw):</span> {debugInfo.balance}</div>
              <div><span className="text-gray-400">Balance (USDC):</span> {debugInfo.uiAmount ?? "null"}</div>
              <div><span className="text-gray-400">Admin/Mod:</span> {isAdminOrMod ? "YES" : "NO"}</div>
              <div><span className="text-gray-400">Auth Token:</span> {getAuthToken() ? "Present" : "MISSING"}</div>
              {debugInfo.error && (
                <div className="text-red-400"><span className="text-gray-400">Error:</span> {debugInfo.error}</div>
              )}
              <button 
                onClick={() => {
                  getUsdcBalanceDebug(walletPublicKey.toBase58()).then(info => {
                    setDebugInfo(info);
                  });
                }}
                className="text-emerald-400 underline cursor-pointer mt-1"
              >
                Refresh
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Status message */}
      {statusMsg && (
        <div className="text-xs text-yellow-400 animate-pulse">{statusMsg}</div>
      )}

      <div className="flex justify-end items-center">
        <Button
          onClick={handleSubmit}
          variant="marketGradient"
          className="cursor-pointer"
          disabled={inProgress}
        >
          {editId ? "Resubmit Market" : "Submit Market"}
          {inProgress && <span className="animate-pulse"> ⏳</span>}
        </Button>
      </div>
    </div>
  );
};
