/**
 * Order Creation Page Component
 *
 * Handles the creation of new inventory orders through a form interface.
 * Once an order is created successfully, displays a barcode label for printing.
 *
 * Flow:
 * 1. Shows order creation form initially
 * 2. On successful submission, hides form and shows barcode
 * 3. Handles API communication with /api/inventory/orders endpoint
 */

"use client";

import { useState } from "react";
import BarcodeLabel from "@/components/home/Barcode";
import { OrderPostResponse } from "@/types/database/orders";
import { CreateForm } from "@/components/features/inventory/CreateForm";

// Form values match the expected POST request body shape
interface FormValues {
  material: string;
  supplier: string;
  quantity: number;
}

function OrderCreationPage() {
  const [orderData, setOrderData] = useState<OrderPostResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreateOrder = async (formValues: FormValues) => {
    try {
      setError(null);
      const res = await fetch("/api/inventory/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      if (data.success) {
        setOrderData(data.order);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Order creation failed:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-slate-700 p-8 rounded-md shadow-md">
        <CreateForm onOrderCreated={handleCreateOrder} orderData={orderData} />
      </div>

      {orderData && (
        <div className="bg-slate-800 text-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            Order Created Successfully
          </h2>
          <BarcodeLabel
            orderId={orderData.order_id}
            material={orderData.material}
            supplier={orderData.supplier}
          />
        </div>
      )}
    </div>
  );
}

export default OrderCreationPage;
