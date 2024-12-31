import { prisma } from "@/lib/prisma";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import type { ProductPrice } from "../types";

// Server component to display product details
export default async function ProductPage({
  params,
}: {
  params: { productID: string };
}) {
  // Directly access productID from params
  const { productID } = params;

  // Fetch product details including prices for different bottle sizes
  const product = await prisma.products.findUnique({
    where: { product_id: Number(productID) },
    include: { product_prices: { include: { bottle_sizes: true } } },
  });

  // Handle case where product is not found
  if (!product) {
    return <Box>Product not found</Box>;
  }

  // Render product details and prices
  return (
    <Box p={4}>
      <Heading as="h1" size="lg" mb={4}>
        {product.name} - {product.grade}
      </Heading>
      <Text>SKU: {product.sku}</Text>
      <Flex direction="column" mt={4}>
        {product.product_prices.map((price) => (
          <Box key={price.bottle_size_id} mb={2}>
            <Text>Volume: {price.bottle_sizes.volume.toString()}</Text>
            <Text>Price: £{price.price.toString()}</Text>
          </Box>
        ))}
      </Flex>
      {/* Render product details and prices */}
      <ProductView product={product} />
    </Box>
  );
}

interface ProductCardProps {
  product: ProductPrice;
}

export function ProductView({ product }: ProductCardProps) {
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

/*
export default function ProductPage() {
  // Get productID from the current URL path segment using useParams hook
  const params = useParams();
  const productID = params.productID;

  const [product, setProduct] = useState<ProductPrice | null>(null);

  useEffect(() => {
    if (productID) {
      async function fetchProductDetails() {
        try {
          const response = await axios.get(`/api/products/${productID}`);
          setProduct(response.data);
          // Convert price strings to float numbers before setting product state
          //   setProduct({
          //     ...response.data,
          //     price: response.data.price.map((p: any) => ({
          //       ...p,
          //       price: parseFloat(p.price)
          //     }))
          //   });
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      }
      fetchProductDetails();
    }
  }, [productID]);

  if (!product) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box p={4}>
      <Heading as="h1" size="lg" mb={4}>
        {product.name} - {product.grade}
      </Heading>
      <ProductCard product={product} />
    </Box>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { productID } = context.params;
  const product = await prisma.products.findUnique({
    where: { product_id: Number(productID) },
  });
  return { props: { product } };
}
*/
