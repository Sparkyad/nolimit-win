"use client";

import React, { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

/* ---------------- TYPES ---------------- */

export type GraphPoint = {
  bucket: string;
  probAfter?: string;
};

type Props = {
  graphData: GraphPoint[] | GraphPoint[][];
  selectedOutcome: "yes" | "no";
};

/* ---------------- COMPONENT ---------------- */

export const SampleMultipleMarketAreaChart = React.memo(
  function SampleMultipleMarketAreaChart({
    graphData,
    selectedOutcome,
  }: Props) {
    /* ----------------------------------------
       Normalize input
    ---------------------------------------- */
    const normalizedGraphData = useMemo<GraphPoint[][]>(() => {
      if (!graphData || graphData.length === 0) return [];
      if (!Array.isArray(graphData[0])) return [graphData as GraphPoint[]];
      return graphData as GraphPoint[][];
    }, [graphData]);

    /* ----------------------------------------
       Chart config
    ---------------------------------------- */
    const chartConfig = useMemo<ChartConfig>(() => {
      const config: ChartConfig = {};
      normalizedGraphData.forEach((_, index) => {
        config[`outcome${index}`] = {
          label: `Outcome ${index + 1}`,
          color: `var(--chart-${index + 1})`,
        };
      });
      return config;
    }, [normalizedGraphData]);

    /* ----------------------------------------
       Collect all timestamps
    ---------------------------------------- */
    const allBuckets = useMemo(() => {
      const set = new Set<string>();
      normalizedGraphData.forEach((outcome) =>
        outcome.forEach((p) => set.add(p.bucket))
      );
      return Array.from(set).sort();
    }, [normalizedGraphData]);

    /* ----------------------------------------
       Build chart data
       (YES / NO flip happens here)
    ---------------------------------------- */
    const chartData = useMemo(() => {
      return allBuckets.map((bucket) => {
        const row: Record<string, number | string | null> = {
          time: new Date(bucket).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        };

        normalizedGraphData.forEach((outcome, index) => {
          const match = outcome.find((p) => p.bucket === bucket);
          if (!match || match.probAfter == null) {
            row[`outcome${index}`] = null;
            return;
          }

          const yesProb = Number(match.probAfter) * 100;

          row[`outcome${index}`] =
            selectedOutcome === "yes" ? yesProb : 100 - yesProb;
        });

        return row;
      });
    }, [allBuckets, normalizedGraphData, selectedOutcome]);

    if (!chartData.length) return null;

    return (
      <Card className="bg-transparent border-none shadow-none">
        <CardContent className="px-0">
          <ChartContainer className="h-56 w-full" config={chartConfig}>
            <AreaChart data={chartData} margin={{ top: 12, left: 0, right: 0 }}>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />

              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />

              <ChartTooltip
                content={
                  <ChartTooltipContent className="bg-neutral-900 text-white border border-neutral-800 shadow-lg" />
                }
                cursor={{
                  stroke: "#ca43ff",
                  strokeWidth: 0.7,
                  strokeDasharray: "4 4",
                  opacity: 0.5,
                }}
              />

              {/* One Area per outcome */}
              {normalizedGraphData.map((_, index) => (
                <Area
                  key={index}
                  type="monotone"
                  dataKey={`outcome${index}`}
                  stroke={`var(--chart-${index + 1})`}
                  fill={`url(#gradient-outcome-${index})`}
                  fillOpacity={0.35}
                  connectNulls={true}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ))}

              {/* Gradients */}
              <defs>
                {normalizedGraphData.map((_, index) => (
                  <linearGradient
                    key={index}
                    id={`gradient-outcome-${index}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={`var(--chart-${index + 1})`}
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="95%"
                      stopColor={`var(--chart-${index + 1})`}
                      stopOpacity={0}
                    />
                  </linearGradient>
                ))}
              </defs>
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  }
);
