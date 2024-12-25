import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Footer() {
  return (
    <Box bg="gray.900" color="white" py={6}>
      <Flex direction="column" align="center" maxW="1200px" mx="auto">
        <Flex gap={4} mb={4}>
          <Link href="/terms-and-conditions" className="hover:underline">
            Terms & Conditions
          </Link>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/support" className="hover:underline">
            Support
          </Link>
        </Flex>
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </Text>
      </Flex>
    </Box>
  );
}
