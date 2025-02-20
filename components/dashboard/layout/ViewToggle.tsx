"use client";

import { Layout, Star } from "lucide-react";
import { useDashboard } from "../context/DashboardContext";
import { cn } from "@/lib/utils";

export function ViewToggle() {
  const { view, setView } = useDashboard();

  return (
    <div className="inline-flex rounded-lg border bg-card p-1">
      <button
        onClick={() => setView("all")}
        className={cn(
          "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
          view === "all" && "bg-accent text-accent-foreground"
        )}
      >
        <Layout className="mr-2 h-4 w-4" />
        All Widgets
      </button>
      <button
        onClick={() => setView("favorites")}
        className={cn(
          "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
          view === "favorites" && "bg-accent text-accent-foreground"
        )}
      >
        <Star className="mr-2 h-4 w-4" />
        Favorites
      </button>
    </div>
  );
}
