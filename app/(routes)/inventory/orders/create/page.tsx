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
import { OrderFormData } from "@/types/database/inventory/orders";
import { CreateForm } from "@/components/features/inventory/CreateForm";
import { DrumLabel } from "@/components/features/barcodes/DrumLabel";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

// import { Form } from "@/components/shared/form";

// Form values match the expected POST request body shape
interface FormValues {
  material: string;
  supplier: string;
  quantity: number;
}

/**
 * OrderCreationPage component for handling the creation of new inventory orders.
 *
 * This component manages the state for order creation, including form submission,
 * error handling, and displaying the created order details with a barcode label.
 *
 * @returns {JSX.Element} The rendered OrderCreationPage component
 */
function OrderCreationPage() {
  // Change to array of orders instead of single order
  const [orders, setOrders] = useState<OrderFormData[]>([]);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles the creation of a new order by submitting form data to the API.
   *
   * @param {FormValues} formValues - The form values containing order details
   * @returns {Promise<void>}
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
        // Add new order to the beginning of the array
        setOrders((prevOrders) => [data.order, ...prevOrders]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Order creation failed:", err);
    }
  };

  /**
   * Sets the error state with the provided error message.
   *
   * @param {string} error - The error message to be set
   */
  const handleError = (error: string) => {
    setError(error);
  };

  return (
    <div className="min-h-screen flex">
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          ERROR: {error}
        </div>
      )}

      <div className="flex flex-1">
        {/* Left section - Order Form */}
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="w-full max-w-[500px]">
            <CreateForm onOrderCreated={handleCreateOrder} />
          </div>
        </div>

        {/* Right section - Always visible with bg-slate-700 */}
        <div className="flex-1 bg-slate-700 min-w-[500px]">
          <div className="h-full flex flex-col">
            <h2 className="text-2xl font-bold p-6 text-white border-b border-slate-600">
              Barcode Labels
            </h2>

            <div className="flex-1 p-6 overflow-auto">
              <div className="space-y-6">
                {orders.map((order, index) => (
                  <div
                    key={order.order_id}
                    className={cn(
                      "transition-all duration-500",
                      "opacity-0 translate-x-4",
                      "animate-[enter_0.5s_ease-out_forwards]"
                    )}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="bg-slate-800 rounded-lg shadow-xl overflow-hidden">
                      {/* Success Banner */}
                      <div className="bg-green-500/10 border-b border-green-500/20 px-8 py-4 flex items-center gap-3">
                        <CheckCircle2 className="text-green-500 w-6 h-6" />
                        <h3 className="text-lg font-semibold text-green-500">
                          Order Created Successfully
                        </h3>
                      </div>

                      {/* Order Details and Actions */}
                      <div className="p-8">
                        <DrumLabel order={order} onError={setError} />
                      </div>
                    </div>
                  </div>
                ))}

                {orders.length === 0 && (
                  <div className="text-center text-slate-400 py-12">
                    No orders created yet. Use the form to create a new order.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCreationPage;
