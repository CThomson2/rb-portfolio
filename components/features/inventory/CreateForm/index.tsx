"use client";

import BarcodeLabel from "@/components/home/Barcode";
import { OrderPostParams, OrderPostResponse } from "@/types/database/orders";
import React, { useState } from "react";

export const CreateForm = ({
  onOrderCreated,
  orderData,
}: {
  onOrderCreated: (order: OrderPostParams) => void;
  orderData: OrderPostResponse | null;
}) => {
  const [material, setMaterial] =
    useState<OrderPostParams["material"]>("Material");
  const [supplier, setSupplier] =
    useState<OrderPostParams["supplier"]>("Supplier");
  const [quantity, setQuantity] = useState<OrderPostParams["quantity"]>(0);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-white">Create Order</h1>
      <div className="space-y-2">
        <label className="block text-white">Material</label>
        <input
          className="w-full p-2 rounded-md bg-slate-600 text-white"
          placeholder="Material"
          type="text"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="block text-white">Supplier</label>
        <input
          className="w-full p-2 rounded-md bg-slate-600 text-white"
          placeholder="Supplier"
          type="text"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="block text-white">Quantity</label>
        <input
          className="w-full p-2 rounded-md bg-slate-600 text-white"
          placeholder="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() =>
          onOrderCreated({
            material,
            supplier,
            quantity,
          })
        }
      >
        Submit Order
      </button>
    </div>
  );
};
