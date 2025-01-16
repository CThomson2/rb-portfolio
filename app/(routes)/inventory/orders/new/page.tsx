/**
 * Order Creation Page Component
 *
 * This client-side component handles the creation of new inventory orders and generates
 * barcode labels for the created drums.
 *
 * Key Features:
 * - Form for creating new orders with material, supplier, quantity and optional batch code
 * - Automatic barcode generation for each drum in the order
 * - Error handling and success feedback
 *
 * Flow:
 * 1. User fills out order creation form with required fields
 * 2. Form submission creates order via POST to /api/inventory/orders
 * 3. On success, displays order confirmation and barcode label generator
 * 4. User can generate PDF barcodes for the created drums
 *
 * @component
 * @requires OrderFormData - Type defining the shape of order data from database
 * @requires OrderPostResponse - Type for successful order creation API response
 * @requires DrumLabel - Component for generating drum barcode labels
 * @requires CustomForm - Reusable form component with validation
 */

"use client";

import { useState } from "react";
import { OrderFormData, OrderPostResponse } from "@/types/database/orders";
import { DrumLabel } from "@/components/features/barcodes/DrumLabel";
import { CustomForm } from "@/components/shared/form/CustomForm";
import { FormFields } from "@/types/content/form";

/**
 * Interface defining the expected form input values
 * Maps to the request body shape expected by the orders API
 */
interface FormValues {
  material: string;
  supplier: string;
  quantity: number;
}

function OrderCreationPage() {
  // State for storing the created order data after successful submission
  const [orderData, setOrderData] = useState<OrderFormData | null>(null);
  // State for error handling and display
  const [error, setError] = useState<string | null>(null);
  // State for toggling batch code input field
  const [batchEnabled, setBatchEnabled] = useState(false);

  /**
   * Handles the order creation process by making a POST request to the API
   * Updates local state based on API response
   *
   * @param formValues - The form data to submit {material, supplier, quantity}
   */
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

  /**
   * Error handler for DrumLabel component
   * @param error - Error message from barcode generation
   */
  const handleError = (error: string) => {
    setError(error);
  };

  /**
   * Toggles the batch code input field enabled/disabled state
   */
  const handleBatchToggle = () => {
    setBatchEnabled(!batchEnabled);
  };

  /**
   * Form field definitions for CustomForm component
   * Defines validation rules and input types for each field
   */
  const fields: FormFields[] = [
    {
      name: "material",
      label: "Material",
      type: "text",
      placeholder: "Material",
      required: true,
    },
    {
      name: "supplier",
      label: "Supplier",
      type: "text",
      placeholder: "Supplier",
      required: true,
    },
    {
      name: "quantity",
      label: "Quantity of Drums",
      type: "number",
      placeholder: "Quantity of Drums",
      required: true,
      min: 1,
    },
    {
      name: "batchCode",
      label: "Batch Code",
      type: "text",
      placeholder: "Batch code",
      required: false,
      disabled: !batchEnabled,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          ERROR: {error}
        </div>
      )}

      <div className="bg-slate-700 p-8 rounded-md shadow-md">
        <CustomForm
          title="Create Order"
          endpoint="/api/inventory/orders"
          method="POST"
          fields={fields}
          onSuccess={(data: OrderPostResponse) => {
            setOrderData(data);
          }}
          onError={handleError}
        />
      </div>

      {orderData && (
        <div className="bg-slate-800 text-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            Order #{orderData.order_id} Created Successfully
          </h2>
          <DrumLabel order={orderData} onError={setError} />
        </div>
      )}
    </div>
  );
}

export default OrderCreationPage;
