"use client";
import { Box, Flex, HStack, Input } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { SearchIcon } from "@chakra-ui/icons";

export function SearchBar({
  value,
  onChange,
  ...props
}: {
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const { size, ...uiProps } = props;

  const inputSize =
    typeof size === "string" &&
    ["sm", "md", "lg", "xl", "2xl", "2xs", "xs"].includes(size)
      ? size
      : "md";

  return (
    <Box
      w="30%"
      maxW="50%"
      bg="white"
      border="1px solid black"
      borderRadius="lg"
      px={2}
      transition="width 0.4s ease-in-out"
      _focusWithin={{
        w: "100%",
      }}
    >
      <InputGroup h="full" w="full" endElement={<SearchIcon />}>
        <Input
          value={value ? value : ""}
          onChange={onChange}
          placeholder="Search our catalogue..."
          size={inputSize}
          border="none"
          bg="white"
          pr="3rem"
          _focus={{
            outline: "none",
            boxShadow: "none",
          }}
          {...uiProps}
        />
      </InputGroup>
    </Box>
  );
}

// export function SearchBar(props: {
//   variant?: string;
//   background?: string;
//   children?: any;
//   placeholder?: string;
//   borderRadius?: string | number;
//   [x: string]: any;
// }) {
//   const { variant, background, children, placeholder, borderRadius, ...rest } =
//     props;
//   const searchIconColor = "gray.700";
//   const inputBg = "secondaryGray.300";
//   const inputText = "gray.700";
//   const borderColor = "secondaryGray.200";

//   return (
//     <HStack gap="10" width="full">
//       <InputGroup
//         flex="1"
//         startElement={<SearchIcon color={searchIconColor} w="15px" h="15px" />}
//       >
//         <Input
//           as="search"
//           variant="outline"
//           fontSize="sm"
//           bg={background ? background : inputBg}
//           color={inputText}
//           fontWeight="500"
//           _placeholder={{ color: "gray.400", fontSize: "14px" }}
//           borderRadius={borderRadius ? borderRadius : "30px"}
//           placeholder={placeholder ? placeholder : "Search..."}
//           border="1px solid"
//           borderColor={borderColor}
//         />
//       </InputGroup>
//     </HStack>
//   );
// }
