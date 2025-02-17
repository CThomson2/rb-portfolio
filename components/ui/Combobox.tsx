import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

interface ComboboxProps {
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  onInputChange?: (value: string) => void;
}

export function Combobox({
  value = "",
  onValueChange,
  options = [],
  placeholder = "Search...",
  emptyMessage = "No results found.",
  disabled = false,
  onInputChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

    if (!Array.isArray(options)) return [];
    (input: unknown) => {
      const inputString = String(input || "");
      setSearchValue(inputString);ng" && option !== null && option !== undefined
      onInputChange?.(inputString);
  // Ensure we have a valid string value
  const safeValue = React.useMemo(() => {
    return typeof value === "string" ? value : "";
  }, [value]);

  const handleInputChange = React.useCallback(
    (input: unknown) => {
      const inputString = String(input || "");
      setSearchValue(inputString);
      onInputChange?.(inputString);
    },
    [onInputChange]
  );

  const handleSelect = React.useCallback(
    (selectedValue: string) => {
      onValueChange(selectedValue);
      setOpen(false);
      setSearchValue("");
    },
    [onValueChange]
  );

          {safeValue || placeholder}
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>dInput
            placeholder={placeholder}
            value={searchValue}
            onValueChange={handleInputChange}
          />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup>
            {safeOptions.map((option) => (
              <CommandItem
                key={option}
                value={option}
                onSelect={() => handleSelect(option)}
              >
                {option}
                {value === option && <Check className="ml-auto h-4 w-4" />}
                {safeValue === option && <Check className="ml-auto h-4 w-4" />}
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
