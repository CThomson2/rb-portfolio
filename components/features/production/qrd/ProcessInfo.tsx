"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Beaker, CheckCircle2, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
// Temporarily comment out autosave imports
// import { useFormAutosave } from "./hooks/useFormAutosave";
// import { SaveStatusIndicator } from "./SaveStatus";

interface ProcessOrder {
  id: string;
  targetVolume: number;
  grade: string;
  actualVolume?: number;
  startTime?: string;
  endTime?: string;
  temperature?: number;
  notes?: string;
  isComplete: boolean;
}

interface ProcessInfoProps {
  onComplete: (data: any) => void;
  initialData?: any;
}

export function ProcessInfo({ onComplete, initialData }: ProcessInfoProps) {
  const [orders, setOrders] = useState<ProcessOrder[]>([]);
  const [totalProcessed, setTotalProcessed] = useState(0);
  const [backgroundSaturation, setBackgroundSaturation] = useState(0);

  // Temporarily comment out autosave setup
  // const { saveStatus, lastSaved } = useFormAutosave({
  //   data: orders,
  //   onSave: async (data) => {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //   },
  // });

  // Calculate completion percentage for visual effects
  const completionPercentage =
    orders.length > 0
      ? (orders.filter((o) => o.isComplete).length / orders.length) * 100
      : 0;

  // Update background saturation based on completion
  const updateVisualFeedback = useCallback(() => {
    setBackgroundSaturation(completionPercentage);
    // Update parent background image via CSS custom property
    document.documentElement.style.setProperty(
      "--process-completion",
      `${completionPercentage}%`
    );
  }, [completionPercentage]);

  const addNewOrder = () => {
    const newOrder: ProcessOrder = {
      id: Date.now().toString(),
      targetVolume: 0,
      grade: "",
      isComplete: false,
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  const updateOrder = (id: string, data: Partial<ProcessOrder>) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, ...data } : order))
    );
  };

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header with total volume tracker */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Process Information</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400">
            Total Processed: {totalProcessed}L
          </div>
          <button
            onClick={addNewOrder}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Order
          </button>
        </div>
      </div>

      {/* Order cards */}
      <div className="flex-1 overflow-auto space-y-4 pr-4 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className={cn(
                "p-6 rounded-lg backdrop-blur-sm transition-all",
                order.isComplete
                  ? "bg-green-500/10 border-green-500/20"
                  : "bg-gray-900/50 border-gray-800",
                "border"
              )}
            >
              <div className="grid grid-cols-2 gap-6">
                {/* Left column - Basic info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Beaker className="w-5 h-5 text-blue-400" />
                    <input
                      type="number"
                      placeholder="Target Volume (L)"
                      className="bg-gray-800/50 rounded px-3 py-2 w-full"
                      value={order.targetVolume || ""}
                      onChange={(e) =>
                        updateOrder(order.id, {
                          targetVolume: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                  <input
                    placeholder="Grade"
                    className="bg-gray-800/50 rounded px-3 py-2 w-full"
                    value={order.grade}
                    onChange={(e) =>
                      updateOrder(order.id, {
                        grade: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Right column - Process details */}
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-gray-400" />
                      <input
                        type="time"
                        className="bg-gray-800/50 rounded px-3 py-2"
                        value={order.startTime || ""}
                        onChange={(e) =>
                          updateOrder(order.id, {
                            startTime: e.target.value,
                          })
                        }
                      />
                    </div>
                    <input
                      type="number"
                      placeholder="Temperature °C"
                      className="bg-gray-800/50 rounded px-3 py-2 w-full"
                      value={order.temperature || ""}
                      onChange={(e) =>
                        updateOrder(order.id, {
                          temperature: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                  <textarea
                    placeholder="Process notes..."
                    className="bg-gray-800/50 rounded px-3 py-2 w-full h-20 resize-none"
                    value={order.notes || ""}
                    onChange={(e) =>
                      updateOrder(order.id, {
                        notes: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Complete button */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    updateOrder(order.id, { isComplete: !order.isComplete });
                    // Play completion sound
                    const audio = new Audio("/sounds/complete.mp3");
                    audio.volume = 0.2;
                    audio.play().catch(() => {});
                  }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded transition-all",
                    order.isComplete
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  )}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {order.isComplete ? "Completed" : "Mark Complete"}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Temporarily remove save status indicator */}
      {/* <SaveStatusIndicator status={saveStatus} lastSaved={lastSaved} /> */}
    </div>
  );
}
