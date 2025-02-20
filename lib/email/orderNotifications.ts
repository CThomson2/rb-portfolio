import nodemailer from "nodemailer";
import type { Order } from "@/types/database/inventory/orders";

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP connection error:", error);
  } else {
    console.log("SMTP server is ready to take our messages");
  }
});

export async function sendOrderCompleteNotification(order: Order) {
  const emailContent = `
    Order #${order.order_id} has been marked as complete.
    
    Details:
    - Supplier: ${order.supplier}
    - Material: ${order.material}
    - Quantity: ${order.quantity}
    - Date Ordered: ${
      order.date_ordered
        ? new Date(order.date_ordered).toLocaleDateString("en-GB")
        : "N/A"
    }
    - Completed At: ${
      order.updated_at
        ? `${new Date(order.updated_at).toLocaleDateString(
            "en-GB"
          )} at ${new Date(order.updated_at).toLocaleTimeString("en-GB")}`
        : "N/A"
    }
    
    All drums for this order have been received and processed.
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ORDER_NOTIFICATION_EMAIL,
      subject: `Order #${order.order_id} Complete`,
      text: emailContent,
    });

    console.log(`Sent completion notification for order #${order.order_id}`);
  } catch (error) {
    console.error("Failed to send order completion email:", error);
    // Don't throw the error - we don't want to break the main flow if email fails
  }
}
