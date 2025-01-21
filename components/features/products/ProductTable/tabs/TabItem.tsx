"use client";
import { useMemo } from "react";
import { Separator } from "@/components/ui/Separator";

import { GradeType } from "@/types/constant/products";
import { cn } from "@/lib/utils";

const TabItem = ({
  grade,
  number,
  activeTab,
  setActiveTab,
}: {
  grade: GradeType | "All";
  number: number;
  activeTab: string;
  setActiveTab: (value: string) => void;
}) => {
  const handleClick = () => {
    console.log("clicked", grade);
    setActiveTab(grade);
    console.log("activeTab", activeTab);
  };

  const isActive = useMemo(() => activeTab === grade, [activeTab, grade]);

  return (
    <div
      className={cn(
        "flex flex-row gap-2 items-center border-b-2 border-transparent hover:border-black pb-1 cursor-pointer ",
        {
          "border-primary": isActive,
          "hover:border-primary": isActive,
        }
      )}
      onClick={handleClick}
    >
      <h3
        className={cn("font-light", {
          "text-primary": isActive,
          "font-bold": isActive,
        })}
      >
        {grade}
      </h3>
      <span
        className={cn(
          "bg-gray-200 text-gray-700 rounded-xl text-xs px-[6px] font-normal",
          {
            "bg-primary font-bold": isActive, // If isActive is true, these classes will be added
          }
        )}
      >
        {number}
      </span>
    </div>
  );
};

export default TabItem;
