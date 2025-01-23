import { drumEvents } from "@/lib/events/drumEvents";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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
