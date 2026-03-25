import { useEffect, useState, useCallback } from "react";
import { TradeActivityResponse } from "@/types/trade-activity";
import { fetchJSON } from "@/lib/fetcher";

export const useTradeActivity = ({
  wallet,
  limit = 20,
}: {
  wallet?: string;
  limit?: number;
}) => {
  const [data, setData] = useState<TradeActivityResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (!wallet) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchJSON<TradeActivityResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profiles/${wallet}/activity?limit=${limit}`
    )
      .then((res) => {
        if (!cancelled) {
          setData(res);
          setCursor(res.nextCursor);
          setHasMore(!!res.nextCursor);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load activity");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [wallet, limit]);

  const loadMore = useCallback(async () => {
    if (!wallet || !cursor || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const res = await fetchJSON<TradeActivityResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profiles/${wallet}/activity?limit=${limit}&cursor=${cursor}`
      );

      setData((prev) => ({
        ...res,
        items: [...(prev?.items ?? []), ...res.items],
      }));
      setCursor(res.nextCursor);
      setHasMore(!!res.nextCursor);
    } catch {
      setError("Failed to load more activity");
    } finally {
      setIsLoadingMore(false);
    }
  }, [wallet, cursor, limit, isLoadingMore]);

  return { data, loading, error, loadMore, hasMore, isLoadingMore };
};
