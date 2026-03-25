import Link from "next/link";
import { LeaderboardUser } from "../View/leaderboard-view";

interface Props {
  users?: LeaderboardUser[];
}

export const LeaderboardTable = ({ users }: Props) => {
  if (!users) return null;

  return (
    <div className="flex flex-col gap-5">
      {users.map((data, index) => {
        return (
          <div
            key={index}
            className="flex justify-between items-center gap-2 border-b border-b-neutral-800 pb-6"
          >
            <div className="flex gap-5 lg:gap-10 items-center">
              <span className="text-sm lg:text-base">{data.rank}</span>

              <Link
                href={`/portfolio/${data.walletAddress}`}
                className="flex items-center gap-5 lg:gap-10"
              >
                <img
                  src={data.avatarUrl ?? "/UserImage/gradient.avif"}
                  alt="leaderboard-avatar"
                  className="rounded-full lg:h-9 lg:w-9 h-7 w-7 object-cover cursor-pointer"
                />
                <div>
                  <span className="text-sm lg:text-base hover:underline">
                    {data.username ? data.username : data.walletAddress.slice(0, 6) + "..." + data.walletAddress.slice(-4)}
                  </span>
                </div>
              </Link>
            </div>

            <div className="flex items-center">
              <div className="hidden md:flex items-center gap-36">
                <div>
                  <span className="font-semibold text-lg">
                    {data.metrics}
                  </span>
                </div>
                {/* <div className="font-semibold">$34,224,33</div> */}
              </div>

              <div className="flex md:hidden items-center">
                <div>
                  <span className="text-sm md:text-base font-semibold">
                    {data.metrics}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
