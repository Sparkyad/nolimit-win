"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortByOption } from "../View/leaderboard-view";

type FilterProps = {
  sortBy: SortByOption;
  setSortBy: (value: SortByOption) => void;
};
type LeaderboardFiltersProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export const LeaderboardFilters = ({ sortBy, setSortBy, searchQuery, setSearchQuery }: FilterProps & LeaderboardFiltersProps) => {
  return (
    <div className="flex justify-between items-center flow-row gap-2">
      <div className="flex-1">
        <LeaderboardInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="hidden md:block">
        <LeaderboardToggle sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      {/* <div className="md:hidden">
        <LeaderboardToggleMobile />
      </div> */}
    </div>
  );
};

export const LeaderboardInput = ({ searchQuery, setSearchQuery }: LeaderboardFiltersProps) => {
  return (
    <div className="relative lg:w-[300px]">
      <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-600" />

      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search username"
        className="lg:pl-10 pl-8 border-none text-sm text-white placeholder:text-sm placeholder:lg:text-base placeholder:text-neutral-600"
      />
    </div>
  );
};

export const LeaderboardToggle = ({ sortBy }: FilterProps) => {
  return (
    <div className="flex gap-36">
      {/* <button
        onClick={() => setActive("profitLoss")}
        className={cn(
          active === "profitLoss" ? "text-white" : "text-neutral-600",
          "cursor-pointer flex items-center justify-center gap-10"
        )}
      >
        Profit/Loss{" "}
    
      </button> */}

      <span>
        {sortBy === "profit" && "Profit"}
        {sortBy === "loss" && "Loss"}
        {sortBy === "topCreatorsByVolume" && "Volume"}
        {sortBy === "topCreators" && "Num. of Markets"}
      </span>

      {/* <button
        onClick={() => setActive("volume")}
        className={cn(
          active === "volume" ? "text-white" : "text-neutral-600",
          "cursor-pointer"
        )}
      >
        Volume
      </button> */}
    </div>
  );
};

export const LeaderboardToggleMobile = () => {
  const [active, setActive] = useState<"profitLoss" | "volume">("profitLoss");
  return (
    <div>
      <Select>
        <SelectTrigger className="rounded-lg bg-transparent text-white w-[150px] lg:w-[150px] text-sm border-neutral-600">
          <SelectValue placeholder="Profit/Loss" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="profitLoss">Profit/Loss</SelectItem>
            <SelectItem value="volume">Volume</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
