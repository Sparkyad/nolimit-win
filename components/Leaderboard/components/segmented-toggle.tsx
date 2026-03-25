"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { LeaderboardMode } from "../View/leaderboard-view";

type SegmentedToggleProps = {
  mode: LeaderboardMode;
  setMode: (mode: LeaderboardMode) => void;
};

export function SegmentedToggle({ mode, setMode }: SegmentedToggleProps) {
  // const [active, setActive] = useState("Top Winners");

  const filters = [
    "Top Winners",
    "Top Losers",
    "Top Creators",
    "Top Creator Volume",
  ] as const;

  return (
    <div className="bg-[#1c1c1c] p-1 rounded-xl flex w-full gap-1">
      {filters.map((item) => {
        const isActive = mode === item;

        return (
          <button
            key={item}
            onClick={() => setMode(item)}
            className={cn(
              "flex-1 h-12 rounded-lg text-[10px] md:text-sm font-semibold cursor-pointer",
              "transition-colors duration-200 ease-out",
              "focus:outline-none select-none",
              "border border-transparent", // 🔑 keeps size stable
              isActive
                ? " bg-linear-to-t from-[#0A2F1F] to-[#14B87A] text-white"
                : "text-white hover:bg-[#2a2a2a]"
            )}
          >
            {item === "Top Creator Volume" ? (
              <>
                {/* Mobile */}
                <span className="md:hidden">Top Creator Vol.</span>

                {/* Desktop */}
                <span className="hidden md:inline">Top Creator Volume</span>
              </>
            ) : (
              item
            )}
          </button>
        );
      })}
    </div>
  );
}
