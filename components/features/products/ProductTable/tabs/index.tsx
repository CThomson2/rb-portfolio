"use client";
import { useState, useEffect } from "react";
import { GRADE } from "@/types/database/products";
import TabItem from "./TabItem";

interface GradeCounts {
  all: number;
  GD: number;
  HPLC: number;
  LCMS: number;
  "PTS-DS": number;
}

interface TableTabsProps {
  activeTab: GRADE | "All";
  setActiveTab: (value: GRADE | "All") => void;
}

const TableTabs = ({ activeTab, setActiveTab }: TableTabsProps) => {
  const [gradeCounts, setGradeCounts] = useState<GradeCounts>({
    all: 0,
    GD: 0,
    HPLC: 0,
    LCMS: 0,
    "PTS-DS": 0,
  });

  useEffect(() => {
    async function fetchCounts() {
      try {
        const response = await fetch("/api/products/count");
        const data = await response.json();
        // Flatten the nested _all counts into a simple object
        const flattenedCounts: GradeCounts = {
          all: data.all,
          GD: data.GD ?? 0,
          HPLC: data.HPLC ?? 0,
          LCMS: data.LCMS ?? 0,
          "PTS-DS": data.PTS_DS ?? 0,
        };

        setGradeCounts(flattenedCounts);
      } catch (error) {
        console.error("Failed to fetch product counts", error);
      }
    }
    fetchCounts();
  }, []);

  return (
    <div className="flex flex-row items-center gap-5 px-5 max-w-fit">
      <TabItem
        grade="All"
        number={gradeCounts.all}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {Object.values(GRADE).map((grade) => {
        return (
          <TabItem
            key={grade}
            grade={grade}
            number={gradeCounts[grade as keyof GradeCounts]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );
      })}
    </div>
  );
};

export default TableTabs;
