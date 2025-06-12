import { WebSocketServer, WebSocket } from "ws";
import { IncomingMessage } from "http";
import { Socket } from "net";

const wss = new WebSocketServer({ noServer: true });
const chatMessages: string[] = [];

wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected");
  ws.send(JSON.stringify(chatMessages)); // Send existing messages to new client

  ws.on("message", (message: string) => {
    const msg = message.toString();
    chatMessages.push(msg);
    console.log(`Received: ${msg}`);
    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify([msg])); // Send new message as an array
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error: Error) => {
    console.error("WebSocket error:", error);
  });
});

export const handleWebSocketUpgrade = (
  request: IncomingMessage,
  socket: Socket,
  head: Buffer
) => {
  console.log(`WebSocket upgrade request URL: ${request.url}`);
  if (request.url === "/chat") {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
};
