"use client";

import { BaseWidget } from "./BaseWidget";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Props for individual stat items displayed in the StatsWidget
 */
interface StatItemProps {
  /** Label text displayed above the value */
  label: string;
  /** Main value to display */
  value: string | number;
  /** Percentage change (optional) */
  change?: number;
  /** Label for what the change is compared against (optional) */
  changeLabel?: string;
}

/**
 * Displays a single statistic with optional change indicator
 */
function StatItem({ label, value, change, changeLabel }: StatItemProps) {
  const isPositive = change && change > 0;
  const changeText = change ? `${isPositive ? "+" : ""}${change}%` : null;

  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2">
        <p className="text-2xl font-semibold">{value}</p>
        {changeText && (
          <div
            className={cn(
              "flex items-center text-sm",
              isPositive ? "text-green-500" : "text-red-500"
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}
            <span>{changeText}</span>
            {changeLabel && (
              <span className="text-muted-foreground ml-1">
                vs {changeLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface StatsWidgetProps {
  id: string;
}

/**
 * A widget that displays key business metrics in a grid layout
 *
 * Each metric shows:
 * - A label
 * - Current value
 * - Change percentage (if provided)
 * - Comparison period (if provided)
 *
 * The metrics are displayed in a responsive grid that adjusts based on screen size.
 * Change indicators use green/red colors and up/down arrows to show positive/negative changes.
 */
export function StatsWidget({ id }: StatsWidgetProps) {
  // Mock data - would typically come from an API or database
  const stats = [
    {
      label: "Total Orders",
      value: "1,234",
      change: 12,
      changeLabel: "last month",
    },
    {
      label: "Active Processes",
      value: "45",
      change: -5,
      changeLabel: "last week",
    },
    {
      label: "Inventory Items",
      value: "892",
      change: 3,
      changeLabel: "last month",
    },
  ];

  return (
    <BaseWidget id={id} title="Key Metrics" className="col-span-full">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>
    </BaseWidget>
  );
}
