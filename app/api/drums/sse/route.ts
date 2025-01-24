import { drumEvents } from "@/lib/events/drumEvents";
import { NextRequest } from "next/server";

// Tells Next.js to never cache this route and always fetch fresh data
export const dynamic = "force-dynamic";

// Specifies that this route should run on Node.js runtime instead of Edge runtime
// This is needed for EventEmitter functionality which isn't available in Edge
export const runtime = "nodejs";

/**
 * Handles GET requests for Server-Sent Events (SSE) to stream drum status updates.
 *
 * This function sets up a stream that sends real-time updates about drum statuses
 * to connected clients usiœng SSE. It initializes the connection, listens for drum
 * status changes, and cleans up the listener when the client disconnects.
 *
 * @param req - The incoming Next.js request object.
 * @returns A Response object with the SSE stream and appropriate headers.
 */
export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      controller.enqueue(
        encoder.encode(
          "event: connected\ndata: Connected to drum status SSE\n\n"
        )
      );

      // Listen for drum status changes
      const onDrumStatusChange = (data: {
        drumId: number;
        newStatus: string;
      }) => {
        controller.enqueue(
          encoder.encode(`event: drumStatus\ndata: ${JSON.stringify(data)}\n\n`)
        );
      };

      // Attach listener
      drumEvents.on("statusChange", onDrumStatusChange);

      // Clean up listener when client disconnects
      req.signal.addEventListener("abort", () => {
        drumEvents.off("statusChange", onDrumStatusChange);
      });
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
