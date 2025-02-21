import { queries as txQueries } from "./transactions/queries";
import { queries as drumQueries } from "./drums/queries";
import { queries as orderQueries } from "./orders/queries";

export const queries = {
  txQueries,
  drumQueries,
  orderQueries,
};

export * as ordersRepository from "./orders";
export * as transactionRepository from "./transactions";
export * as drumRepository from "./drums";
