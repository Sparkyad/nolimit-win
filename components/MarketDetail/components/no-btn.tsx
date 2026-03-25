import { cn } from "@/lib/utils";
import {
  ArrowDown02Icon,
  ArrowUp02Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface Props {
  className?: string;
  onClick: () => void;
  active: boolean;
  change24h: number;
}

export const NoBtn = ({ className, active, onClick, change24h }: Props) => {
  const isPositive = change24h >= 0;

  return (
    <button
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-md py-3 lg:py-4 lg:px-10 flex gap-2 justify-center items-center lg:font-bold tracking-wider",
        className,
        active
          ? "bg-gradient-to-b from-[#6A4BC6] to-[#2E255A]"
          : "bg-linear-to-b from-neutral-800 to-neutral-800 text-neutral-400"
      )}
    >
      <HugeiconsIcon icon={Cancel01Icon} className="shrink-0 size-5" />
      NO
      {/* FIXED WIDTH NUMBER */}
      <span
        className={cn(
          "w-[40px] text-right text-xs lg:text-sm tabular-nums",
          active
            ? isPositive
              ? "text-emerald-300"
              : "text-[#FF9191]"
            : "text-neutral-500"
        )}
      >
        {isPositive ? "+" : ""}
        {change24h}%
      </span>
      {/* ICON — FOLLOWS SIGN */}
      {/* <HugeiconsIcon
        icon={isPositive ? ArrowUp02Icon : ArrowDown02Icon}
        size={15}
        className={cn(
          active
            ? isPositive
              ? "text-emerald-300"
              : "text-[#FF9191]"
            : "text-neutral-500"
        )}
      /> */}
    </button>
  );
};

// "bg-linear-to-b from-[#AF3E3E] to-[#601A1A]"
