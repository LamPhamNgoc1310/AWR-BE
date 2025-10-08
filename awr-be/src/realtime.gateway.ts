import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server } from "ws";

type Client = import("ws").WebSocket;

@WebSocketGateway({ cors: { origin: "*" } })
export class RealtimeGateway {
  @WebSocketServer() server: Server;
  private clients = new Map<string, Client>();

//   register FE client with ID
  @SubscribeMessage("register")
  handleRegister(@MessageBody() clientId: string, @ConnectedSocket() socket: Client) {
    this.clients.set(clientId, socket);
  }

//   send script to FE client
  sendScript(clientId: string, payload: {script: string}) {
    const ws = this.clients.get(clientId);
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ type: "script-ready", data: payload }));
    }
  }
}
