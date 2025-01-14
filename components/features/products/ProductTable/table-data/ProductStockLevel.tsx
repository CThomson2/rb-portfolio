import { StockLevel, StockLevelType } from "@/types/enums/products";

const stockLevelBackgroundColors = {
  [StockLevel.LOW_STOCK]: "bg-red-100",
  [StockLevel.IN_STOCK]: "bg-yellow-100",
  [StockLevel.SURPLUS]: "bg-green-100",
};

const stockLevelTextColors = {
  [StockLevel.LOW_STOCK]: "text-red-600",
  [StockLevel.IN_STOCK]: "text-yellow-600",
  [StockLevel.SURPLUS]: "text-green-600",
};

const stockLevelDotBackgroundColors = {
  [StockLevel.LOW_STOCK]: "bg-red-600",
  [StockLevel.IN_STOCK]: "bg-yellow-600",
  [StockLevel.SURPLUS]: "bg-green-600",
};

const stockLevelLabels = {
  [StockLevel.LOW_STOCK]: "Low Stock",
  [StockLevel.IN_STOCK]: "In Stock",
  [StockLevel.SURPLUS]: "Surplus",
};

const ProductStockLevel = ({ stockLevel }: { stockLevel: StockLevelType }) => {
  return (
    <div
      className={`flex items-center justify-center w-fit h-6 px-3 gap-2 rounded-sm text-sm font-normal ${stockLevelBackgroundColors[stockLevel]} ${stockLevelTextColors[stockLevel]}`}
    >
      <div
        className={`w-2 h-2 rounded-[2px] ${stockLevelDotBackgroundColors[stockLevel]}`}
      />
      {stockLevelLabels[stockLevel]}
    </div>
  );
};

export default ProductStockLevel;
