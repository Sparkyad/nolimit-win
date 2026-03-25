// lib/fetcher.ts
export async function fetchJSON<T>(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return (await res.json()) as T;
}
