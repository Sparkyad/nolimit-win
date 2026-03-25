export type TradeActivityItem = {
  question: string;
  outcome: "YES" | "NO";
  amount: number;
  timestamp: string; // ISO string
};

export type TradeActivityResponse = {
  items: TradeActivityItem[];
  nextCursor: string;
};
