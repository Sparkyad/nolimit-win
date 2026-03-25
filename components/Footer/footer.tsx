"use client";

import Link from "next/link";
import { HowItWorksDialog } from "../CreateMarket/CreateMarketForm/View/create-market-view";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { NewTwitterIcon } from "@hugeicons/core-free-icons";

export const AppFooter = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // scrolling down → show footer
    if (latest > previous && latest > 20) {
      setVisible(true);
    }

    // scrolling up → hide footer
    if (latest < previous) {
      setVisible(false);
    }
  });

  return (
    <motion.footer
      initial={{ y: 80, opacity: 0 }}
      animate={{
        y: visible ? 0 : 80,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="
        hidden min-[1030px]:block
        sticky bottom-0 left-0 right-0
        z-40
        bg-linear-to-b from-neutral-950 to-neutral-900
        border-t border-neutral-800
      "
    >
      <div className="px-6 py-3 text-sm text-neutral-400 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        {/* Left */}
        <span>© 2026 NoLimit</span>

        {/* Center */}
        <div className="flex gap-5 items-center">
          <Link
            href="/privacy-policy"
            className="hover:text-neutral-200 transition"
          >
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-neutral-200 transition">
            Terms of Use
          </Link>
          <HowItWorksDialog />
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          <Link href="https://x.com/nolimit" target="_blank" className="hover:text-emerald-500">
            <HugeiconsIcon icon={NewTwitterIcon} />
          </Link>
          <a
            href="mailto:support@nolimit.com"
            className="hover:text-neutral-200 transition"
          >
            support@nolimit.com
          </a>
        </div>
      </div>
    </motion.footer>
  );
};
