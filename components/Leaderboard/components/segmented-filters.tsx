"use client"

import { cn } from "@/lib/utils";
import { useState } from "react";

const FILTERS = [
  { label: "Today", value: "today" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "All", value: "all" },
] as const;

export type FilterValue = (typeof FILTERS)[number]["value"];
interface SegmentedFiltersProps {
  defaultValue?: FilterValue;
  onChange?: (value: FilterValue) => void;
}

export function SegmentedFiters({
  defaultValue = "today",
  onChange,
}: SegmentedFiltersProps) {
  const [active, setActive] = useState<FilterValue>(defaultValue);

  const handleChange = (value: FilterValue) => {
    if (value === active) return;
    setActive(value);
    onChange?.(value);
  };

  return (
    <div className="bg-[#1c1c1c] py-1 rounded-lg flex w-full md:w-auto">
      {FILTERS.map((filter) => {
        const isActive = active === filter.value;

        return (
          <button
            key={filter.value}
            onClick={() => handleChange(filter.value)}
            disabled={isActive}
            className={cn(
              "flex-1 px-3 py-2 mx-1 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 ease-out cursor-pointer",
              "select-none focus:outline-none",
              isActive
                ? "bg-linear-to-b from-emerald-500 to-purple-800 text-white shadow-sm"
                : "text-white hover:bg-[#2a2a2a]"
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}