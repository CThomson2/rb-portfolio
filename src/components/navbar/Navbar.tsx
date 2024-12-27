import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <Flex bg="gray.900" color="white" py={4} gap={[4, 4, 4, 4]}>
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
  );
}
