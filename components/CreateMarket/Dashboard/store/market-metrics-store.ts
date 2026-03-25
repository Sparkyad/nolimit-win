import { create } from "zustand";

type MetricKey = "opened" | "pending" | "rejected" | "closed";

interface MarketMetricsState {
  opened: number;
  pending: number;
  rejected: number;
  closed: number;

  created: number;

  setMetric: (key: MetricKey, count: number) => void;
}

export const useMarketMetricsStore = create<MarketMetricsState>((set) => ({
  opened: 0,
  pending: 0,
  rejected: 0,
  closed: 0,
  created: 0,

  setMetric: (key, count) =>
    set((state) => {
      const next = {
        ...state,
        [key]: count,
      };

      return {
        ...next,
        created:
          next.opened +
          next.rejected +
          next.closed,
      };
    }),
}));
