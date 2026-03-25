"use client";
import { CategoryTabs } from "@/components/UserDashboard/category-tabs";
import { SampleMarket } from "@/components/UserDashboard/sample-market";
import { Header } from "@/components/UserDashboard/user-dash-header";
import { UserDashInput } from "@/components/UserDashboard/user-dash-input";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { sortOptions } from "@/types/sort-options";
import { SidebarInset } from "@/components/ui/sidebar";
import { AppFooter } from "@/components/Footer/footer";

function HomePage() {
  const [displayOnlyUserMarkets, setDisplayOnlyUserMarkets] = useState(false);
  const [activeCategory, setActiveCategory] = useState("trending");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<sortOptions>(sortOptions.VOLUME);

  return (
    <div className="mb-32 md:mb-0">
      <div>
        <Header />
      </div>
      <div className="lg:px-4 px-4 flex flex-col gap-8 pt-5 lg:pt-0">
        <div className="flex flex-col  gap-6 lg:gap-6">
          <CategoryTabs
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <div>
            <UserDashInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              displayOnlyUserMarkets={displayOnlyUserMarkets}
              setDisplayOnlyUserMarkets={setDisplayOnlyUserMarkets}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>
        </div>
        <SampleMarket
          activeCategory={activeCategory}
          searchTerm={searchTerm}
          displayOnlyUserMarkets={displayOnlyUserMarkets}
          sortBy={sortBy}
        />
      </div>
      
        <AppFooter />
    
    </div>
  );
}

export default HomePage;
