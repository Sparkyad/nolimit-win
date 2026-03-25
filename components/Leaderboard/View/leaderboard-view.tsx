"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { LeaderboardTable } from "../components/leaderboard-table";
import { LeaderboardFilters } from "../components/leaderboard-filters";

import { MedalOne } from "../components/medal-one";
import { MedalThree } from "../components/medal-three";
import { MedalTwo } from "../components/medal-two";
import { SegmentedFiters } from "../components/segmented-filters";
import { SegmentedToggle } from "../components/segmented-toggle";
import { useEffect, useState } from "react";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useSearchParams } from "next/navigation";
import { MedalCard } from "../components/medal-card";

export type LeaderboardUser = {
  avatarUrl: string | null;
  rank: number;
  metrics: number;
  username: string | null;
  walletAddress: string;
};

export type LeaderboardMode =
  | "Top Winners"
  | "Top Losers"
  | "Top Creators"
  | "Top Creator Volume";
export enum SortByOption {
  PROFIT = "profit",
  LOSS = "loss",
  TOP_CREATORS = "topCreators",
  TOP_CREATOR_BY_VOLUME = "topCreatorsByVolume",
}

export const LeaderboardView = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 0);

  const [limit] = useState(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mode, setMode] = useState<LeaderboardMode>("Top Winners");
  const [sortBy, setSortBy] = useState<SortByOption>(SortByOption.PROFIT);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  async function fetchLeaderboardData() {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/api/profiles/leaderboard?page=${page}&limit=${limit}&sortBy=${sortBy}${
        searchQuery.trim().length > 0
          ? `&search=${encodeURIComponent(searchQuery)}`
          : ""
      }`,
      { cache: "no-store" }
    );
    const data = await res.json();

    setLeaderboardData(Array.isArray(data.items) ? data.items : []);
    setTotalCount(data.totalCount ?? 0);
  }

  useEffect(() => {
    fetchLeaderboardData();
  }, [page, sortBy]);
  useEffect(() => {
    let delayDebounceFn: NodeJS.Timeout;
    delayDebounceFn = setTimeout(() => {
      fetchLeaderboardData();
    }, 300);
    return () => delayDebounceFn && clearTimeout(delayDebounceFn);
  }, [searchQuery]);
  useEffect(() => {
    if (mode === "Top Creator Volume") {
      setSortBy(SortByOption.TOP_CREATOR_BY_VOLUME);
    } else if (mode === "Top Losers") {
      setSortBy(SortByOption.LOSS);
    } else if (mode === "Top Creators") {
      setSortBy(SortByOption.TOP_CREATORS);
    } else {
      setSortBy(SortByOption.PROFIT);
    }
  }, [mode]);

  const topThree = leaderboardData.slice(0, 3);
  const restUsers = page > 0 ? leaderboardData : leaderboardData.slice(3);

  return (
    <div className="h-auto min-h-screen p-3 md:p-6">
      <div className="border rounded-lg h-full border-neutral-800 md:py-4">
        <div className="px-3">
          <div className="pb-2 hidden md:block">
            <SidebarTrigger />
          </div>
        </div>
        <Separator className="bg-neutral-800 hidden md:block" />

        <div className="flex flex-col gap-4 justify-center items-center p-2 w-full md:px-5 md:py-10 max-w-7xl mx-auto">
          <div className="flex w-full">
            <SegmentedToggle mode={mode} setMode={setMode} />
          </div>
          <div className="flex flex-col md:flex-row gap-5 w-full h-auto">
            {page === 0 && (
              <div className="flex flex-col md:flex-row gap-5 w-full">
                <MedalCard
                  variant="silver"
                  sortBy={sortBy}
                  user={topThree[1]}
                />
                <MedalCard variant="gold" sortBy={sortBy} user={topThree[0]} />
                <MedalCard
                  variant="bronze"
                  sortBy={sortBy}
                  user={topThree[2]}
                />
              </div>
            )}
          </div>
          <div className="bg-[#151515] bg-linear-to-t from-[#151515] to-neutral-900 w-full rounded-lg p-5 md:p-7 lg:p-5 flex flex-col gap-5">
            {/* <div className="flex flex-col gap-3 md:flex-row justify-between lg:items-center">
              <SegmentedToggle />
              <CategoryFilter />
            </div> */}
            {/* <div className="flex justify-center md:justify-start">
              <SegmentedFiters />
            </div> */}
            {/* <Separator className="bg-neutral-800" /> */}
            <div>
              <LeaderboardFilters
                sortBy={sortBy}
                setSortBy={setSortBy}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
            <Separator className="bg-neutral-800" />
            <div>
              <LeaderboardTable users={restUsers} />
            </div>

            <PaginationWithLinks
              page={page}
              pageSize={limit}
              totalCount={totalCount}
              navigationMode="router"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
