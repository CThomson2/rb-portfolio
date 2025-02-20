/**
 * Custom hook for automatically saving form data with debouncing, local storage backup,
 * and status tracking.
 *
 * Features:
 * - Debounced saving to prevent excessive API calls
 * - Local storage backup for data recovery
 * - Save status tracking (idle, saving, saved, error)
 * - Optional sound feedback on successful save
 * - Ability to disable autosave functionality
 *
 * @template T The type of form data being saved
 */

import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce";

/** Possible states for the save operation */
export type SaveStatus = "idle" | "saving" | "saved" | "error";

/** Internal state for tracking save operations */
interface AutosaveState {
  status: SaveStatus;
  lastSaved: Date | null;
  error: Error | null;
}

/** Configuration options for the useFormAutosave hook */
interface UseFormAutosaveProps<T> {
  /** The form data to be saved */
  data: T;
  /** Async function that performs the actual save operation */
  onSave: (data: T) => Promise<void>;
  /** Debounce delay in milliseconds before saving (default: 1000ms) */
  debounceMs?: number;
  /** Whether autosave is enabled (default: true) */
  enabled?: boolean;
}

export function useFormAutosave<T>({
  data,
  onSave,
  debounceMs = 1000,
  enabled = true,
}: UseFormAutosaveProps<T>) {
  // Track save operation state
  const [state, setState] = useState<AutosaveState>({
    status: "idle",
    lastSaved: null,
    error: null,
  });

  // Key used for local storage backup
  const STORAGE_KEY = "qrd_form_backup";

  // Debounce data changes to prevent rapid consecutive saves
  const debouncedData = useDebounce(data, debounceMs);

  /**
   * Immediately backup form data to local storage on every change
   * This provides a safety net in case of browser crashes or connection issues
   */
  useEffect(() => {
    if (enabled) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            data,
            timestamp: new Date().toISOString(),
          })
        );
      } catch (error) {
        console.error("Failed to save to local storage:", error);
      }
    }
  }, [data, enabled]);

  /**
   * Main save function that handles the save operation, status updates,
   * and success/error feedback
   */
  const saveData = useCallback(
    async (dataToSave: T) => {
      if (!enabled) return;

      setState((prev) => ({ ...prev, status: "saving" }));

      try {
        await onSave(dataToSave);
        setState({
          status: "saved",
          lastSaved: new Date(),
          error: null,
        });

        // Play success sound feedback (volume reduced to be less intrusive)
        const audio = new Audio("/sounds/save-success.mp3");
        audio.volume = 0.2;
        await audio.play().catch(() => {}); // Ignore autoplay blocking errors
      } catch (error) {
        setState({
          status: "error",
          lastSaved: null,
          error: error as Error,
        });
        console.error("Autosave failed:", error);
      }
    },
    [onSave, enabled]
  );

  /**
   * Trigger save operation when debounced data changes
   */
  useEffect(() => {
    if (debouncedData) {
      saveData(debouncedData);
    }
  }, [debouncedData, saveData]);

  /**
   * Utility function to recover the last saved data from local storage
   * Returns the saved data and timestamp if available, null otherwise
   */
  const recoverFromLocalStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { data: savedData, timestamp } = JSON.parse(saved);
        return { savedData, timestamp: new Date(timestamp) };
      }
    } catch (error) {
      console.error("Failed to recover from local storage:", error);
    }
    return null;
  }, []);

  return {
    saveStatus: state.status,
    lastSaved: state.lastSaved,
    error: state.error,
    recoverFromLocalStorage,
  };
}
