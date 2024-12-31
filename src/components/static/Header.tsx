import {
  Button,
  Input,
  Flex,
  Box,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import Image from "next/image";
// import { SearchBar } from "@/components/navbar/SearchBar";
import { SearchBar } from "@/components/navbar/SearchBar";

function WhiteStrip() {
  return (
    <Box bg="white" color="black" py={6} boxShadow="sm">
      <Flex justify="space-between" align="center" mx="auto" px={8}>
        <Image
          src="/img/logo.png"
          alt="Rathburn Chemicals"
          width={585}
          height={75}
        />
        <VStack align="flex-end" bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="sm">(+44) 1896 870 651</Text>
          <Text fontSize="sm">sales@rathburn.co.uk</Text>
          <Text fontSize="sm">
            Caberston Road, Walkerburn, Scotland EH43 6AU
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
}

function RedStrip() {
  return (
    <Box bg="red.600" py={3} boxShadow="sm">
      <Flex
        justify="space-between"
        align="center"
        h="fit-content"
        mx="auto"
        px={8}
      >
        <SearchBar />
        <Button colorScheme="green" size="md" variant="solid">
          Request a Quote
        </Button>
      </Flex>
    </Box>
  );
}

export default function Header() {
  return (
    <Box>
      <WhiteStrip />
      <RedStrip />
    </Box>
  );
}
