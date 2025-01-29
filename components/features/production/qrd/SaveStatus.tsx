/**
 * SaveStatus.tsx
 *
 * This component displays a status indicator for form auto-saving functionality.
 * It shows different states (saving, saved, error) with animations and icons.
 *
 * Props:
 * - status: Current save status ('idle' | 'saving' | 'saved' | 'error')
 * - lastSaved: Timestamp of last successful save
 * - className: Optional CSS classes
 *
 * Features:
 * - Animated transitions between states using Framer Motion
 * - Status-specific styling and icons
 * - Relative time display for last save
 * - Fixed positioning in bottom-right corner
 */

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { SaveStatus } from "./hooks/useFormAutosave";
import { cn } from "@/lib/utils";

interface SaveStatusProps {
  status: SaveStatus;
  lastSaved: Date | null;
  className?: string;
}

export function SaveStatusIndicator({
  status,
  lastSaved,
  className,
}: SaveStatusProps) {
  return (
    <motion.div
      className={cn(
        "fixed bottom-4 right-4 flex items-center gap-2 rounded-lg px-4 py-2 text-sm",
        status === "saved" && "bg-green-500/10 text-green-500",
        status === "saving" && "bg-blue-500/10 text-blue-500",
        status === "error" && "bg-red-500/10 text-red-500",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <AnimatePresence mode="wait">
        {status === "saving" && (
          <motion.div
            key="saving"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 className="h-4 w-4 animate-spin" />
          </motion.div>
        )}
        {status === "saved" && (
          <motion.div
            key="saved"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <CheckCircle className="h-4 w-4" />
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <AlertCircle className="h-4 w-4" />
          </motion.div>
        )}
      </AnimatePresence>

      <span>
        {status === "saving" && "Saving..."}
        {status === "saved" &&
          `Saved ${
            lastSaved
              ? new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
                  -Math.round((Date.now() - lastSaved.getTime()) / 1000 / 60),
                  "minutes"
                )
              : ""
          }`}
        {status === "error" && "Failed to save"}
      </span>
    </motion.div>
  );
}
