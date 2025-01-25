import { drumEvents } from "@/lib/events/drumEvents";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();
  const connectionId = Math.random().toString(36).substring(7);
  console.log(`[Orders SSE ${connectionId}] New connection established`);

  const stream = new ReadableStream({
    start: (controller) => {
      // Send initial connection message
      controller.enqueue(
        encoder.encode(`event: connected\ndata: Connected to orders SSE\n\n`)
      );

      // Only listen for order updates
      const orderUpdateListener = (
        orderId: number,
        drumId: number,
        newQuantityReceived: number
      ) => {
        console.log(
          `[Orders SSE ${connectionId}] Sending update for order ${orderId}`
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

      // Enhanced cleanup
      const cleanup = () => {
        console.log(
          `[Orders SSE ${connectionId}] Connection closed, cleaning up`
        );
        drumEvents.off("orderUpdate", orderUpdateListener);
      };

      req.signal.addEventListener("abort", cleanup);
      return cleanup;
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
