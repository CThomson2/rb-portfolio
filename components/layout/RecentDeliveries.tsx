"use client";

import React, { useEffect, useState } from "react";
import SidebarListItem from "./sidebar/SidebarListItem";

interface Delivery {
  delivery_id: number;
  date_received: string; // or Date
  // your other relevant fields, e.g. "order_id", "material" ...
}

export default function RecentDeliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/inventory/deliveries/recent")
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => setDeliveries(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Recent Deliveries</h2>
      {error && <p className="text-red-400 text-sm">{error}</p>}

      <ul className="space-y-3">
        {deliveries.map((delivery) => (
          <SidebarListItem
            key={delivery.delivery_id}
            id={delivery.delivery_id}
            isOrder={false}
          />
        ))}
      </ul>
    </div>
  );
}
