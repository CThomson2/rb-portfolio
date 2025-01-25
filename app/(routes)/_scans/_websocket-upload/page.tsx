"use client";

import { useEffect, useState, useCallback } from "react";

export default function ImmediateUploadPage() {
  const [latestBarcode, setLatestBarcode] = useState<string>("");
  const [status, setStatus] = useState<"connecting" | "connected" | "error">(
    "connecting"
  );
  const [retryCount, setRetryCount] = useState(0);

  const connectWebSocket = useCallback(() => {
    const ws = new WebSocket("ws://localhost:9000");

    ws.onopen = () => {
      setStatus("connected");
      setRetryCount(0);
      console.log("Connected to barcode server");
    };

    ws.onmessage = (event) => {
      try {
        // Try to parse as JSON first (for status messages)
        const data = JSON.parse(event.data);
        if (data.type === "status") {
          setStatus(data.status);
          return;
        }
      } catch {
        // If not JSON, treat as barcode data
        const barcode = event.data;
        setLatestBarcode(barcode);
        console.log("Received barcode:", barcode);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setStatus("error");
    };

    ws.onclose = () => {
      setStatus("error");
      console.log("Disconnected from barcode server");

      // Attempt to reconnect with exponential backoff
      const timeout = Math.min(1000 * Math.pow(2, retryCount), 10000);
      setRetryCount((prev) => prev + 1);

      setTimeout(() => {
        if (retryCount < 5) {
          // Limit retry attempts
          console.log(`Attempting to reconnect... (attempt ${retryCount + 1})`);
          connectWebSocket();
        }
      }, timeout);
    };

    return ws;
  }, [retryCount]);

  useEffect(() => {
    const ws = connectWebSocket();
    return () => {
      ws.close();
    };
  }, [connectWebSocket]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-white">Barcode Scanner</h1>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`w-3 h-3 rounded-full ${
                status === "connected"
                  ? "bg-green-500"
                  : status === "connecting"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            />
            <span className="text-sm text-white">
              {status === "connected"
                ? "Connected"
                : status === "connecting"
                ? "Connecting..."
                : "Connection Error - Retrying..."}
            </span>
          </div>
        </div>

        {latestBarcode && (
          <div className="border border-gray-700 rounded p-4 bg-gray-700">
            <h2 className="text-sm font-semibold text-gray-300 mb-1">
              Latest Scan:
            </h2>
            <p className="text-lg font-mono text-white">{latestBarcode}</p>
          </div>
        )}
      </div>
    </div>
  );
}
