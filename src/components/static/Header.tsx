import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Header() {
  return (
    <Box bg="gray.900" color="white" py={4}>
      <Flex
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        px={6}
      >
        <Text fontWeight="bold" fontSize="lg">
          Rathburn Chemicals
        </Text>
        <Flex gap={4}>
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <Link href="/about" className="hover:underline">
            About Us
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
