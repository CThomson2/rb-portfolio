import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";

interface DropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  onInputChange?: (value: string) => void;
  heading?: string;
}

export const Dropdown = ({
  value = "",
  onValueChange,
  options = [],
  placeholder = "Search...",
  emptyMessage = "No results found.",
  disabled = false,
  onInputChange,
  heading,
}: DropdownProps) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  // Ensure we always have an array of valid strings
  const safeOptions = React.useMemo(() => {
    if (!Array.isArray(options)) return [];
    return options.filter(
      (option): option is string =>
        typeof option === "string" && option !== null && option !== undefined
    );
  }, [options]);

  // Handle input changes and trigger API call
  const handleCommandInputChange = React.useCallback(
    (input: string) => {
      setInputValue(input);
      if (onInputChange) {
        onInputChange(input);
      }
    },
    [onInputChange]
  );

  const handleSelect = React.useCallback(
    (selectedOption: string) => {
      onValueChange(selectedOption);
      setOpen(false);
      setInputValue("");
    },
    [onValueChange]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between bg-background"
        >
          <span className="truncate">{value || placeholder}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            value={inputValue}
            onValueChange={handleCommandInputChange}
          />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup heading={heading}>
              {safeOptions.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => handleSelect(option)}
                >
                  {option}
                  {value === option && <Check className="ml-auto h-4 w-4" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
