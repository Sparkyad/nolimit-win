import { GraphPoint } from "@/components/Charts/sample-multiple-market-chart";

export function compute24hChange(
  points: GraphPoint[] | undefined,
  hours: number = 24 // 👈 DEFAULT 24h
): number {
  if (!points || points.length < 2) return 0;

  // Sort by time
  const sorted = [...points].sort(
    (a, b) => new Date(a.bucket).getTime() - new Date(b.bucket).getTime()
  );

  const latest = sorted[sorted.length - 1];
  if (!latest?.probAfter) return 0;

  const latestTime = new Date().getTime();
  const targetTime = latestTime - hours * 60 * 60 * 1000; // 👈 CHANGE HERE

  // Find closest point <= targetTime
  let past: GraphPoint | undefined;
  for (let i = sorted.length - 1; i >= 0; i--) {
    const t = new Date(sorted[i].bucket).getTime();
    if (t <= targetTime) {
      if (t >= targetTime * 0.95) { // within 5% margin
        past = sorted[i];
      }
      break;
    }
  }

  if (!past?.probAfter) return 0;

  const latestYes = Number(latest.probAfter);
  const pastYes = Number(past.probAfter);

  if (pastYes === 0) return 0;

  const change = ((latestYes - pastYes) / pastYes) * 100;
  return Number(change.toFixed(2));
}
