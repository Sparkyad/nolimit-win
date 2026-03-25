"use client";

import { Share04Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EndDateListProps {
  img: string;
  title: string;
  endDate: string;
  marketId: number;
}

export const EndDateList = ({
  img,
  title,
  endDate,
  marketId,
}: EndDateListProps) => {
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

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-3 flex-2">
        <img
          src={img}
          alt="market-img"
          className="w-12 aspect-square object-cover rounded-md"
        />

        <Link
          href={`/market/${marketId}`}
          className="line-clamp-2 truncate text-sm lg:text-lg font-medium text-balance"
        >
          {title}
        </Link>
      </div>

      <div className="flex-1 flex justify-end items-center">
        <span className="text-neutral-500 text-xs lg:text-sm flex gap-2 items-center">
          <div className="hidden md:flex">{endDate}</div>

          <TooltipProvider>
            <Tooltip open={open} onOpenChange={setOpen}>
              <TooltipTrigger asChild>
                <button
                  onClick={handleCopy}
                  className="hover:text-white transition duration-200"
                  aria-label="Copy market link"
                >
                  <HugeiconsIcon
                    icon={Share04Icon}
                    className="size-5 cursor-pointer"
                  />
                </button>
              </TooltipTrigger>

              <TooltipContent>
                <p>{copied ? "Copied" : "Copy link"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
      </div>
    </div>
  );
};
