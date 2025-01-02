"use client";
import { useState, useEffect } from "react";
import {
  countProductsByGrade,
  countAllProducts,
} from "@/lib/products/countProductsByGrade";
import { GRADE } from "@/types/database/products";
import TabItem from "./TabItem";

interface GradeCounts {
  all: number;
  GD: number;
  HPLC: number;
  LCMS: number;
  PTS_DS: number;
}

const TableTabs = () => {
  const [gradeCounts, setGradeCounts] = useState<GradeCounts>({
    all: 0,
    GD: 0,
    HPLC: 0,
    LCMS: 0,
    PTS_DS: 0,
  });

  // useEffect(() => {
  //   async function fetchCounts() {
  //     try {
  //       const allResponse = await fetch("/api/products/count");
  //       const allData = await allResponse.json();
  //       const gdResponse = await fetch("/api/products/count?grade=GD");
  //       const gdData = await gdResponse.json();
  //       const hplcResponse = await fetch("/api/products/count?grade=HPLC");
  //       const hplcData = await hplcResponse.json();
  //       const lcmsResponse = await fetch("/api/products/count?grade=LCMS");
  //       const lcmsData = await lcmsResponse.json();
  //       const ptsResponse = await fetch("/api/products/count?grade=PTS_DS");
  //       const ptsData = await ptsResponse.json();

  //       setGradeCounts({
  //         all: allData.count,
  //         GD: gdData.count,
  //         HPLC: hplcData.count,
  //         LCMS: lcmsData.count,
  //         PTS_DS: ptsData.count,
  //       });
  //     } catch (error) {
  //       console.error("Failed to fetch product counts", error);
  //     }
  //   }
  //   fetchCounts();
  // }, []);

  const [activeTab, setActiveTab] = useState<GRADE | "All">("All");
  return (
    <div className="flex flex-row items-center gap-5 px-5 max-w-fit">
      {["All", GRADE.GD, GRADE.HPLC, GRADE.LCMS, GRADE.PTS_DS].map(
        (grade, index) => (
          <TabItem
            key={index}
            grade={grade as GRADE | "All"}
            number={gradeCounts[grade as keyof typeof gradeCounts]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )
      )}
    </div>
  );
};

export default TableTabs;
