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

/* ---------------- MOCK DATA ---------------- */

const mockData = [
  { time: "Jan 1", value: 120 },
  { time: "Jan 3", value: 180 },
  { time: "Jan 5", value: 150 },
  { time: "Jan 7", value: 210 },
  { time: "Jan 9", value: 260 },
  { time: "Jan 11", value: 230 },
  { time: "Jan 13", value: 300 },
];

/* ---------------- COMPONENT ---------------- */

export const AdminSingleLineChart = React.memo(function AdminSingleLineChart() {
  /* ---------------- Chart config ---------------- */
  const chartConfig = useMemo<ChartConfig>(
    () => ({
      value: {
        label: "Value",
        color: "rgb(239,68,68)", // red-500
      },
    }),
    []
  );

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardContent className="px-0">
        <ChartContainer className="h-40 w-full" config={chartConfig}>
          <AreaChart data={mockData} margin={{ top: 12, left: 0, right: 0 }}>
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
                stroke: "rgb(239,68,68)",
                strokeWidth: 0.7,
                strokeDasharray: "4 4",
                opacity: 0.5,
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="rgb(239,68,68)"
              fill="url(#gradient-red)"
              fillOpacity={0.35}
              dot={false}
              activeDot={{ r: 4 }}
            />

            {/* Gradient */}
            <defs>
              <linearGradient id="gradient-red" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="rgb(239,68,68)"
                  stopOpacity={0.25}
                />
                <stop offset="95%" stopColor="rgb(239,68,68)" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
});
