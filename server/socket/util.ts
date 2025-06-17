import { prisma } from "../prisma";
import type { Server as SocketIOServer } from "socket.io";
import type { GameState } from "./interfaces";
import { generateRandomTabla } from "../shared/util";
import { PlayerStatus } from "@prisma/client";

export async function getFullGameState(gameId: string): Promise<GameState> {
  const gameSession = await prisma.gameSession.findUniqueOrThrow({
    where: { id: gameId },
    include: {
      players: {
        orderBy: { createdAt: "asc" }, // Keep player order consistent
      },
    },
  });

  return {
    id: gameSession.id,
    shortCode: gameSession.shortCode,
    status: gameSession.status,
    drawnCards: gameSession.drawnCards,
    hostId: gameSession.hostPlayerId,
    players: gameSession.players.map((p) => ({
      id: p.id,
      name: p.name,
      status: p.status,
      isWinner: p.isWinner,
      playerTabla: p.playerTabla,
    })),
  };
}

export async function broadcastGameState(io: SocketIOServer, gameId: string) {
  try {
    const gameState = await getFullGameState(gameId);
    io.to(gameId).emit("game:stateUpdate", gameState);
  } catch (error) {
    console.error(`Failed to broadcast game state for ${gameId}:`, error);
    io.to(gameId).emit("error", { message: "Failed to update game state." });
  }
}

export async function finishGame(gameId: string, winnerId: string | null) {
  if (winnerId) {
    await prisma.gameSession.update({
      where: { id: gameId },
      data: {
        status: "Waiting",
        drawnCards: [],
        players: {
          update: {
            where: { id: winnerId },
            data: {
              isWinner: true,
              status: "Waiting",
              playerTabla: generateRandomTabla().map((card) => card.title),
            },
          },
          updateMany: {
            where: {
              id: { not: winnerId },
              status: {
                in: [PlayerStatus.Playing, PlayerStatus.Eliminated],
              },
            },
            data: {
              status: "Waiting",
              playerTabla: generateRandomTabla().map((card) => card.title),
              isWinner: false,
            },
          },
        },
      },
    });
  } else {
    await prisma.gameSession.update({
      where: { id: gameId },
      data: {
        status: "Waiting",
        drawnCards: [],
        players: {
          updateMany: {
            where: {
              status: {
                in: [PlayerStatus.Playing, PlayerStatus.Eliminated],
              },
            },
            data: {
              status: "Waiting",
              playerTabla: generateRandomTabla().map((card) => card.title),
              isWinner: false,
            },
          },
        },
      },
    });
  }
}
