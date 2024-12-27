"use client";

import ProductModal from "./Modal";
import {
  TableBody as Body,
  TableHeader as Header,
  TableRow as Row,
  TableColumnHeader as ColumnHeader,
  TableCell as Cell,
  TableRoot as Root,
  Flex,
  Text,
  Button,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SearchBar } from "@/components/navbar/SearchBar";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { system } from "@/theme/theme";
// Define the type for table row objects
// This type includes all the fields that will be displayed in the table
// and any additional properties needed for table operations
import type { ProductRow, ProductPrice } from "../types";

const cellStyles = {
  px: "12px", // Padding
  py: "16px", // Padding for taller cells
  fontSize: "md", // Medium font size
  fontFamily: "body", // Default Chakra font family
  whiteSpace: "nowrap", // Prevent text wrapping
  textAlign: "left", // Align text to left
  // borderBottom: "0", // Subtle border
  borderColor: "gray.300",
};

const headerStyles = {
  ...cellStyles,
  bg: "gray.100", // Light grey background for header
  fontWeight: "bold", // Bold text
  fontSize: "lg", // Larger text for headers
  textTransform: "uppercase", // Capitalized text
  borderBottom: "2px solid", // Thicker border for headers
  borderColor: "gray.400",
  zIndex: 1, // Ensure header is in front
  position: "sticky", // Make it sticky
  top: 0, // Necessary for sticky headers
};

// Initialize the SearchTableOrders component
// This component renders a table with search and pagination features
export default function SearchTableOverview({
  tableData,
}: {
  tableData: ProductRow[];
}) {
  // const textColor = system.token("colors.navy.700");
  // const borderColor = system.token("colors.gray.200");
  // const brandColor = system.token("colors.brand.500");
  const [selectedProduct, setSelectedProduct] = useState<ProductPrice | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleRowClick = async (productId: number) => {
    const product = await fetchProductDetails(productId);
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const fetchProductDetails = async (
    productId: number
  ): Promise<ProductPrice> => {
    // Fetch detailed product data including prices
    const response = await fetch(`/api/products/${productId}`);
    return response.json();
  };

  // Set up state for column filters and global filter
  // These states are used to manage the filtering of table data
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Get the Next.js router instance for programmatic navigation
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const updateRowsPerPage = () => {
      const windowHeight = window.innerHeight;
      const calculatedRows = Math.floor(windowHeight / 60);
      setRowsPerPage(calculatedRows);
    };

    updateRowsPerPage();
    window.addEventListener("resize", updateRowsPerPage);

    return () => window.removeEventListener("resize", updateRowsPerPage);
  }, []);

  const columnHelper = createColumnHelper<ProductRow>();

  // Define table columns with headers and cell renderers
  // Each column is configured with a header and a cell renderer function
  const columns = [
    columnHelper.accessor("name", {
      header: () => <Text color="gray.400">NAME</Text>,
      cell: (info) => (
        <Text color={system.token("colors.navy.700")}>{info.getValue()}</Text>
      ),
      meta: { width: "40%", flexGrow: 0, minWidth: "40%" },
    }),
    columnHelper.accessor("grade", {
      header: () => <Text color="gray.400">GRADE</Text>,
      cell: (info) => (
        <Text color={system.token("colors.navy.700")}>{info.getValue()}</Text>
      ),
      meta: { width: "30%", flexGrow: 0, minWidth: "30%" },
    }),
    columnHelper.accessor("sku", {
      header: () => <Text color="gray.400">Lot No.</Text>,
      cell: (info) => (
        <Text color={system.token("colors.navy.700")}>{info.getValue()}</Text>
      ),
      meta: { width: "30%", flexGrow: 0, minWidth: "30%" },
    }),
    columnHelper.accessor("cas_number", {
      header: () => <Text color="gray.400">CAS No.</Text>,
      cell: (info) => (
        <Text color={system.token("colors.navy.700")}>{info.getValue()}</Text>
      ),
      meta: { width: "30%", flexGrow: 0, minWidth: "30%" },
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(tableData.length / rowsPerPage),
    manualPagination: true,
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex: 0, pageSize: rowsPerPage })
          : updater;
      table.setPageIndex(newState.pageIndex);
      table.setPageSize(newState.pageSize);
    },
  });

  // TODO: Add a button to open the detailed product view page
  const handleRowOpen = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  return (
    <Flex direction="column" w="80%" mx="auto" overflow="hidden">
      <Flex
        align="flex-start"
        justify="flex-start"
        w="100%"
        px="22px"
        mb="36px"
      >
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Search..."
        />
      </Flex>
      <Root variant="outline" colorScheme="gray">
        <Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <ColumnHeader key={header.id} {...headerStyles}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </ColumnHeader>
              ))}
            </Row>
          ))}
        </Header>
        <Body>
          {table.getRowModel().rows.map((row, index) => {
            const prevRow =
              index > 0 ? table.getRowModel().rows[index - 1] : null;
            const nextRow =
              index < table.getRowModel().rows.length - 1
                ? table.getRowModel().rows[index + 1]
                : null;

            const isDifferentFromPrev =
              prevRow && prevRow.original.name !== row.original.name;
            const isDifferentFromNext =
              nextRow && nextRow.original.name !== row.original.name;

            return (
              <Row
                key={row.id}
                onClick={() => handleRowClick(row.original.product_id)}
                _hover={{ bg: "gray.200", cursor: "pointer" }}
              >
                {row.getVisibleCells().map((cell) => (
                  <Cell
                    key={cell.id}
                    {...cellStyles}
                    // bg={isDifferentFromPrev ? "gray.100" : "white"}
                    borderTop={isDifferentFromPrev ? "1px solid #000" : "none"}
                    borderBottom={
                      isDifferentFromNext
                        ? "1px solid #001D53"
                        : "1px solid #B2B8E6"
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Cell>
                ))}
              </Row>
            );
          })}
        </Body>
      </Root>
      <Flex justify="space-between" px="22px" py="4">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Stack direction="row" gap="4">
          {Array.from({ length: table.getPageCount() }, (_, i) => (
            <Button
              key={i}
              onClick={() => table.setPageIndex(i)}
              _active={{
                bg: "brand.500",
                color: "white",
              }}
            >
              {i + 1}
            </Button>
          ))}
        </Stack>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </Flex>
      <ProductModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        product={selectedProduct}
      />
    </Flex>
  );
}

// Define a debounced input component for search functionality
// This component provides a search input with a debounce effect to optimize performance
/**
 * A debounced input component that delays triggering the onChange callback
 * until the user stops typing for a specified duration.
 *
 * @param value - The initial/controlled value of the input
 * @param onChange - Callback function triggered after the debounce delay
 * @param debounce - Time in milliseconds to wait before triggering onChange (default: 500ms)
 *
 * Debouncing prevents excessive API calls or expensive operations while the user is actively typing
 * by waiting until they pause before triggering the onChange callback.
 */
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  // Internal state to track input value
  const [value, setValue] = useState(initialValue);

  // Sync internal state when controlled value changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Set up debounced onChange callback
  useEffect(() => {
    // Create timeout to delay the onChange call
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    // Cleanup timeout if value changes before delay completes
    // This effectively resets the timer when the user types again
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <SearchBar
      {...props}
      value={value}
      onChange={(e: any) => setValue(e.target.value)}
    />
  );
}
