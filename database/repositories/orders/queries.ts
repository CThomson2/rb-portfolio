import { prisma } from "@/database/client";
import type {
  NewOrder,
  OrderGetResponse,
} from "@/types/database/inventory/orders";
import { OrderStatusType } from "@/types/constant/inventory/orders";
import type { OrderQueryParams } from "@/types/database/inventory/orders";

export const queries = {
  getOrders: async ({
    page = 1,
    limit = 50,
    sortField = "date_ordered",
    sortOrder = "desc",
  }: OrderQueryParams): Promise<OrderGetResponse> => {
    const offset = (page - 1) * limit;

    // Get the total number of orders
    const total = await prisma.orders.count();

    // Get the paginated data
    const rows = await prisma.orders.findMany({
      orderBy: [{ [sortField]: sortOrder }, { order_id: "desc" }],
      skip: offset,
      take: limit,
    });

    const orders = rows.map((row) => ({
      order_id: row.order_id,
      supplier: row.supplier,
      material: row.material,
      quantity: row.quantity,
      date_ordered: row.date_ordered?.toISOString(),
      quantity_received: row.quantity_received,
      delivery_status: row.delivery_status as OrderStatusType,
      created_at: row.created_at?.toISOString(),
      updated_at: row.updated_at?.toISOString(),
    }));

    return { orders, total };
  },

  /**
   * Creates a new order in the database.
   * Sets initial status to "pending" and quantity_received to 0.
   * @param data The order data containing supplier, material, quantity and optional notes
   * @returns The created order record
   */
  createOrder: async (data: NewOrder) => {
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

  /**
   * Gets all orders with a delivery status of "pending".
   * This is used to display active orders (en-route or partially fulfilled) in the sidebar.
   * @returns An array of orders with a delivery status of "pending"
   */
  getActiveOrders: async () => {
    return prisma.orders.findMany({
      where: {
        delivery_status: {
          in: ["pending", "partial"],
        },
      },
      orderBy: {
        order_id: "desc",
      },
      select: {
        order_id: true,
        supplier: true,
        material: true,
        quantity: true,
        quantity_received: true,
        delivery_status: true,
      },
    });
  },

  updateDeliveryStatus: async (orderId: number, status: OrderStatusType) => {
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
