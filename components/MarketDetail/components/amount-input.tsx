"use client";
import { cn } from "@/lib/utils";
import { Money04Icon } from "@hugeicons/core-free-icons";
import { LIQUIDATION_THRESHOLD } from "@/constants";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function AmountInput({
  totalVolume,
  yesVolume,
  selectedTrade,
  amount: value,
  setAmount: setValue,
}: {
  totalVolume: number;
  yesVolume: number;
  selectedTrade: "yes" | "no";
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [shake, setShake] = useState(false);
  const MAX_DIGITS = 9;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");

    if (!raw) {
      setValue("");
      return;
    }

    if (raw.length > MAX_DIGITS) {
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }

    const formatted = Number(raw).toLocaleString("en-US");
    setValue(formatted);
  };

  const numericValue = value ? Number(value.replace(/,/g, "")) : 0;
  let potentialWin = numericValue;
  if (numericValue > 0) {
    if (totalVolume < LIQUIDATION_THRESHOLD) {
      totalVolume += 100;
      yesVolume += 50;
    }

    const losingPool =
      selectedTrade === "yes" ? totalVolume - yesVolume : yesVolume;
    const winningPool =
      selectedTrade === "yes" ? yesVolume : totalVolume - yesVolume;
    potentialWin =
      numericValue + losingPool * (numericValue / (winningPool + numericValue));
  }

  return (
    <div className="relative w-full flex flex-col gap-2">
      <div
        className={cn(
          "border rounded-md border-neutral-800 transition",
          shake && "animate-shake"
        )}
      >
        <input
          type="text"
          value={value ? `$${value}` : ""}
          onChange={handleChange}
          className="h-10 w-full rounded-md outline-none px-3 text-right font-bold"
          placeholder="$0"
        />
      </div>
      <AnimatePresence>
        {numericValue > 0 && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 100 }}
            className="flex justify-between text-sm text-neutral-400"
          >
            <span className="flex gap-2 text-sm">
              To win{" "}
              <HugeiconsIcon icon={Money04Icon} className="text-emerald-400" />
            </span>
            <span className="font-bold text-emerald-400 text-base px-2">
              ${potentialWin.toLocaleString("en-US")}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
