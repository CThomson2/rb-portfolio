"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Heading, ListRoot as List, ListItem, Box } from "@chakra-ui/react";

// src/app/products/page.tsx
export default function ProductsPage() {
  const [products, setProducts] = useState<
    { product_id: number; name: string; grade: string }[]
  >([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <Box as="main" p={4}>
      <Heading as="h1" size="lg" mb={4}>
        Our Products
      </Heading>
      <List>
        {products.map((product) => (
          <ListItem
            key={product.product_id}
            p={4}
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
            _hover={{ bg: "gray.50" }}
          >
            <Heading as="h3" size="md">
              {product.name}
            </Heading>
            <Box as="p">{product.grade}</Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
