"use client";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HugeiconsIcon } from "@hugeicons/react";
import { Share04Icon } from "@hugeicons/core-free-icons";

interface LiquidityListProps {
  marketId: number;
  question: string;
  image: string;
  liquidityThreshold: number; // 0–100
  totalVolume: number;
}

export const LiquidityList = ({
  image,
  question,
  liquidityThreshold,
  marketId,
  totalVolume,
}: LiquidityListProps) => {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    const link = `${window.location.origin}/market/${marketId}`;
    await navigator.clipboard.writeText(link);

    setCopied(true);
    setOpen(true);

    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 1500);
  };

  // console.log(liquidityThreshold);
  const progress =
    liquidityThreshold > 0
      ? Math.min((totalVolume / liquidityThreshold) * 100, 100)
      : 0;

  return (
    <div className="grid grid-cols-[3fr_1fr] md:grid-cols-[5fr_2fr] items-center gap-2">
      {/* COLUMN 1 — Market */}
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={image}
          alt={question}
          className="h-12 w-12 shrink-0 rounded-md object-cover"
        />
        <Link
          href={`/market/${marketId}`}
          className="line-clamp-2 text-sm lg:text-lg font-medium text-balance"
        >
          {question}
        </Link>
      </div>

      {/* COLUMN 2 — Liquidity */}
      <div
        className="
    flex items-center gap-3
    min-[1000px]:grid min-[1000px]:grid-cols-[1fr_auto_auto]
    min-[1000px]:gap-4
    
  "
      >
        {/* Progress */}
        <div className="flex-1 min-[1000px]:flex-none min-[1000px]:w-full">
          <Progress className="h-2" value={progress} />
        </div>

        {/* Percentage */}
        <span
          className="
      hidden min-[1000px]:flex
      items-center justify-center
      rounded-full px-3 py-1
      text-xs font-semibold
      bg-linear-to-b from-neutral-800 to-neutral-700
      text-neutral-400
      w-32
      tabular-nums
    "
        >
          {totalVolume.toLocaleString()} / {liquidityThreshold.toLocaleString()}
        </span>

        {/* Share */}
        <TooltipProvider>
          <Tooltip open={open} onOpenChange={setOpen}>
            <TooltipTrigger asChild>
              <button
                onClick={handleCopy}
                className="
            text-neutral-500 hover:text-white
            transition
            min-[1000px]:justify-self-end cursor-pointer
          "
                aria-label="Copy market link"
              >
                <HugeiconsIcon icon={Share04Icon} className="size-5" />
              </button>
            </TooltipTrigger>

            <TooltipContent>
              <p>{copied ? "Copied" : "Copy link"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
