import { fetchProducts } from "@/lib/products/fetchProducts";

import type { ProductTableRow } from "@/types/components/products";

import { DataTable } from "@/components/features/products/ProductTable";
import TopHeader from "@/components/features/products/ProductTable/header";

import { columns } from "@/components/features/products/ProductTable/columns";

// This is a SSC. Use prisma to fetch products and the table header grades and associated counts
// Make a `headers` prop for DataTable that is an array of objects with `grade` and `count`
// Retrieve both the products and the headers in direct queries here:
//   prisma.products.findMany();
//   prisma.products.groupBy({

const IndexPage = async () => {
  const products = await fetchProducts();

  return (
    <div className="flex flex-col w-full gap-5">
      <TopHeader />
      <DataTable data={products} columns={columns} />
    </div>
  );
};

export default IndexPage;

// const ProductsPage = async () => {
//   const products: ProductRow[] = await prisma.products
//     .findMany({
//       select: {
//         product_id: true,
//         name: true,
//         sku: true,
//         grade: true,
//         raw_materials: {
//           select: {
//             cas_number: true,
//           },
//         },
//       },
//     })
//     .then((products) =>
//       products.map((product) => ({
//         ...product,
//         cas_number: product.raw_materials?.cas_number ?? "",
//       }))
//     );

//   return (
//     <div>
//       <h1 className="text-2xl font-bold">Product Range</h1>
//       <ul>
//         {products.map((product) => (
//           <li key={product.product_id}>{product.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductsPage;
