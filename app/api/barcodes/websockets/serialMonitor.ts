// server/serialListener.js
import { SerialPort, ReadlineParser } from "serialport";
import { WebSocketServer, WebSocket } from "ws";

let serialPort: SerialPort | null = null;
let parser: ReadlineParser | null = null;

// Initialize WebSocket server
const wss = new WebSocketServer({
  port: 9000,
  clientTracking: true,
});

function setupSerialPort() {
  if (serialPort) {
    console.log("Closing existing serial port connection");
    serialPort.close();
  }

  serialPort = new SerialPort({
    path: "/dev/tty.usbserial-240",
    baudRate: 9600,
  });

  parser = serialPort.pipe(new ReadlineParser({ delimiter: "\r" }));

  serialPort.on("error", (error) => {
    console.error("Serial port error:", error);
    // Try to reconnect after error
    setTimeout(setupSerialPort, 5000);
  });

  serialPort.on("close", () => {
    console.log("Serial port closed, attempting to reconnect...");
    setTimeout(setupSerialPort, 5000);
  });

  serialPort.on("open", () => {
    console.log("Serial port opened successfully");

    if (parser) {
      parser.on("data", (data: string) => {
        const barcode = data.trim();
        console.log("Scanned barcode:", barcode);

        // Broadcast to all connected clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            try {
              client.send(barcode);
            } catch (err) {
              console.error("Error sending to client:", err);
            }
          }
        });
      });
    }
  });
}

// Set up WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("Barcode client connected");

  // Send initial connection status
  ws.send(JSON.stringify({ type: "status", status: "connected" }));

  // Handle ping-pong for connection health check
  ws.on("pong", () => {
    ws.isAlive = true;
  });

  ws.on("close", () => {
    console.log("Barcode client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

// Set up periodic connection health checks
const interval = setInterval(() => {
  wss.clients.forEach((ws: WebSocket & { isAlive?: boolean }) => {
    if (ws.isAlive === false) {
      console.log("Terminating stale connection");
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on("close", () => {
  clearInterval(interval);
});

// Initial setup
setupSerialPort();

export { wss };
