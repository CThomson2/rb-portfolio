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
 * to connected clients using SSE. It initializes the connection, listens for drum
 * status changes, and cleans up the listener when the client disconnects.
 *
 * @param req - The incoming Next.js request object.
 * @returns A Response object with the SSE stream and appropriate headers.
 */
export async function GET(req: NextRequest) {
  // TextEncoder converts strings to Uint8Array for streaming
  const encoder = new TextEncoder();
  const connectionId = Math.random().toString(36).slice(2, 8);
  console.log(`[Drums SSE ${connectionId}] Setting up new connection`);

  // ReadableStream is a Web API that allows streaming data to clients
  // It takes an object with a start method that receives a controller for managing the stream
  const stream = new ReadableStream({
    // Using function() or arrow => syntax is equivalent here - just style preference
    start: (controller) => {
      // controller.enqueue adds data to the stream that will be sent to the client
      // The data format must follow SSE spec: "event: eventName\ndata: jsonData\n\n"
      controller.enqueue(
        encoder.encode(`event: connected\ndata: Connected to drums SSE\n\n`)
      );

      // Create event listener function that will send drum-specific updates to connected client
      const drumStatusListener = (drumId: number, newStatus: string) => {
        console.log(
          `\n[Drums SSE ${connectionId}] Sending status update for drum ${drumId}\n`
        );
        try {
          const data = JSON.stringify({ drumId, newStatus });
          controller.enqueue(
            encoder.encode(`event: drumStatus\ndata: ${data}\n\n`)
          );
        } catch (error) {
          console.error(
            `[Drums SSE ${connectionId}] Failed to send update:`,
            error
          );
        }
      };

      // Subscribe only to drum status updates
      drumEvents.on("drumStatus", drumStatusListener);

      // Enhanced cleanup
      const cleanup = () => {
        console.log(
          `[Drums SSE ${connectionId}] Connection closed, cleaning up`
        );
        drumEvents.off("drumStatus", drumStatusListener);
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
