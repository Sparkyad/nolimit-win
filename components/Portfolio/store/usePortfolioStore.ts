import { create } from "zustand";
import { TradeHistoryItem } from "@/types/trade-history";

interface PortfolioState {
  activeTrades: TradeHistoryItem[];
  closedTrades: TradeHistoryItem[];

  setActiveTrades: (items: TradeHistoryItem[]) => void;
  setClosedTrades: (items: TradeHistoryItem[]) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeTrades: [],
  closedTrades: [],

  setActiveTrades: (items) => set({ activeTrades: items }),
  setClosedTrades: (items) => set({ closedTrades: items }),
}));
