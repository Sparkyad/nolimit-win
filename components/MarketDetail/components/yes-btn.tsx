import { cn } from "@/lib/utils";
import {
  ArrowUp02Icon,
  ArrowDown02Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface Props {
  className?: string;
  onClick: () => void;
  active: boolean;
  change24h: number;
}

export const YesBtn = ({ className, onClick, active, change24h }: Props) => {
  const isPositive = change24h >= 0;

  return (
    <button
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-md py-3 lg:py-4 lg:px-10 flex gap-2 justify-center items-center lg:font-bold tracking-wider transition-all",
        className,
        active
          ? "bg-linear-to-b from-[#25A589] to-[#11373B]"
          : "bg-linear-to-b from-neutral-800 to-neutral-800 text-neutral-400"
      )}
    >

      <HugeiconsIcon icon={Tick01Icon} className="shrink-0 size-5" />
      YES
      <span
        className={cn(
          "w-[40px] text-right text-xs lg:text-sm tabular-nums",
          active
            ? isPositive
              ? "text-emerald-400"
              : "text-red-400"
            : "text-neutral-500"
        )}
      >
        {isPositive ? "+" : ""}
        {change24h}%
      </span>
      {/* <HugeiconsIcon
        icon={isPositive ? ArrowUp02Icon : ArrowDown02Icon}
        size={15}
        className={cn(
          active
            ? isPositive
              ? "text-emerald-400"
              : "text-red-400"
            : "text-neutral-500"
        )}
      /> */}
    </button>
  );
};

// "bg-linear-to-b from-[#0B60B0] to-[#002A98]"
