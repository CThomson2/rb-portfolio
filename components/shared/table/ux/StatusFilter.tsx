"use client";

import React from "react";
import { DrumStatus, DrumStatusType } from "@/types/constant/drums";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusFilterProps {
  selectedStatuses: DrumStatusType[];
  setSelectedStatuses: React.Dispatch<React.SetStateAction<DrumStatusType[]>>;
  title: string;
}

/**
 * Component that renders a list of checkboxes for filtering drums by status
 *
 * @param selectedStatuses - Array of currently selected status filters
 * @param setSelectedStatuses - Callback function to update selected statuses
 */
export const StatusFilter = ({
  selectedStatuses,
  setSelectedStatuses,
  title,
}: StatusFilterProps) => {
  /**
   * Handles toggling a status filter checkbox
   * If status is already selected, removes it
   * If status is not selected, adds it
   * TODO: Stop the page reloading when a status is selected
   * TODO: Instead of showing the loading page and toggling the checkboix off,
   * find some way to keep the page in view, and the checkbox remaining,
   * so that multiple statuses can be selected without reloading the page
   * It does take some finite amount of time to load the data when filters are applied
   * But it should be done without reloading the page
   * And it even shows a loading state when I remove a filter - not great, as no data is even being fetched!
   */
  const handleCheckboxChange = (status: DrumStatusType) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // Count of selected statuses for the filter button
  const selectedCount = selectedStatuses.length;

  const getStatusColor = (status: DrumStatusType) => {
    switch (status) {
      case "available":
        return "green-400";
      case "scheduled":
        return "blue-400";
      case "processed":
        return "slate-600";
      case "pending":
        return "slate-100";
      default:
        return "purple-400";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 data-[state=open]:bg-slate-700/50 uppercase text-sm font-medium",
            "flex items-center gap-2",
            selectedCount > 0 && "text-blue-400"
          )}
        >
          <Filter className="w-4 h-4" />
          {title}
          {selectedCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full">
              {selectedCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[280px] p-4 bg-slate-800 border border-slate-600"
      >
        <div className="grid grid-cols-2 gap-4">
          {Object.values(DrumStatus).map((status) => (
            <label
              key={status}
              className={cn(
                "flex items-center space-x-3 cursor-pointer group p-2 rounded-md",
                "hover:bg-slate-700/50 transition-all",
                selectedStatuses.includes(status) && "bg-slate-700/30",
                {
                  "hover:shadow-green-400/20": status === "available",
                  "hover:shadow-blue-400/20": status === "scheduled",
                  "hover:shadow-slate-600/20": status === "processed",
                  "hover:shadow-slate-100/20": status === "pending",
                  "hover:shadow-purple-400/20": ![
                    "available",
                    "scheduled",
                    "processed",
                    "pending",
                  ].includes(status),
                }
              )}
            >
              <Checkbox
                checked={selectedStatuses.includes(status)}
                onCheckedChange={() => handleCheckboxChange(status)}
                className={cn(
                  "h-5 w-5 border-2 border-slate-600 rounded-sm transition-colors",
                  {
                    "hover:border-green-400 data-[state=checked]:border-green-400 data-[state=checked]:bg-green-400":
                      status === "available",
                    "hover:border-blue-400 data-[state=checked]:border-blue-400 data-[state=checked]:bg-blue-400":
                      status === "scheduled",
                    "hover:border-slate-600 data-[state=checked]:border-slate-600 data-[state=checked]:bg-slate-600":
                      status === "processed",
                    "hover:border-slate-100 data-[state=checked]:border-slate-100 data-[state=checked]:bg-slate-100":
                      status === "pending",
                    "hover:border-purple-400 data-[state=checked]:border-purple-400 data-[state=checked]:bg-purple-400":
                      ![
                        "available",
                        "scheduled",
                        "processed",
                        "pending",
                      ].includes(status),
                  }
                )}
              />
              <span
                className={cn(
                  "text-sm font-medium capitalize transition-colors whitespace-nowrap",
                  {
                    "text-green-400": status === "available",
                    "text-blue-400": status === "scheduled",
                    "text-slate-600": status === "processed",
                    "text-slate-100": status === "pending",
                    "text-slate-400": ![
                      "available",
                      "scheduled",
                      "processed",
                      "pending",
                    ].includes(status),
                  }
                )}
              >
                {status}
              </span>
            </label>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
