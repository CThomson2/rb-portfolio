import {
  Box,
  Heading,
  Text,
  Button,
  ListRoot as List,
  ListItem,
} from "@chakra-ui/react";

import type { ProductPrice } from "../types";

interface ProductCardProps {
  product: ProductPrice;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Box border="1px" borderColor="gray.300" borderRadius="md" p={4}>
      <Heading as="h2" size="md" mb={4}>
        Product Details
      </Heading>
      <Text>Name: {product.name}</Text>
      <Text>Grade: {product.grade}</Text>

      <Heading as="h3" size="sm" mt={4} mb={2}>
        Available Sizes and Prices:
      </Heading>
      <List>
        {product.product_prices.map((price) => (
          <ListItem key={price.bottle_size_id}>
            {price.bottle_sizes.volume}: £{price.price.toString()}
          </ListItem>
        ))}
      </List>

      <Button colorScheme="blue" mt={4}>
        Add to Cart
      </Button>
      <Button variant="outline" colorScheme="blue" mt={2}>
        Download Spec Sheet
      </Button>
    </Box>
  );
}
