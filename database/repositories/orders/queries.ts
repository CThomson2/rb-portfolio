import { prisma } from "@/database/client";
import type { Order, OrderCreate } from "./types";
import { OrderStatus } from "../shared/types";

const queries = {
  /**
   * Creates a new order in the database.
   * Sets initial status to "pending" and quantity_received to 0.
   * @param data The order data containing supplier, material, quantity and optional notes
   * @returns The created order record
   */
  create: async (data: OrderCreate) => {
    return prisma.orders.create({
      data: {
        ...data,
        delivery_status: "pending",
        quantity_received: 0,
      },
    });
  },

  /**
   * Gets an order by ID and includes all associated deliveries.
   * Uses an inner join - will only return orders that have deliveries.
   * @param orderId The ID of the order to retrieve
   * @returns The order with its deliveries, or null if not found
   */
  getWithDeliveries: async (orderId: number) => {
    return prisma.orders.findUnique({
      where: {
        order_id: orderId,
      },
      include: {
        deliveries: true,
      },
    });
  },

  updateDeliveryStatus: async (orderId: number, status: OrderStatus) => {
    return prisma.orders.update({
      where: {
        order_id: orderId,
      },
      data: {
        delivery_status: status,
      },
    });
  },
};

export default queries;
