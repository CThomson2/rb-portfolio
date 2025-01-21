"use client";

import { OrderPostParams } from "@/types/database/orders";
import React, { useState, useRef, KeyboardEvent } from "react";
import styles from "./form.module.css";
import { cn } from "@/lib/utils";

export const CreateForm = ({
  onOrderCreated,
}: {
  onOrderCreated: (order: OrderPostParams) => void;
}) => {
  const [material, setMaterial] = useState<OrderPostParams["material"]>("");
  const [supplier, setSupplier] = useState<OrderPostParams["supplier"]>("");
  const [quantity, setQuantity] = useState<OrderPostParams["quantity"]>(0);
  const [batchCode, setBatchCode] = useState<string>("");
  const [activeField, setActiveField] = useState<{
    material: boolean;
    supplier: boolean;
    quantity: boolean;
    batchCode: boolean;
  }>({ material: true, supplier: false, quantity: false, batchCode: false });

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, field: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      switch (field) {
        case "material":
          if (material.trim()) {
            setActiveField((prev) => ({ ...prev, supplier: true }));
          }
          break;
        case "supplier":
          if (supplier.trim()) {
            setActiveField((prev) => ({ ...prev, quantity: true }));
          }
          break;
        case "quantity":
          if (quantity > 0) {
            setActiveField((prev) => ({ ...prev, batchCode: true }));
          }
          break;
        case "batchCode":
          handleSubmit();
          break;
      }
    }
  };

  const handleBlur = (field: string) => {
    switch (field) {
      case "material":
        if (material.trim()) {
          setActiveField((prev) => ({ ...prev, supplier: true }));
        }
        break;
      case "supplier":
        if (supplier.trim()) {
          setActiveField((prev) => ({ ...prev, quantity: true }));
        }
        break;
      case "quantity":
        if (quantity > 0) {
          setActiveField((prev) => ({ ...prev, batchCode: true }));
        }
        break;
    }
  };

  const handleSubmit = () => {
    if (material && supplier && quantity > 0) {
      onOrderCreated({
        material,
        supplier,
        quantity,
        ...(batchCode && { batchCode }),
      });
    }
  };

  return (
    <div className={styles["form-container"]}>
      <div className={styles["form"]}>
        <h1 className={styles["title"]}>Create Order</h1>

        <div className={cn(styles["form-field-container"])}>
          <label className={styles["label"]}>Material</label>
          <input
            className={cn(styles["input"], material && styles["input-filled"])}
            placeholder="Enter material name"
            type="text"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "material")}
            onBlur={() => handleBlur("material")}
          />
        </div>

        <div className={cn(styles["form-field-container"])}>
          <label className={styles["label"]}>Supplier</label>
          <input
            className={cn(styles["input"], supplier && styles["input-filled"])}
            placeholder="Enter supplier name"
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "supplier")}
            onBlur={() => handleBlur("supplier")}
            disabled={!activeField.supplier}
          />
        </div>

        <div className={cn(styles["form-field-container"])}>
          <label className={styles["label"]}>Quantity</label>
          <input
            className={cn(
              styles["input"],
              quantity > 0 && styles["input-filled"]
            )}
            placeholder="Enter quantity"
            type="number"
            value={quantity || ""}
            onChange={(e) => setQuantity(Number(e.target.value))}
            onKeyDown={(e) => handleKeyDown(e, "quantity")}
            onBlur={() => handleBlur("quantity")}
            disabled={!activeField.quantity}
            min="1"
          />
        </div>

        <div className={cn(styles["form-field-container"])}>
          <label className={styles["label"]}>Batch Code (Optional)</label>
          <input
            className={cn(styles["input"], batchCode && styles["input-filled"])}
            placeholder="Enter batch code"
            type="text"
            value={batchCode}
            onChange={(e) => setBatchCode(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "batchCode")}
            disabled={!activeField.batchCode}
          />
        </div>

        <button
          className={cn(styles["button"])}
          onClick={handleSubmit}
          disabled={!material || !supplier || quantity <= 0}
        >
          Submit Order
        </button>
      </div>
    </div>
  );
};
