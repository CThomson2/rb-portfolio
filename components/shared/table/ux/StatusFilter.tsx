"use client";

import React from "react";
import { DrumStatus, DrumStatusType } from "@/types/constant/drums";
import { Checkbox } from "@/components/ui/Checkbox";
import { ArrowUp, ArrowDown } from "lucide-react";

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
   */
  const handleCheckboxChange = (status: DrumStatusType) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <span className="min-w-fit">{title}</span>
      <ArrowUp />
      <ArrowDown />
      <div className="flex flex-col gap-2">
        {/* Map over all possible drum statuses to create checkboxes */}
        {Object.values(DrumStatus).map((status) => (
          <label
            key={status}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Checkbox
              checked={selectedStatuses.includes(status)}
              onCheckedChange={() => handleCheckboxChange(status)}
              className="mr-2"
            />
            <span className="text-sm">{status}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
