"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import React, { useMemo, useRef, useState } from "react";
import { useSpring, useMotionValueEvent } from "motion/react";

export type GraphPoint = {
  bucket: string;
  probAfter?: string;
};

interface Props {
  graphData: GraphPoint[];
}

const chartConfig = {
  value: {
    label: "Probability",
    color: "#FCA070",
  },
} satisfies ChartConfig;

export const SampleChartTwo = React.memo(function SampleChartTwo({
  graphData,
}: Props) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [axis, setAxis] = useState(0);

  const chartData = useMemo(() => {
    return graphData.map((point) => ({
      label: new Date(point.bucket).toLocaleDateString("en-US", {
        month: "short",
      }),
      value: Number(point.probAfter) * 100, // % value
    }));
  }, [graphData]);

  const springX = useSpring(0, { damping: 30, stiffness: 100 });
  const springY = useSpring(chartData.at(-1)?.value ?? 0, {
    damping: 30,
    stiffness: 100,
  });

  useMotionValueEvent(springX, "change", (latest) => {
    setAxis(latest);
  });

  if (!chartData.length) return null;

  return (
    <Card className="bg-transparent border-none shadow-none border">
      <CardContent className="px-0">
        <ChartContainer
          ref={chartRef}
          className="h-54 w-full"
          config={chartConfig}
        >
          <AreaChart
            className="overflow-visible"
            accessibilityLayer
            data={chartData}
            onMouseMove={(state) => {
              const x = state.activeCoordinate?.x;
              const dataValue = state.activePayload?.[0]?.value;

              if (x && dataValue !== undefined) {
                springX.set(x);
                springY.set(dataValue);
              }
            }}
            onMouseLeave={() => {
              springX.set(chartRef.current?.getBoundingClientRect().width || 0);
              springY.jump(chartData.at(-1)?.value ?? 0);
            }}
            margin={{ right: 0, left: 0 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              horizontalCoordinatesGenerator={({ height }) => [0, height - 30]}
            />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <Area
              dataKey="value"
              type="monotone"
              fill="url(#gradient-cliped-area)"
              fillOpacity={0.4}
              stroke="var(--color-value)"
              clipPath={`inset(0 ${
                Number(chartRef.current?.getBoundingClientRect().width) - axis
              } 0 0)`}
            />

            {/* Hover line */}
            <line
              x1={axis}
              y1={0}
              x2={axis}
              y2="85%"
              stroke="var(--color-value)"
              strokeDasharray="3 3"
              strokeOpacity={0.2}
            />

            {/* Hover label */}
            <rect
              x={axis - 40}
              y={0}
              width={40}
              height={18}
              fill="var(--color-value)"
            />
            <text
              x={axis - 20}
              y={13}
              fontWeight={600}
              textAnchor="middle"
              fill="var(--primary-foreground)"
            >
              {springY.get().toFixed(1)}%
            </text>

            {/* Ghost line */}
            <Area
              dataKey="value"
              type="monotone"
              fill="none"
              stroke="var(--color-value)"
              strokeOpacity={0.1}
            />

            <defs>
              <linearGradient
                id="gradient-cliped-area"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-value)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-value)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
});
