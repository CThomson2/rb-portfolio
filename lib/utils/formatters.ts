// Converts a hex color code (e.g. #FF0000) to RGB format (e.g. 255, 0, 0)
// The regex pattern matches:
// ^#? - Optional # at start
// ([a-f\d]{2}) - Captures 2 characters that are either a-f or digits (red)
// ([a-f\d]{2}) - Captures 2 characters that are either a-f or digits (green)
// ([a-f\d]{2}) - Captures 2 characters that are either a-f or digits (blue)
// Each captured pair is converted from base 16 (hex) to decimal
export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : null;
}

// Helper function to format currency values
export function formatCurrency(amount: number) {
  if (amount >= 1000) {
    return `US$ ${(amount / 1000).toFixed(1)}k`;
  }
  return `US$ ${amount}`;
}

type TxType =
  | "intake"
  | "scheduled"
  | "loaded"
  | "processed"
  | "requeued"
  | "failed"
  | "disposed"
  | "lost"
  | "cancelled";

export function getTxTypeColor(txType: TxType): string {
  const styles: Record<TxType, string> = {
    intake: "bg-emerald-100 text-emerald-800",
    scheduled: "bg-blue-100 text-blue-800",
    loaded: "bg-yellow-100 text-yellow-800",
    processed: "bg-green-100 text-green-800",
    requeued: "bg-gray-100 text-gray-800",
    failed: "bg-red-100 text-red-800",
    disposed: "bg-red-100 text-red-800",
    lost: "bg-red-100 text-red-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return styles[txType] || "bg-gray-100 text-gray-800";
}

// TODO: Add more variants
export function getTxTypeVariant(
  txType: TxType
): "default" | "secondary" | "outline" | "destructive" {
  switch (txType.toLowerCase()) {
    case "intake":
      return "default";
    case "scheduled":
      return "secondary";
    case "loaded":
      return "outline";
    case "processed":
      return "outline";
    case "requeued":
      return "destructive";
    case "failed":
      return "destructive";
    case "disposed":
      return "destructive";
    case "lost":
      return "destructive";
    case "cancelled":
      return "destructive";
    default:
      return "default";
  }
}

export function truncate(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
