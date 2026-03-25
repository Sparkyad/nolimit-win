"use client"
import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

export const ExpandedText = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {/* Header Row: Title + Button */}
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Rules</span>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer"
        >
          {expanded ? (
            <span className="flex gap-1 text-sm items-center">
              Show Less <HugeiconsIcon icon={ArrowUp01Icon} size={16} />
            </span>
          ) : (
            <span className="flex gap-1 text-sm items-center">
              Show More <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
            </span>
          )}
        </button>
      </div>

      {/* Expandable Section */}
      <div
        className={
          expanded
            ? "text-sm flex flex-col gap-5"
            : "text-sm line-clamp-1 overflow-hidden text-ellipsis text-balance"
        }
      >
        {children}
      </div>
    </div>
  );
};
