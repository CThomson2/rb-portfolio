import { useEffect, useState } from "react";
import { BaseWidget } from "./BaseWidget";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Separator } from "@/components/ui/Separator";
import { cn } from "@/lib/utils";

interface InventoryData {
  totalStock: number;
  lowStockCount: number;
  weeklyStockChanges: Array<{
    day: string;
    net_change: number;
  }>;
  topMaterials: Array<{
    material: string;
    count: number;
  }>;
}

interface InventoryWidgetProps {
  id: string;
}

export function InventoryWidget({ id }: InventoryWidgetProps) {
  const [inventoryData, setInventoryData] = useState<InventoryData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    async function fetchInventoryData() {
      try {
        const response = await fetch("/api/inventory/overview");
        if (!response.ok) {
          throw new Error("Failed to fetch inventory data");
        }
        const data = await response.json();
        setInventoryData(data);
      } catch (error) {
        setFetchError(
          error instanceof Error ? error.message : "An error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchInventoryData();
  }, []);

  if (isLoading) {
    return (
      <BaseWidget id={id} title="Inventory Overview">
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading inventory data...</p>
        </div>
      </BaseWidget>
    );
  }

  if (fetchError) {
    return (
      <BaseWidget id={id} title="Inventory Overview">
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-red-500">{fetchError}</p>
        </div>
      </BaseWidget>
    );
  }

  if (!inventoryData) return null;

  const displayedMaterials = isExpanded
    ? inventoryData.topMaterials
    : inventoryData.topMaterials.slice(0, 5);

  return (
    <BaseWidget id={id} title="Inventory Overview">
      <div className="space-y-6">
        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Stock</p>
            <p className="text-2xl font-semibold">{inventoryData.totalStock}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Low Stock Items</p>
            <p className="text-2xl font-semibold text-yellow-500">
              {inventoryData.lowStockCount}
            </p>
          </div>
        </div>

        {/* Weekly stock changes chart */}
        <div>
          <h4 className="text-sm font-medium mb-3">Weekly Stock Changes</h4>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData.weeklyStockChanges}>
                <XAxis
                  dataKey="day"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card p-2 border rounded-lg shadow-sm">
                          <p className="font-medium">{data.day}</p>
                          <p className="text-sm text-muted-foreground">
                            Net change: {data.net_change}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="net_change"
                  fill="currentColor"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Top materials list */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium">Top Materials</h4>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {isExpanded ? (
                <>
                  Show less
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show all
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
          <div
            className={cn(
              "space-y-2 transition-all",
              isExpanded ? "max-h-[500px]" : "max-h-[250px]"
            )}
          >
            {displayedMaterials.map((material, index) => (
              <div
                key={material.material}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <span className="text-sm">
                  {index + 1}. {material.material}
                </span>
                <span className="text-sm font-medium">{material.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseWidget>
  );
}
