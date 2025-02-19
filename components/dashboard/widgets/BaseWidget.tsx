"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface BaseWidgetProps {
  title: string;
  className?: string;
  isFavorited?: boolean;
  onToggleFavorite?: () => void;
  children: React.ReactNode;
}

export function BaseWidget({
  title,
  className,
  isFavorited = false,
  onToggleFavorite,
  children,
}: BaseWidgetProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between p-6 pb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {onToggleFavorite && (
          <button
            onClick={onToggleFavorite}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Star
              className={cn(
                "h-5 w-5",
                isFavorited && "fill-current text-primary"
              )}
            />
            <span className="sr-only">
              {isFavorited ? "Remove from favorites" : "Add to favorites"}
            </span>
          </button>
        )}
      </div>
      <div className="p-6 pt-0">{children}</div>
    </div>
  );
}
