// types/trade-history.ts
export type TradeHistoryItem = {
  marketId: string;
  question: string;
  image: string;
  outcome: "YES" | "NO";
  invested: number;
  pnl: number;
  status: "OPEN" | "CLOSED";
  lastTradeDate: string;
};

export interface TradeHistoryResponse {
  items: TradeHistoryItem[];
  nextCursor: string;
}
