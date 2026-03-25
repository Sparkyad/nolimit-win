import { Search02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { DegenBetting } from "../DegenBetting/degen-betting";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { sortOptions } from "@/types/sort-options";

interface MarketToggleProps {
  displayOnlyUserMarkets: boolean;
  setDisplayOnlyUserMarkets: (value: boolean) => void;
}
interface UserDashInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: sortOptions;
  setSortBy: (value: sortOptions) => void;
}

export const UserDashInput = ({
  searchTerm,
  setSearchTerm,
  displayOnlyUserMarkets,
  setDisplayOnlyUserMarkets,
  sortBy,
  setSortBy,
}: UserDashInputProps & MarketToggleProps) => {
  return (
    <div
      className="grid grid-cols-1 gap-4
    md:grid-cols-[minmax(0,1fr)_auto_auto_auto]
    md:items-center"
    >
      <div className="relative flex-1 flex gap-4 items-center">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-700">
          <HugeiconsIcon icon={Search02Icon} size="20" />
        </span>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search markets or profiles"
          className="pl-10 py-5 border border-[#2b2b2b] bg-[#151515] md:w-[400px] rounded-sm placeholder:text-neutral-600 placeholder:text-xs placeholder:lg:text-sm"
        />
        {/* <span className="hidden lg:block lg:absolute right-3 top-1/2 -translate-y-1/2 text-neutral-700">
          /
        </span> */}
        <div className="hidden md:block">
          <MarketSort sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>

      <div
        className="flex justify-between md:justify-end flex-1 items-center gap-4
    flex-wrap md:flex-nowrap
    min-[1118px]:ml-auto"
      >
        <div className="block md:hidden">
          <MarketSort sortBy={sortBy} setSortBy={setSortBy} />
        </div>
        <div>
          <MarketToggle
            displayOnlyUserMarkets={displayOnlyUserMarkets}
            setDisplayOnlyUserMarkets={setDisplayOnlyUserMarkets}
          />
        </div>

        <div>
          <DegenBetting />
        </div>
      </div>
    </div>
  );
};

export const MarketToggle = ({
  displayOnlyUserMarkets,
  setDisplayOnlyUserMarkets,
}: MarketToggleProps) => {
  return (
    <div className="inline-flex rounded-xl bg-neutral-800">
      <button
        onClick={async () => {
          // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/markets`, {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({
          //     question: "Will the Lakers win against the Celtics?",
          //     rules: "If the Lakers win, then yes else no. the game is on 2025-12-26 and starts at 7pm EST and ends at 10pm EST.",
          //     outcomes: [],
          //     category: "Sports",
          //     timezone: "New York/USA",
          //     imageUrl: "https://example.com/image.png",
          //   }),
          // });
          setDisplayOnlyUserMarkets(!displayOnlyUserMarkets);
        }}
        className={cn(
          "lg:px-6 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer",
          displayOnlyUserMarkets
            ? "text-white bg-linear-to-b from-[#005461] to-[#0C7779]"
            : "bg-linear-to-b from-neutral-900 to-neutral-800 text-white"
        )}
      >
        User Markets
      </button>
    </div>
  );
};

export const MarketSort = ({
  sortBy,
  setSortBy,
}: {
  sortBy: sortOptions;
  setSortBy: (value: sortOptions) => void;
}) => {
  return (
    <Select
      value={sortBy}
      onValueChange={(value) => setSortBy(value as sortOptions)}
    >
      <SelectTrigger className="w-[200px] md:w-[160px] border-neutral-700 cursor-pointer">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={sortOptions.VOLUME}>High Volume</SelectItem>
          <SelectItem value={sortOptions.NEWEST}>Newly Created</SelectItem>
          <SelectItem value={sortOptions.CLOSING}>Closing Soon</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
