import { prisma } from "@/lib/prisma";
import {
  Heading,
  ListRoot as List,
  ListItem,
  Box,
  Flex,
} from "@chakra-ui/react";

import type { ProductRow } from "./types";
import SearchTableOverview from "./components/SearchTableOverview";
import Banner from "./components/Banner";

export default async function ProductsPage() {
  const products: ProductRow[] = await prisma.products
    .findMany({
      select: {
        product_id: true,
        name: true,
        sku: true,
        grade: true,
        raw_materials: {
          select: {
            cas_number: true,
          },
        },
      },
    })
    .then((products) =>
      products.map((product) => ({
        ...product,
        cas_number: product.raw_materials?.cas_number ?? "",
      }))
    );

  return (
    <Box as="main" p={4}>
      {/* <Banner /> */}
      <Heading as="h1" size="lg" mb={4}>
        Product Range
      </Heading>
      <SearchTableOverview tableData={products} />
    </Box>
  );
}

/*
// Chakra imports
import { Flex } from '@chakra-ui/react';
// import Card from 'components/card/Card';
import React from 'react';
import Banner from 'views/admin/main/ecommerce/overviewProduct/components/Banner';
import SearchTableOverview from 'views/admin/main/ecommerce/overviewProduct/components/SearchTableOverview';
import tableDataOverview from 'views/admin/main/ecommerce/overviewProduct/variable/tableDataOverview';

export default function ProductOverview() {
	return (
		<Flex direction='column' pt={{ sm: '125px', lg: '75px' }}>
			<Banner />
			<SearchTableOverview tableData={tableDataOverview} />
		</Flex>
	);
}

*/
