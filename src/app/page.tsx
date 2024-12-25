import {
  Box,
  Flex,
  Link as ChakraLink,
  ListRoot as List,
  ListItem,
  Image as ChakraImage,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Header from "@/components/static/Header";
import Footer from "@/components/static/Footer";

export default function Home() {
  return (
    <Box className={styles.page}>
      <Header />
      <Flex as="main" className={styles.main} direction="column" align="center">
        <ChakraImage
          className={styles.logo}
          src="/media/logo-banner.png"
          alt="Next.js logo"
          width={180}
          height={38}
        />
        {/* <List>
          <ListItem>
            Get started by altering <code>src/app/page.tsx</code>.
          </ListItem>
          <ListItem>Save and see your changes instantly.</ListItem>
        </List> */}

        <Flex className={styles.ctas} direction="column" align="center">
          <ChakraLink
            className={styles.primary}
            href="/products"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ChakraImage
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Products
          </ChakraLink>
          <Link href="/products" passHref>
            <ChakraLink className={styles.secondary}>Product Range</ChakraLink>
          </Link>
        </Flex>
      </Flex>
      <Footer />
    </Box>
  );
}
