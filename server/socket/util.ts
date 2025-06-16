import { prisma } from "../prisma";
import type { Server as SocketIOServer } from "socket.io";
import type { GameState } from "./interfaces";

export async function getFullGameState(
  gameId: string,
  playerId: string
): Promise<GameState> {
  const gameSession = await prisma.gameSession.findUniqueOrThrow({
    where: { id: gameId },
    include: {
      players: {
        orderBy: { createdAt: "asc" }, // Keep player order consistent
      },
    },
  });

  console.log(playerId);
  console.log(gameSession);

  return {
    id: gameSession.id,
    shortCode: gameSession.shortCode,
    status: gameSession.status,
    drawnCards: gameSession.drawnCards,
    hostId: gameSession.hostPlayerId,
    isHost: gameSession.hostPlayerId === playerId,
    players: gameSession.players.map((p) => ({
      id: p.id,
      name: p.name,
      status: p.status,
      isWinner: p.isWinner,
      playerTabla: p.playerTabla,
    })),
  };
}

export async function broadcastGameState(
  io: SocketIOServer,
  gameId: string,
  playerId: string
) {
  try {
    const gameState = await getFullGameState(gameId, playerId);
    io.to(gameId).emit("game:stateUpdate", gameState);
  } catch (error) {
    console.error(`Failed to broadcast game state for ${gameId}:`, error);
    io.to(gameId).emit("error", { message: "Failed to update game state." });
  }
}
