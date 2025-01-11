import { prisma } from "@/database/client";
import type { ProductWithPrices } from "@/types/database/products";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { List, ListItem } from "@/components/ui/List";

// Server component to display product details
export default async function ProductPage({
  params,
}: {
  params: { productID: string };
}) {
  const { productID } = params;

  const product = await prisma.products.findUnique({
    where: { product_id: Number(productID) },
    include: { product_prices: { include: { bottle_sizes: true } } },
  });

  if (!product) {
    return (
      <Card>
        <CardContent>Product not found</CardContent>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>
          {product.name} - {product.grade}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>SKU: {product.sku}</p>
        <div className="flex flex-col mt-4">
          {product.product_prices.map((price) => (
            <div key={price.bottle_size_id} className="mb-2">
              <p>Volume: {price.bottle_sizes.volume.toString()}</p>
              <p>Price: £{price.price.toString()}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <ProductView product={product} />
    </Card>
  );
}

interface ProductCardProps {
  product: ProductWithPrices;
}

function ProductView({ product }: ProductCardProps) {
  return (
    <Card className="border-1 border-gray-300 rounded-md p-4">
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Name: {product.name}</p>
        <p>Grade: {product.grade}</p>

        <h3 className="mt-4 mb-2">Available Sizes and Prices:</h3>
        <List>
          {product.product_prices.map((price) => (
            <ListItem key={price.bottle_size_id}>
              {price.bottle_sizes.volume}: £{price.price.toString()}
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardFooter>
        <Button className="bg-blue-500 text-white">Add to Cart</Button>
        <Button variant="outline" className="bg-blue-500 text-white">
          Download Spec Sheet
        </Button>
      </CardFooter>
    </Card>
  );
}
