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

export default function Home() {
  return (
    <Box className={styles.page}>
      <Flex as="main" className={styles.main} direction="column" align="center">
        <ChakraImage
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
        />
        <List>
          <ListItem>
            Get started by editing <code>src/app/page.tsx</code>.
          </ListItem>
          <ListItem>Save and see your changes instantly.</ListItem>
        </List>

        <Flex className={styles.ctas} direction="column" align="center">
          <ChakraLink
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
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
            Deploy now
          </ChakraLink>
          <ChakraLink
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </ChakraLink>
        </Flex>

        <Link href="/products" passHref>
          <ChakraLink className={styles.secondary}>Go to Products</ChakraLink>
        </Link>
      </Flex>
    </Box>
  );
}
