"use client";

import { BinaryMarketCard } from "../MarketCards/binary-market-card";
import { MultipleCard } from "../MarketCards/multiple-market-card";
import { useCallback, useEffect, useRef, useState } from "react";
import { sortOptions } from "@/types/sort-options";
import { motion } from "motion/react";
import type { Variants } from "motion/react";

type MarketUI =
  | {
    type: "binary";
    id: string;
    image: string;
    des: string;
    vol: string;
    frequency: "daily" | "monthly" | "none";
    category?: string;
  }
  | {
    type: "multi";
    id: string;
    image: string;
    des: string;
    vol: string;
    frequency: "daily" | "monthly" | "none";
    category?: string;
    multipleOutcomes: {
      key: string;
      text: string;
      question: string;
      chances: string;
    }[];
  };

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.01,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeInOut" },
  },
};

interface Props {
  activeCategory: string;
  searchTerm: string;
  displayOnlyUserMarkets: boolean;
  sortBy: sortOptions;
}

export const SampleMarket = ({
  activeCategory,
  searchTerm,
  displayOnlyUserMarkets,
  sortBy,
}: Props) => {
  const [markets, setMarkets] = useState<MarketUI[]>([]);
  const [cursor, setCursor] = useState<number | null>(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchMarkets = useCallback(async (marketsParam: MarketUI[] = [], cursorParam: number | null = null, hasMoreParam: boolean = true) => {
    if (loading || !hasMoreParam) return;

    setLoading(true);

    try {
      const params: {
        cursor?: number;
        category?: string;
        search?: string;
        userOnly?: boolean;
        sort?: string;
      } = {};

      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      } else {
        if (cursorParam) params.cursor = cursorParam;
        if (activeCategory !== "trending") params.category = activeCategory;
        if (displayOnlyUserMarkets) params.userOnly = true;
        if (sortBy) params.sort = sortBy;
      }

      const url =
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/markets?` +
        new URLSearchParams(params as Record<string, string>);

      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();

      const newMarkets: MarketUI[] = data.items
        .map((m: any) => {
          if (m.binaryMarkets?.length === 1) {
            return {
              type: "binary",
              id: m.id,
              image: m.imageUrl ?? "/card-images/temp.jfif",
              des: m.text,
              vol: m.totalVolume?.toLocaleString() ?? "0",
              frequency: "totally",
              category: m.category,
            };
          }

          if (m.binaryMarkets?.length > 1) {
            return {
              type: "multi",
              id: m.id,
              image: m.imageUrl ?? "/card-images/temp.jfif",
              des: m.text,
              vol: m.totalVolume?.toLocaleString() ?? "0",
              frequency: "totally",
              category: m.category,
              multipleOutcomes: m.binaryMarkets.map(
                (bm: any, index: number) => ({
                  key: String(index),
                  question: bm.question,
                  text: bm.text,
                  chances:
                    Number(bm.totalVolume) === 0
                      ? "0.00%"
                      : `${(
                        (Number(bm.yesVolume) / Number(bm.totalVolume)) *
                        100
                      ).toFixed(2)}%`,
                })
              ),
            };
          }

          return null;
        })
        .filter(Boolean) as MarketUI[];

      setMarkets(() => [...marketsParam, ...newMarkets]);
      setCursor(data.nextCursor ?? null);
      setHasMore(Boolean(data.nextCursor));
    } finally {
      setLoading(false);
    }
  }, [
    activeCategory,
    searchTerm,
    displayOnlyUserMarkets,
    sortBy,
    loading
  ]);

  useEffect(() => { fetchMarkets([], 0) }, [activeCategory, displayOnlyUserMarkets, sortBy]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => { fetchMarkets([], 0) }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Intersection Observer
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMarkets(markets, cursor, hasMore);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchMarkets, hasMore]);

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-1 flex-col gap-4 pt-0 will-change"
      >
        <div className="grid auto-rows-min gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          {markets.map((market, index) => (
            <motion.div
              key={`market-${market.id}`}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {market.type === "binary" ? (
                <BinaryMarketCard {...market} marketId={market.id} />
              ) : (
                <MultipleCard {...market} marketId={market.id} />
              )}
            </motion.div>
          ))}

          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="bg-linear-to-t from-[#141414] to-[#262626] aspect-video rounded-xl animate-pulse"
              />
            ))}
        </div>
      </motion.div>
      <div ref={loadMoreRef} className="h-20" />
    </>
  );
};
