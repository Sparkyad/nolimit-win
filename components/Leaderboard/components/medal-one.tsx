import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { LeaderboardUser } from "../View/leaderboard-view";

interface Props {
  user?: LeaderboardUser;
  sortBy: "pnl" | "volume";
}

export const MedalOne = ({ user, sortBy }: Props) => {
  if (!user) return null;
  return (
    <div className="flex-1 rounded-lg bg-[#151515] border-2 border-emerald-700 bg-linear-to-t from-[#151515] to-neutral-800">
      <div className="flex flex-col gap-6 h-full items-start p-6 relative overflow-hidden">
        <div className="relative">
          <img
            src="/leaderboard/avatar-1.avif"
            alt="first"
            className="w-14 aspect-square rounded-full border border-neutral-500 object-cover p-1 bg-transparent"
          />
          <span className="absolute -bottom-1 right-1 border  bg-gradient-to-t from-[#0A2F1F] to-[#14B87A] px-2 flex items-center rounded-full aspect-square text-sm">
            {user.rank}
          </span>
        </div>
        <div className="absolute -top-6 right-5">
          <img
            src="/leaderboard/medal-1.avif"
            alt="medal-1"
            className="w-20 md:w-20 lg:w-32"
          />
        </div>
        <div>
          <Link href="/portfolio">
            <span className="text-xl font-bold">
              {user.username ? user.username : "Adrian Cortez"}
            </span>
          </Link>
        </div>
        <div className="flex gap-4 lg:gap-4">
          {sortBy === "pnl" && (
            <>
              <div className="flex flex-col gap-1 text-sm">
                <span className="font-bold">Profit/Loss</span>
                <span className="text-emerald-500">{user.metrics}</span>
              </div>

              {/* <div className="py-2">
                <Separator orientation="vertical" className="bg-neutral-700" />
              </div> */}
            </>
          )}
          {sortBy === "volume" && (
            <div className="flex flex-col gap-1  text-sm">
              <span className="font-bold">Volume</span>
              <span className="text-neutral-200">{user.metrics}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
