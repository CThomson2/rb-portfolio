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

type TxType = "import" | "processing" | "reprocessing" | "disposal" | "loss";

export function getTxTypeColor(txType: TxType): string {
  const styles: Record<TxType, string> = {
    import: "bg-emerald-100 text-emerald-800",
    processing: "bg-blue-100 text-blue-800",
    reprocessing: "bg-yellow-100 text-yellow-800",
    disposal: "bg-red-100 text-red-800",
    loss: "bg-gray-100 text-gray-800",
  };
  return styles[txType] || "bg-gray-100 text-gray-800";
}

export function getTxTypeVariant(
  txType: TxType
): "default" | "secondary" | "outline" {
  switch (txType.toLowerCase()) {
    case "import":
      return "default";
    case "processing":
      return "secondary";
    case "reprocessing":
      return "outline";
    default:
      return "default";
  }
}

export function truncate(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
