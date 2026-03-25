"use client";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatJoinedDate } from "@/lib/formatJoinedDate";
import { cn } from "@/lib/utils";
import { Share05Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

interface Props {
  displayName: string;
  joinedAt: string;
  avatarUrl: string | null;
  wallet: string;
}

export const PortfolioBadge = ({
  displayName,
  joinedAt,
  avatarUrl,
  wallet,
}: Props) => {
  const joinedDate = formatJoinedDate(joinedAt);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);

  const shareUrl = `https://www.nolimit.com/portfolio/${wallet}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setOpenTooltip(true);

      setTimeout(() => {
        setCopied(false);
        setOpenTooltip(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  return (
    <>
      <div className="relative w-20 lg:w-24 aspect-square rounded-full overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 rounded-full bg-[linear-gradient(110deg,#1f1f1f,45%,#2a2a2a,55%,#1f1f1f)] bg-[length:200%_100%] animate-[ImageShimmer_1.4s_infinite]" />
        )}

        {avatarUrl && (
          <img
            src={avatarUrl}
            alt="profile-image"
            onLoad={() => setImageLoaded(true)}
            className={cn(
              "w-full h-full object-cover rounded-full border-2 border-white transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
          />
        )}
      </div>

      <span className="flex flex-col gap-1">
        <span className="font-bold md:text-lg truncate md:w-xs">
          {displayName}
        </span>
        <div className="font-light text-sm text-neutral-300 flex items-center gap-3">
          <span>{joinedDate}</span>
          <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>
            <TooltipTrigger asChild>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-neutral-400"
              >
                <HugeiconsIcon
                  icon={Share05Icon}
                  className="size-5 cursor-pointer hover:text-white"
                />
              </button>
            </TooltipTrigger>

            <TooltipContent>
              <span>{copied ? "Copied!" : "Share"}</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </span>
    </>
  );
};
