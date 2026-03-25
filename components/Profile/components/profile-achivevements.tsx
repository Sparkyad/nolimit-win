"use client";

import { ProfileStats } from "../View/profile-view";

type AchievementTier = {
  title: string;
  min: number;
};

type AchievementConfigItem = {
  value: number;
  color: string;
  tiers: AchievementTier[];
};

type ResolvedAchievement = {
  id: string;
  title: string;
  color: string;
};

const buildAchievementConfig = (stats: ProfileStats | null) => {
  const totalPnL = stats?.totalPnL ?? 0;
  const totalVolume = stats?.totalVolume ?? 0;
  const marketsCreated = stats?.marketsCreated ?? 0;
  const marketsCreatedVolume = stats?.marketsCreatedVolume ?? 0;

  const pnlVolumeRatio = totalVolume > 0 ? totalPnL / totalVolume : 0;

  return {
    pnlVolume: {
      color: "#FFC086",
      value: pnlVolumeRatio,
      tiers: [
        { title: "Sniper", min: 0.05 },
        { title: "Sharpshooter", min: 0.1 },
        { title: "Market Wizard", min: 0.2 },
      ],
    },

    marketsCreated: {
      color: "#8ED1FC",
      value: marketsCreated,
      tiers: [
        { title: "Builder", min: 1 },
        { title: "Architect", min: 5 },
        { title: "Master Architect", min: 20 },
      ],
    },

    totalVolume: {
      color: "#C084FC",
      value: totalVolume,
      tiers: [
        { title: "Minnow", min: 1 },
        { title: "Dolphin", min: 1_000 },
        { title: "Whale", min: 10_000 },
        { title: "Leviathan", min: 100_000 },
      ],
    },
    marketsCreatedVolume: {
      color: "#4ADE80",
      value: marketsCreatedVolume,
      tiers: [
        { title: "Liquidity Seeder", min: 1 },
        { title: "Market Mover", min: 1_000 },
        { title: "Ecosystem Pillar", min: 10_000 },
      ],
    },
  } satisfies Record<string, AchievementConfigItem>;
};

const resolveHighestTier = (
  value: number,
  tiers: AchievementTier[],
): AchievementTier | null => {
  let result: AchievementTier | null = null;

  for (const tier of tiers) {
    if (value >= tier.min) {
      result = tier;
    }
  }

  return result;
};

const buildAchievements = (
  stats: ProfileStats | null,
): ResolvedAchievement[] => {
  const config = buildAchievementConfig(stats);
  const result: ResolvedAchievement[] = [];

  for (const [id, item] of Object.entries(config)) {
    const tier = resolveHighestTier(item.value, item.tiers);
    if (!tier) continue;

    result.push({
      id,
      title: tier.title,
      color: item.color,
    });
  }

  return result;
};

const AchievementBadge = ({ title, color }: ResolvedAchievement) => {
  return (
    <div className="p-[1px] rounded-lg" style={{ background: color }}>
      <div
        className="rounded-lg bg-neutral-900 px-4 py-2 text-[11px] md:text-sm flex gap-3 items-center font-semibold"
        style={{ color }}
      >
        {title}
      </div>
    </div>
  );
};

type ProfileAchievementsProps = {
  stats: ProfileStats | null;
};

export const ProfileAchievements = ({ stats }: ProfileAchievementsProps) => {
  const achievements = buildAchievements(stats);
  const isNewUser =
    stats !== null &&
    stats.totalPnL === 0 &&
    stats.totalVolume === 0 &&
    stats.marketsCreated === 0;

  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs tracking-widest font-semibold text-neutral-500 uppercase">
        Achievements
      </span>
      {isNewUser && (
        <div className="text-sm text-neutral-500 italic">
          No achievements yet. Start trading or creating markets to earn your
          first badge.
        </div>
      )}

      {!isNewUser && (
        <div className="flex flex-wrap items-center md:flex-row gap-2">
          {achievements.map((achievement) => (
            <AchievementBadge key={achievement.id} {...achievement} />
          ))}
        </div>
      )}
    </div>
  );
};
