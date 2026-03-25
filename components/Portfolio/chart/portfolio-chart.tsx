"use client";

import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

export type PortfolioDataPoint = {
  date: string;
  value: number;
};

interface PortfolioLineChartProps {
  data: PortfolioDataPoint[];
}

/**
 * Financially-correct normalization:
 * - Always start from 0
 * - Always have at least 2 points
 * - Show real movement (0 → profit / loss)
 */
function normalizeChartData(data: PortfolioDataPoint[]): PortfolioDataPoint[] {
  const now = new Date();

  // 1️⃣ No trades → flat zero line
  if (!data || data.length === 0) {
    const t = now.toISOString();
    return [
      { date: t, value: 0 },
      { date: t, value: 0 },
    ];
  }

  // Sort data by time (safety)
  const sorted = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // 2️⃣ One trade → baseline (0) → actual value
  if (sorted.length === 1) {
    const point = sorted[0];
    const before = new Date(
      new Date(point.date).getTime() - 60 * 1000
    ).toISOString();

    return [{ date: before, value: 0 }, point];
  }

  // 3️⃣ Multiple trades → ensure baseline exists
  const first = sorted[0];

  if (first.value !== 0) {
    const before = new Date(
      new Date(first.date).getTime() - 60 * 1000
    ).toISOString();

    return [{ date: before, value: 0 }, ...sorted];
  }

  return sorted;
}

export function PortfolioLineChart({ data }: PortfolioLineChartProps) {
  const safeData = normalizeChartData(data);

  const isLoss = safeData[safeData.length - 1]?.value < 0;

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={safeData}>
          {/* Gradient */}
          <defs>
            <linearGradient id="profitLine" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={isLoss ? "#ef4444" : "#22c55e"}
                stopOpacity={0.9}
              />
              <stop
                offset="100%"
                stopColor={isLoss ? "#ef4444" : "#22c55e"}
                stopOpacity={0.15}
              />
            </linearGradient>
          </defs>

          {/* Tooltip */}
          <Tooltip
            cursor={{ stroke: "rgba(255,255,255,0.08)" }}
            contentStyle={{
              backgroundColor: "#111",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              padding: "8px 10px",
              fontSize: 12,
            }}
            labelStyle={{
              color: "#9ca3af",
              marginBottom: 4,
            }}
            formatter={(value: number) => [
              `${value >= 0 ? "+" : "-"}$${Math.abs(value).toLocaleString()}`,
              "PnL",
            ]}
          />

          {/* Line */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#profitLine)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 4 }}
            isAnimationActive={safeData.length > 2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
