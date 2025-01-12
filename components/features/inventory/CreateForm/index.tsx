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
    <>
      <h1>Create Order</h1>
      {/* ... form UI for creating the order ... */}
      <p>Material</p>
      <input
        placeholder="Material"
        type="text"
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
      />
      <p>Supplier</p>
      <input
        placeholder="Supplier"
        type="text"
        value={supplier}
        onChange={(e) => setSupplier(e.target.value)}
      />
      <p>Quantity</p>
      <input
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button
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

      {orderData && (
        <BarcodeLabel
          orderId={orderData.order_id}
          material={orderData.material}
          supplier={orderData.supplier}
        />
      )}
    </>
  );
};
