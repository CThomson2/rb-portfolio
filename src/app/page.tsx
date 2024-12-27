import {
  Box,
  Flex,
  Link as ChakraLink,
  Container,
  HStack,
  Text,
  Input,
  InputElement,
  SimpleGrid,
  Grid,
  IconButton,
  ListRoot as List,
  ListItem,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Header from "@/components/static/Header";
import Footer from "@/components/static/Footer";
import { SearchIcon } from "@chakra-ui/icons";

export default function Home() {
  return (
    <Box
      as="body"
      className={`${styles.page} relative bg-black-100 flex justify-center items-center 
        flex-col overflow-hidden mx-auto sm:px-10 px-5`}
    >
      <Header />

      {/* Product Categories */}
      <SimpleGrid columns={[1, 2, 4]} gap={8}>
        {/* Product category cards */}
        <Flex
          as="main"
          className={styles.main}
          direction="column"
          align="center"
        >
          <Link href="/products" passHref>
            <ChakraLink className={`${styles.secondary} text-white`}>
              Product Range
            </ChakraLink>
          </Link>
        </Flex>
      </SimpleGrid>
      <Footer />
    </Box>
  );
  // <Box as="body" className={styles.page}>
  //   <Box as="main" className={styles.main}>
  //     {/* Header */}
  //     <Flex as="header" justify="space-between" align="center">
  //       <Header />
  //     </Flex>

  //     {/* Navigation */}
  //     <Flex as="nav" bg="red.600">
  //       <Container maxW="container.xl">
  //         <HStack gap={6}>{/* Navigation items */}</HStack>
  //       </Container>
  //     </Flex>

  //     {/* Search Bar */}
  //     <Container maxW="container.xl">
  //       <InputGroup>
  //         <Input placeholder="Search our catalogue..." />
  //         <InputRightElement>
  //           <IconButton aria-label="Search" icon={<SearchIcon />} />
  //         </InputRightElement>
  //       </InputGroup>
  //     </Container>

  //     {/* Hero Carousel */}
  //     <Box position="relative">
  //       {/* We can use Chakra's components with a carousel library like react-slick */}
  //     </Box>

  //     {/* Product Categories */}
  //     <SimpleGrid columns={[1, 2, 4]} gap={8}>
  //       {/* Product category cards */}
  //       <Flex
  //         as="main"
  //         className={styles.main}
  //         direction="column"
  //         align="center"
  //       >
  //         <Link href="/products" passHref>
  //           <ChakraLink className={styles.secondary}>
  //             Product Range
  //           </ChakraLink>
  //         </Link>
  //       </Flex>
  //     </SimpleGrid>

  //     {/* Information Sections */}
  //     <Grid templateColumns={["1fr", "1fr", "1fr 1fr"]} gap={8}>
  //       {/* Container size and delivery sections */}
  //     </Grid>
  //   </Box>

  //   <Footer />
  // </Box>
}
