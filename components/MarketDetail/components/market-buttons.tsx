"use client";

import { NoBtn } from "./no-btn";
import { YesBtn } from "./yes-btn";

interface Props {
  side: "yes" | "no";
  onChange: (side: "yes" | "no") => void;
  yesChange1h: number;
}

export const MarketButtons = ({
  side,
  onChange,
  yesChange1h,
}: Props) => {
  return (
    <div className="flex gap-3 px-5 pt-8 pb-4">
      <YesBtn
        className="flex-1 py-4 text-sm min-w-0"
        change24h={yesChange1h}
        active={side === "yes"}
        onClick={() => onChange("yes")}
      />
      <NoBtn
        className="flex-1 py-4 text-sm min-w-0"
        change24h={-yesChange1h}
        active={side === "no"}
        onClick={() => onChange("no")}
      />
    </div>
  );
};
