import { CreateMarketView } from "@/components/CreateMarket/CreateMarketForm/View/create-market-view";
import { LoaderView } from "@/components/Loader/loader-view";
import React, { Suspense } from "react";

function Page() {
  return (
    <div className="mb-32 md:mb-0">
      <Suspense fallback={<LoaderView />}>
        <CreateMarketView />
      </Suspense>
    </div>
  );
}

export default Page;
