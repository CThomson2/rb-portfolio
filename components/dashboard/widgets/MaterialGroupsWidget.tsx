import { useEffect, useState } from "react";
import { BaseWidget } from "./BaseWidget";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface MaterialGroupsWidgetProps {
  id: string;
}

interface Material {
  name: string;
  stock: number;
  cas_number: string;
}

interface GroupData {
  chemical_group: string;
  total_stock: number;
  material_count: number;
  percentage: string;
  materials: Material[];
}

interface GroupsResponse {
  groups: GroupData[];
  totalStock: number;
}

// Color palette for pie chart segments
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#A4DE6C",
  "#D0ED57",
];

/**
 * MaterialGroupsWidget component fetches and displays material groups data.
 * It shows a pie chart and detailed information about each group.
 */
export function MaterialGroupsWidget({ id }: MaterialGroupsWidgetProps) {
  const [data, setData] = useState<GroupsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/inventory/materials/groups");
        if (!response.ok) {
          throw new Error("Failed to fetch material groups data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-4 w-[200px]" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-[300px]" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Material Groups</CardTitle>
        </CardHeader>
        <CardContent>
          {/* The Alert component is used to display error messages in a visually distinct manner. 
              The 'destructive' variant indicates a critical issue, such as a failed data fetch. */}
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.groups.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Material Groups</CardTitle>
        </CardHeader>
        <CardContent>
          {/* The Alert component here is used to inform the user that no data is available. 
              It provides a non-critical notification to the user. */}
          <Alert>
            <AlertDescription>
              No material groups data available.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const content = (
    // <Card>
    <CardContent className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-[400px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.groups}
                dataKey="total_stock"
                nameKey="chemical_group"
                cx="50%"
                cy="50%"
                outerRadius={160}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  percentage,
                  chemical_group,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius =
                    innerRadius + (outerRadius - innerRadius) * 1.6;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#888888"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                      className="text-sm font-medium"
                    >
                      {chemical_group} ({percentage}%)
                    </text>
                  );
                }}
              >
                {data.groups.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as GroupData;
                    return (
                      <div className="bg-card p-3 border rounded-lg shadow-lg">
                        <p className="font-medium text-base">
                          {data.chemical_group}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {data.total_stock} drums ({data.percentage}%)
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {data.material_count} materials
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Group Details */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {data.groups.map((group, index) => (
            <div
              key={group.chemical_group}
              className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <h4 className="font-medium text-base">
                  {group.chemical_group}
                </h4>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">
                  {group.total_stock} drums ({group.percentage}%)
                </p>
                <p>{group.material_count} unique materials</p>
                <details className="group">
                  <summary className="cursor-pointer hover:text-foreground transition-colors">
                    View materials
                  </summary>
                  <ul className="mt-2 space-y-1.5 pl-4">
                    {group.materials
                      .sort((a, b) => b.stock - a.stock)
                      .map((material) => (
                        <li
                          key={material.cas_number}
                          className="flex justify-between items-center hover:text-foreground transition-colors"
                        >
                          <span>{material.name}</span>
                          <span className="font-medium">{material.stock}</span>
                        </li>
                      ))}
                  </ul>
                </details>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
    // </Card>
  );

  return (
    <BaseWidget id={id} title="Material Groups" className="col-span-2">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Distribution of {data?.totalStock || 0} drums across chemical groups
        </p>
        {content}
      </div>
    </BaseWidget>
  );
}
