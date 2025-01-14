"use client";

import React from "react";
import { DrumStatus, DrumStatusType } from "@/types/enums/drums";
import { Checkbox } from "@/components/ui/Checkbox";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatusFilterProps<TData, TValue> {
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
export const StatusFilter = <TData, TValue>({
  selectedStatuses,
  setSelectedStatuses,
  title,
}: StatusFilterProps<TData, TValue>) => {
  // NOTE: There appears to be a type error in setSelectedStatuses callback
  // The error suggests the callback expects DrumStatus[] but receives a function
  // This could be fixed by updating the prop type to:
  // setSelectedStatuses: React.Dispatch<React.SetStateAction<DrumStatus[]>>

  /**
   * Handles toggling a status filter checkbox
   * If status is already selected, removes it
   * If status is not selected, adds it
   */
  const handleCheckboxChange = (status: DrumStatusType) => {
    setSelectedStatuses((prevStatuses) =>
      prevStatuses.includes(status)
        ? prevStatuses.filter((s) => s !== status)
        : [...prevStatuses, status]
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
          <label key={status} className="flex items-center">
            <Checkbox
              checked={selectedStatuses.includes(status)}
              onChange={() => handleCheckboxChange(status)}
              className="mr-2"
            />
            {status}
          </label>
        ))}
      </div>
    </div>
  );
};
