import { LeaderboardView } from "@/components/Leaderboard/View/leaderboard-view";
import React, { Suspense } from "react";

function Page() {
  return (
    <div className="mb-32 md:mb-0">
      <Suspense fallback={null}>
        <LeaderboardView />
      </Suspense>
    </div>
  );
}

export default Page;
