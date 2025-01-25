import { drumEvents } from "@/lib/events/drumEvents";
import { NextRequest } from "next/server";

// Tells Next.js to never cache this route and always fetch fresh data
export const dynamic = "force-dynamic";

// Specifies that this route should run on Node.js runtime instead of Edge runtime
// This is needed for EventEmitter functionality which isn't available in Edge
export const runtime = "nodejs";

/**
 * Handles GET requests for Server-Sent Events (SSE) to stream order updates.
 *
 * This function sets up a stream that sends real-time updates about order quantities
 * to connected clients using SSE. It initializes the connection, listens for order
 * quantity changes when drums are scanned, and cleans up the listener when the
 * client disconnects.
 *
 * The route works in parallel with the drums SSE route to provide complete
 * real-time updates of the inventory system. While the drums route handles
 * status changes, this route focuses on order quantity updates.
 *
 * @param req - The incoming Next.js request object.
 * @returns A Response object with the SSE stream and appropriate headers.
 */
export async function GET(req: NextRequest) {
  // TextEncoder converts strings to Uint8Array for streaming
  const encoder = new TextEncoder();
  const connectionId = Math.random().toString(36).substring(7);
  console.log(`[Orders SSE ${connectionId}] New connection established`);

  // ReadableStream is a Web API that allows streaming data to clients
  // It takes an object with a start method that receives a controller for managing the stream
  const stream = new ReadableStream({
    start: (controller) => {
      // controller.enqueue adds data to the stream that will be sent to the client
      // The data format must follow SSE spec: "event: eventName\ndata: jsonData\n\n"
      controller.enqueue(
        encoder.encode(`event: connected\ndata: Connected to orders SSE\n\n`)
      );

      // Create event listener function that will send order-specific updates to connected client
      const orderUpdateListener = (
        orderId: number,
        drumId: number,
        newQuantityReceived: number
      ) => {
        console.log(
          `\n[Orders SSE ${connectionId}] Sending update for order ${orderId}`
        );
        try {
          const data = JSON.stringify({ orderId, drumId, newQuantityReceived });
          controller.enqueue(
            encoder.encode(`event: orderUpdate\ndata: ${data}\n\n`)
          );
        } catch (error) {
          console.error(
            `[Orders SSE ${connectionId}] Failed to send update:`,
            error
          );
        }
      };

      // Subscribe only to order updates
      drumEvents.on("orderUpdate", orderUpdateListener);

      // Enhanced cleanup function to remove event listeners when connection closes
      const cleanup = () => {
        console.log(
          `[Orders SSE ${connectionId}] Connection closed, cleaning up`
        );
        drumEvents.off("orderUpdate", orderUpdateListener);
      };

      // The abort event fires when client disconnects (closes browser, navigates away, etc)
      // We need to clean up our event listener to prevent memory leaks
      req.signal.addEventListener("abort", cleanup);
      return cleanup;
    },
  });

  // Create and return SSE response with appropriate headers
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream", // Tells browser this is SSE
      "Cache-Control": "no-cache", // Prevents caching of events
      Connection: "keep-alive", // Keeps connection open
    },
  });
}
