// hooks/useTradeHistory.ts
import { useEffect, useState, useCallback } from "react";
import { TradeHistoryResponse } from "@/types/trade-history";
import { fetchJSON } from "@/lib/fetcher";

export const useTradeHistory = ({
  wallet,
  openMarkets,
  limit = 20,
}: {
  wallet?: string;
  openMarkets: boolean;
  limit?: number;
}) => {
  const [data, setData] = useState<TradeHistoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (!wallet) return;
    let cancelled = false;

    setLoading(true);
    setError(null);

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profiles/${wallet}/history?openMarkets=${openMarkets}&limit=${limit}`;

    fetchJSON<TradeHistoryResponse>(url)
      .then((res) => {
        if (!cancelled) {
          setData(res);
          setCursor(res.nextCursor ?? null);
          setHasMore(!!res.nextCursor);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load history");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [wallet, openMarkets, limit]);

  const loadMore = useCallback(async () => {
    if (!wallet || !cursor || !hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    setError(null);

    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profiles/${wallet}/history?openMarkets=${openMarkets}&limit=${limit}&cursor=${cursor}`;
      const res = await fetchJSON<TradeHistoryResponse>(url);

      setData((prev) => ({
        ...res,
        items: [...(prev?.items ?? []), ...res.items],
      }));
      setCursor(res.nextCursor ?? null);
      setHasMore(!!res.nextCursor);
    } catch {
      setError("Failed to load more history");
    } finally {
      setIsLoadingMore(false);
    }
  }, [wallet, cursor, hasMore, isLoadingMore, openMarkets, limit]);

  return { data, loading, error, loadMore, hasMore, isLoadingMore };
};
