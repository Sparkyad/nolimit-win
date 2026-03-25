"use client";

import { YesBtn } from "./yes-btn";
import { NoBtn } from "./no-btn";

export interface BinaryMarketButtonsProps {
  selected: "yes" | "no";
  setSelected: (v: "yes" | "no") => void;
  yesChange1h: number;
}

export const BinaryMarketButtons = ({
  selected,
  setSelected,
  yesChange1h,
}: BinaryMarketButtonsProps) => {
  return (
    <div className="flex gap-2 px-5 py-4">
      <YesBtn
        className="flex-1 py-4 text-sm"
        active={selected === "yes"}
        change24h={yesChange1h}
        onClick={() => setSelected("yes")}
      />

      <NoBtn
        className="flex-1 py-4 text-sm"
        active={selected === "no"}
        change24h={-yesChange1h}
        onClick={() => setSelected("no")}
      />
    </div>
  );
};
