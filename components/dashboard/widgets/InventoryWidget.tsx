"use client";

import { BaseWidget } from "./BaseWidget";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// This would come from your API/database
const data = [
  { name: "Mon", value: 40 },
  { name: "Tue", value: 30 },
  { name: "Wed", value: 45 },
  { name: "Thu", value: 25 },
  { name: "Fri", value: 55 },
];

export function InventoryWidget() {
  return (
    <BaseWidget title="Inventory Overview">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Stock</p>
            <p className="text-2xl font-semibold">2,345</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Low Stock Items</p>
            <p className="text-2xl font-semibold text-yellow-500">12</p>
          </div>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="name"
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
              <Tooltip />
              <Bar
                dataKey="value"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </BaseWidget>
  );
}
