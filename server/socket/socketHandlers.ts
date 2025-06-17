import type { Server as SocketIOServer, Socket } from "socket.io";
import { prisma } from "../prisma";
import { broadcastGameState } from "./util"; // Import our new helper
import { hostActions, playerActions } from "./actions";
import { generateRandomTabla } from "../shared/util";

export function registerSocketHandlers(io: SocketIOServer) {
  io.on("connection", (socket: Socket) => {
    console.log("Socket connected", socket.id);
    socket.on("player:joinRoom", async ({ gameId, playerId }) => {
      try {
        const randomTabla = Math.floor(Math.random() * 100);
        const player = await prisma.playerInGame.findUnique({
          where: { id: playerId },
        });
        if (!player || player.gameSessionId !== gameId) {
          return socket.emit("error", {
            message: "Invalid player or game ID.",
          });
        }
        socket.data.playerId = playerId;
        socket.data.gameId = gameId;
        socket.join(gameId);
        console.log(
          `Socket ${socket.id} (Player ${playerId}) joined room ${gameId}`
        );
        await broadcastGameState(io, gameId);
      } catch (error) {
        console.error("Error in player:joinRoom", error);
      }
    });

    socket.on("disconnect", async () => {
      console.log(`A user disconnected: ${socket.id}`);
    });
    hostActions(io, socket);
    playerActions(io, socket);
  });
}
