"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Order {
  order_id: number;
  supplier: string;
  material: string;
  quantity: number;
}

export default function ActiveOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch from an API route that returns "pending" orders
    fetch("/api/inventory/orders/active")
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => setOrders(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Pending Orders</h2>
      {error && <p className="text-red-400 text-sm">{error}</p>}

      <ul className="space-y-3">
        {orders.map((order) => (
          <li
            key={order.order_id}
            className="bg-gray-700 p-3 rounded flex items-center justify-between"
          >
            {/* This grid has 4 columns defined but only 2 divs, so the last 2 columns will be empty */}
            <div className="grid grid-cols-[1fr_3fr_1fr_1fr]">
              {/* This div takes up the first column */}
              <div className="flex items-center justify-center italic text-lg text-gray-400">
                #{order.order_id}
              </div>
              {/* This div takes up the second column */}
              <div className="flex flex-col items-center justify-center font-medium">
                <div className="font-bold">{order.material}</div>
                <div>{order.supplier}</div>
              </div>
              {/* The third and fourth columns are empty since no divs are defined for them */}
            </div>

            {/* CTA button → order page (later we can add modal logic) */}
            <Link href="/inventory/orders" className="ml-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">
                View
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
