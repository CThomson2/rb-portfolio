import { queries as txQueries } from "./transactions/queries";
import { queries as drumQueries } from "./drums/queries";
import { queries as orderQueries } from "./orders/queries";
import { queries as productQueries } from "./products";

export const queries = {
  txQueries,
  drumQueries,
  orderQueries,
  productQueries,
};

queries.productQueries.count(a);

export * as productRepository from "./products";
export * as ordersRepository from "./orders";
export * as transactionRepository from "./transactions";
export * as drumRepository from "./drums";
