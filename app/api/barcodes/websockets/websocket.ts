import { WebSocketServer, ServerOptions, WebSocket } from "ws";

interface BarcodeWSServer extends WebSocketServer {
  broadcast: (data: string) => void;
}

// Create a WebSocket server and return it with broadcast capability
const createWSServer = (options: ServerOptions): BarcodeWSServer => {
  const wss = new WebSocketServer(options) as BarcodeWSServer;

  // Add broadcast method to the server
  wss.broadcast = (data: string) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };

  // Set up connection handling
  wss.on("connection", (ws) => {
    console.log("Barcode client connected");

    ws.on("close", () => {
      console.log("Barcode client disconnected");
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });

  return wss;
};

export default createWSServer;
