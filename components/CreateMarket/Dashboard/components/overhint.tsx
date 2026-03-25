"use client";

import { RefreshIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";

export const OverviewHint = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <span className="flex items-center gap-1">
      <motion.button
        onClick={handleRefresh}
        className="cursor-pointer"
        initial={{ rotate: -90 }}
        animate={{ rotate: 270 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        // whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 0.9 }}
        aria-label="Refresh page"
      >
        <HugeiconsIcon icon={RefreshIcon} className="-rotate-90" />
      </motion.button>

      <span>verview</span>
    </span>
  );
};
