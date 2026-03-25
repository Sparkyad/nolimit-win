import { LeaderboardUser, SortByOption } from "../View/leaderboard-view";
import Link from "next/link";

const MEDAL_CONFIG = {
  gold: {
    border: "border-emerald-700",
    avatar: "/UserImage/gradient_2.avif",
    medal: "/leaderboard/medal-1.avif",
    medalClass: "absolute -top-6 right-5 w-20 md:w-20 lg:w-32",
  },
  silver: {
    border: "border-neutral-600",
    avatar: "/UserImage/gradient_3.avif",
    medal: "/leaderboard/medal-2.avif",
    medalClass: "absolute top-0 right-5 w-12 md:w-16 lg:w-20",
  },
  bronze: {
    border: "border-neutral-600",
    avatar: "/UserImage/gradient_0.avif",
    medal: "/leaderboard/medal-3.avif",
    medalClass: "absolute top-0 right-5 w-12 md:w-16 lg:w-20",
  },
} as const;

interface Props {
  user?: LeaderboardUser;
  sortBy: SortByOption;
  variant: keyof typeof MEDAL_CONFIG;
}

export const MedalCard = ({ user, sortBy, variant }: Props) => {
  if (!user) return null;

  const config = MEDAL_CONFIG[variant];

  return (
    <div
      className={`flex-1 rounded-lg bg-[#151515] border-2 ${config.border} bg-linear-to-t from-[#151515] to-neutral-800`}
    >
      <div className="flex flex-col gap-6 h-full items-start p-6 relative overflow-hidden">
        <div className="relative">
          <img
            src={user.avatarUrl ?? config.avatar}
            alt={variant}
            className="w-14 aspect-square rounded-full border border-neutral-500 object-cover p-1 bg-transparent"
          />
          <span className="absolute -bottom-1 right-1 border bg-gradient-to-t from-[#0A2F1F] to-[#14B87A] px-2 flex items-center rounded-full aspect-square text-sm">
            {user.rank}
          </span>
        </div>

        <div className={config.medalClass}>
          <img src={config.medal} alt={`${variant}-medal`} />
        </div>

        <Link href={`/portfolio/${user.walletAddress}`}>
          <span className="text-xl font-bold">
            {user.username ??
              user.walletAddress.slice(0, 6) +
                "..." +
                user.walletAddress.slice(-4)}
          </span>
        </Link>

        <div className="flex gap-4 text-lg">
          {sortBy === "profit" && (
            <div className="flex flex-col gap-1">
              <span className="font-bold">Profit</span>
              <span className="text-neutral-200">{user.metrics}</span>
            </div>
          )}
          {sortBy === "loss" && (
            <div className="flex flex-col gap-1">
              <span className="font-bold">Loss</span>
              <span className="text-neutral-200">{user.metrics}</span>
            </div>
          )}
          {sortBy === "topCreators" && (
            <div className="flex flex-col gap-1">
              <span className="font-bold">Num. of Markets</span>
              <span className="text-neutral-200">{user.metrics}</span>
            </div>
          )}
          {sortBy === "topCreatorsByVolume" && (
            <div className="flex flex-col gap-1">
              <span className="font-bold">Volume</span>
              <span className="text-neutral-200">{user.metrics}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
