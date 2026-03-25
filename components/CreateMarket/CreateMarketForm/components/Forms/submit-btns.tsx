"use client";

import { MarketFormData } from "../../View/create-market-view";
import { Button } from "@/components/ui/button";
import { showErrorToast, showSuccessToast } from "../form-toasts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { slugifyFilename } from "@/utils/slugify-filename";
import { getUsdcBalance } from "@/lib/solanaTrade";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
// thirdweb removed - using Solana
import { useAdminStore } from "@/store/useAdminStore";

const uploadToCloudflare = async (file: File) => {
  const safeFilename = slugifyFilename(file.name);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL
    }/api/markets/upload-url?filename=${encodeURIComponent(
      safeFilename
    )}&contentType=${encodeURIComponent(file.type)}`,
    { credentials: "include" }
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
  const { publicKey: walletPublicKey, signTransaction, connected } = useWallet();
  const router = useRouter();

  const isAdminOrMod = useAdminStore((state) => state.role === "admin" || state.role === "moderator");

  const [inProgress, setInProgress] = useState(false);

  const handleSubmit = async () => {
    if (!walletPublicKey || !connected) return;
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
      setInProgress(true)
      if (!isAdminOrMod && walletPublicKey) {
        const marketCreationFee = BigInt(10_000_000); // $10 USDC in 6 decimals
        const usdcBalance = await getUsdcBalance(walletPublicKey.toBase58());
        if (usdcBalance < marketCreationFee) {
          showErrorToast("You need at least $10 USDC to create a market.");
          setInProgress(false);
          return;
        }
      }

      let imageUrl = data.imageUrl;
      let videoUrl = data.videoUrl;

      if (data.imageFile) {
        imageUrl = await uploadToCloudflare(data.imageFile);
      }

      if (data.videoFile) {
        videoUrl = await uploadToCloudflare(data.videoFile);
      }
      const url = editId
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/markets`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/markets`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
        throw new Error("Market submission failed");
      }

      showSuccessToast(
        editId
          ? "Market resubmitted successfully! Our team will review it shortly. This may take up to 1 hour."
          : "Market submitted successfully! It’s now under review and may take up to 1 hour to appear live."
      );

      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting market:", error);
      showErrorToast(
        "There was an error submitting the market. Please try again."
      );
    }
    finally {
      setInProgress(false);
    }
  };

  return (
    <div className="max-w-96 flex justify-end items-center">
      <Button
        onClick={handleSubmit}
        variant="marketGradient"
        className="cursor-pointer"
        disabled={inProgress}
      >
        {editId ? "Resubmit Market" : "Submit Market"}
        {inProgress && <span className="animate-pulse">⏳</span>}
      </Button>
    </div>
  );
};
