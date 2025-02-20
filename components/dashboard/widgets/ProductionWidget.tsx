"use client";

import { BaseWidget } from "./BaseWidget";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Represents a production activity item with status, description and timing
 */
interface ActivityItem {
  /** Unique identifier for the activity */
  id: string;
  /** Current status of the activity */
  status: "completed" | "in-progress" | "attention";
  /** Description of what the activity entails */
  description: string;
  /** Human readable time information */
  time: string;
}

/**
 * Mock production activity data
 * In a real app, this would come from an API/database
 */
const activities: ActivityItem[] = [
  {
    id: "1",
    status: "completed",
    description: "Batch #A123 completed processing",
    time: "2h ago",
  },
  {
    id: "2",
    status: "in-progress",
    description: "Batch #B456 in distillation",
    time: "4h remaining",
  },
  {
    id: "3",
    status: "attention",
    description: "Batch #C789 requires quality check",
    time: "10m ago",
  },
];

/**
 * Renders an appropriate icon based on activity status
 */
function ActivityIcon({ status }: { status: ActivityItem["status"] }) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "in-progress":
      return <Clock className="h-5 w-5 text-blue-500" />;
    case "attention":
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
  }
}

interface ProductionWidgetProps {
  id: string;
}

/**
 * Production status widget that displays:
 * - Summary metrics for active and completed batches
 * - Recent activity feed showing batch status updates
 *
 * Activities are color coded by status:
 * - Green: Completed
 * - Blue: In Progress
 * - Yellow: Needs Attention
 */
export function ProductionWidget({ id }: ProductionWidgetProps) {
  return (
    <BaseWidget id={id} title="Production Status">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Active Batches</p>
            <p className="text-2xl font-semibold">8</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completed Today</p>
            <p className="text-2xl font-semibold">5</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Recent Activity</h4>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 text-sm">
                <ActivityIcon status={activity.status} />
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseWidget>
  );
}
