"use client";

import { OrderPostParams } from "@/types/database/inventory/orders";
import { useState, useEffect, useCallback, KeyboardEvent } from "react";
import styles from "./form.module.css";
import { cn } from "@/lib/utils";
// import { Combobox } from "@/components/ui/Combobox";
import { Dropdown } from "./Dropdown";
import { Loader2 } from "lucide-react";

export const CreateForm = ({
  onOrderCreated,
}: {
  onOrderCreated: (order: OrderPostParams) => void;
}) => {
  const [material, setMaterial] = useState<OrderPostParams["material"]>("");
  const [supplier, setSupplier] = useState<OrderPostParams["supplier"]>("");
  const [quantity, setQuantity] = useState<OrderPostParams["quantity"]>(0);
  const [poNumber, setPoNumber] = useState<string>("");
  const [materialSuggestions, setMaterialSuggestions] = useState<string[]>([]);
  const [supplierSuggestions, setSupplierSuggestions] = useState<string[]>([]);
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(false);
  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<{
    material: boolean;
    supplier: boolean;
    quantity: boolean;
    poNumber: boolean;
  }>({ material: true, supplier: false, quantity: false, poNumber: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Minimum characters required for search
  // const MIN_SEARCH_CHARS = 3;

  // Fetch initial PO number when component mounts
  useEffect(() => {
    const fetchNextPoNumber = async () => {
      try {
        const response = await fetch("/api/inventory/orders/next-po-number");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch PO number");
        }

        setPoNumber(data.poNumber);
      } catch (error) {
        console.error("Failed to fetch next PO number:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch PO number"
        );
      }
    };

    fetchNextPoNumber();
  }, []);

  const fetchMaterialSuggestions = async (query: string) => {
    console.log("Fetching material suggestions for:", query);
    setIsLoadingMaterials(true);

    try {
      const response = await fetch(
        `/api/inventory/materials/suggestions?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      console.log("API Response:", data);
      setMaterialSuggestions(
        Array.isArray(data.suggestions) ? data.suggestions : []
      );
    } catch (error) {
      console.error("Error:", error);
      setMaterialSuggestions([]);
    } finally {
      setIsLoadingMaterials(false);
    }
  };

  // Memoize fetchSupplierSuggestions
  const fetchSupplierSuggestions = useCallback(
    async (query: string) => {
      console.log("Fetching supplier suggestions for:", query);
      setIsLoadingSuppliers(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/inventory/suppliers/suggestions?q=${encodeURIComponent(
            query
          )}&material=${encodeURIComponent(material)}`
        );
        const data = await response.json();
        console.log("Suppliers API response:", data);

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch suggestions");
        }

        const suggestions = Array.isArray(data.suggestions)
          ? data.suggestions
          : [];
        console.log("Setting supplier suggestions:", suggestions);
        setSupplierSuggestions(suggestions);
      } catch (error) {
        console.error("Failed to fetch supplier suggestions:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch suggestions"
        );
        setSupplierSuggestions([]);
      } finally {
        setIsLoadingSuppliers(false);
      }
    },
    [material]
  );

  // Now it's safe to include in useEffect deps
  useEffect(() => {
    if (material) {
      fetchSupplierSuggestions("");
    }
  }, [material, fetchSupplierSuggestions]);

  const handleMaterialChange = (value: string) => {
    setMaterial(value);
    if (value.trim()) {
      setActiveField((prev) => ({ ...prev, supplier: true }));
    }
  };

  const handleSupplierChange = (value: string) => {
    setSupplier(value);
    if (value.trim()) {
      setActiveField((prev) => ({ ...prev, quantity: true }));
    }
  };

  /**
   * Handles keyboard events for form field navigation and submission.
   * When Enter is pressed, moves focus to the next field if current field is valid.
   * @param {KeyboardEvent<HTMLInputElement>} e - The keyboard event
   * @param {string} field - The current field name ('material', 'supplier', 'quantity', or 'poNumber')
   */
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
            setActiveField((prev) => ({ ...prev, poNumber: true }));
          }
          break;
        case "poNumber":
          handleSubmit();
          break;
      }
    }
  };

  /**
   * Handles blur events for form fields.
   * When a field loses focus, validates it and activates the next field if valid.
   * @param {string} field - The field that lost focus ('material', 'supplier', or 'quantity')
   */
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
          setActiveField((prev) => ({ ...prev, poNumber: true }));
        }
        break;
    }
  };

  const resetForm = useCallback(() => {
    setMaterial("");
    setSupplier("");
    setQuantity(0);
    setActiveField({
      material: true,
      supplier: false,
      quantity: false,
      poNumber: false,
    });
    // Don't reset PO number - it will be updated by the API
  }, []);

  /**
   * Handles form submission.
   * Validates required fields and calls onOrderCreated callback with form data if valid.
   */
  const handleSubmit = async () => {
    if (material && supplier && quantity > 0 && !isSubmitting) {
      setIsSubmitting(true);

      try {
        await onOrderCreated({
          material,
          supplier,
          quantity,
          po_number: poNumber.replace(/-/g, "") || null,
        });

        // Fetch new PO number for next order
        const response = await fetch("/api/inventory/orders/next-po-number");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch PO number");
        }

        setPoNumber(data.poNumber);
        resetForm();
      } catch (error) {
        console.error("Failed to create order:", error);
        setError(
          error instanceof Error ? error.message : "Failed to create order"
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={styles["form-container"]}>
      {error && (
        <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}
      <div className={styles["form"]}>
        <h1 className={styles["title"]}>Create Order</h1>

        <div className={cn(styles["form-field-container"])}>
          <label className={styles["label"]}>Material</label>
          <Dropdown
            value={material}
            onValueChange={handleMaterialChange}
            options={materialSuggestions}
            placeholder="Enter material name"
            onInputChange={fetchMaterialSuggestions}
            disabled={false}
            heading="Materials"
            emptyMessage={
              isLoadingMaterials ? "Loading..." : "No materials found."
            }
          />
        </div>

        <div className={cn(styles["form-field-container"])}>
          <label className={styles["label"]}>Supplier</label>
          <Dropdown
            value={supplier}
            onValueChange={handleSupplierChange}
            options={supplierSuggestions}
            placeholder="Enter supplier name"
            onInputChange={fetchSupplierSuggestions}
            disabled={!activeField.supplier}
            heading="Suppliers"
            emptyMessage={
              isLoadingSuppliers ? "Loading..." : "No suppliers found."
            }
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
          <label className={styles["label"]}>Purchase Order Number</label>
          <input
            className={cn(styles["input"], poNumber && styles["input-filled"])}
            placeholder="PO Format: YY-MM-DD-A-RS"
            type="text"
            value={poNumber}
            onChange={(e) => setPoNumber(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "poNumber")}
            disabled={!activeField.poNumber}
          />
        </div>

        <button
          className={cn(
            styles["button"],
            isSubmitting && "opacity-50 cursor-not-allowed"
          )}
          onClick={handleSubmit}
          disabled={!material || !supplier || quantity <= 0 || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Order...
            </>
          ) : (
            "Submit Order"
          )}
        </button>
      </div>
    </div>
  );
};
