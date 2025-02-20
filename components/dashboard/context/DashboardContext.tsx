"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type DashboardView = "all" | "favorites";

/**
 * Interface for the Dashboard context, providing state and functions
 * to manage the dashboard view and favorite widgets.
 */
interface DashboardContextType {
  /** Current view of the dashboard, either 'all' or 'favorites' */
  view: DashboardView;
  /** Function to set the current view of the dashboard */
  setView: (view: DashboardView) => void;
  /** List of favorite widget IDs */
  favorites: string[];
  /** Function to toggle a widget's favorite status */
  toggleFavorite: (widgetId: string) => void;
  /** Function to check if a widget is favorited */
  isFavorited: (widgetId: string) => boolean;
}

/** Context to provide dashboard state and actions */
const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

/**
 * Provider component for the Dashboard context, managing the state
 * of the dashboard view and favorite widgets.
 *
 * @param children - React children components
 */
export function DashboardProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<DashboardView>("all");
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Initialize favorites from localStorage if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dashboard-favorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem("dashboard-favorites", JSON.stringify(favorites));
  }, [favorites]);

  /**
   * Toggles the favorite status of a widget by its ID.
   *
   * @param widgetId - The ID of the widget to toggle
   */
  const toggleFavorite = (widgetId: string) => {
    setFavorites((current) =>
      current.includes(widgetId)
        ? current.filter((id) => id !== widgetId)
        : [...current, widgetId]
    );
  };

  /**
   * Checks if a widget is favorited.
   *
   * @param widgetId - The ID of the widget to check
   * @returns True if the widget is favorited, false otherwise
   */
  const isFavorited = (widgetId: string) => favorites.includes(widgetId);

  return (
    <DashboardContext.Provider
      value={{
        view,
        setView,
        favorites,
        toggleFavorite,
        isFavorited,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

/**
 * Custom hook to access the Dashboard context.
 *
 * @returns The Dashboard context value
 * @throws Error if used outside of a DashboardProvider
 */
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
