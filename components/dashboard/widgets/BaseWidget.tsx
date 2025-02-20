"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboard } from "../context/DashboardContext";

/**
 * Props for the BaseWidget component.
 * @property {string} id - Unique identifier for the widget.
 * @property {string} title - Title of the widget.
 * @property {string} [className] - Optional additional class names for styling.
 * @property {React.ReactNode} children - Child components or elements to be rendered inside the widget.
 */
interface BaseWidgetProps {
  id: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * BaseWidget component provides a styled container with a title and optional favorite toggle functionality.
 *
 * @param {BaseWidgetProps} props - The properties for the BaseWidget component.
 * @returns {JSX.Element} The rendered BaseWidget component.
 */
export function BaseWidget({
  id,
  title,
  className,
  children,
}: BaseWidgetProps): JSX.Element {
  const { toggleFavorite, isFavorited } = useDashboard();
  const favorited = isFavorited(id);

  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground",
        "bg-gradient-to-b from-slate-950/10 to-slate-950/20",
        "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        "backdrop-blur-[2px]",
        "hover:shadow-[0_8px_30px_rgb(0,0,0,0.15)]",
        "transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center justify-between p-4 pb-2 bg-slate-950/5">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={() => toggleFavorite(id)}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Star
            className={cn("h-5 w-5", favorited && "fill-current text-primary")}
          />
          <span className="sr-only">
            {favorited ? "Remove from favorites" : "Add to favorites"}
          </span>
        </button>
      </div>
      <div className="p-4 pt-0">{children}</div>
    </div>
  );
}
