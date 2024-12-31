"use client";
import { IconButton, Input, Box } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { SearchIcon } from "@chakra-ui/icons";

export function SearchBar({
  value,
  onChange,
  variant,
  background,
  children,
  placeholder,
  borderRadius,
  ...rest
}: {
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: string;
  background?: string;
  children?: any;
  placeholder?: string;
  borderRadius?: string | number;
  [x: string]: any;
}) {
  const searchIconColor = "gray.700";
  const inputBg = "secondaryGray.300";
  const inputText = "gray.700";
  const borderColor = "secondaryGray.200";

  return (
    <InputGroup
      w={{ base: "100%", md: "200px" }}
      {...rest}
      startElement={
        <Box
          as="span"
          position="absolute"
          left="10px"
          top="50%"
          transform="translateY(-50%)"
        >
          <SearchIcon color={searchIconColor} w="15px" h="15px" />
        </Box>
      }
    >
      <Input
        value={value ? value : ""}
        onChange={onChange}
        variant="outline"
        fontSize="sm"
        bg={background ? background : inputBg}
        color={inputText}
        fontWeight="500"
        _placeholder={{ color: "gray.400", fontSize: "14px" }}
        borderRadius={borderRadius ? borderRadius : "30px"}
        placeholder={placeholder ? placeholder : "Search..."}
        border="1px solid"
        borderColor={borderColor}
        pl="30px"
      />
    </InputGroup>
  );
}
