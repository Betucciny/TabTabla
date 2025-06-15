import type { Server as SocketIOServer, Socket } from "socket.io";
import { prisma } from "../prisma";
import { GameStatus, PlayerStatus } from "@prisma/client";
import { broadcastGameState } from "./util";
import { getShuffleCards } from "../shared/util";

export function hostActions(io: SocketIOServer, socket: Socket) {
  socket.on("game:start", async () => {
    const { playerId, gameId } = socket.data;
    try {
      const game = await prisma.gameSession.findUniqueOrThrow({
        where: { id: gameId },
      });
      if (game.hostPlayerId !== playerId) {
        return socket.emit("error", {
          message: "Only the host can start the game.",
        });
      }
      if (game.status !== "Waiting") {
        return socket.emit("error", {
          message: "Game is not in a waiting state.",
        });
      }

      await prisma.gameSession.update({
        where: { id: gameId },
        data: {
          status: GameStatus.Playing,
          initialDeckOrder: getShuffleCards().map((card) => card.title),
          drawnCards: [],
          players: {
            updateMany: {
              where: { status: PlayerStatus.Ready },
              data: { isWinner: false, status: PlayerStatus.Playing },
            },
          },
        },
      });

      await broadcastGameState(io, gameId, playerId);
    } catch (error) {
      console.error(`Error starting game ${gameId}:`, error);
    }
  });

  socket.on("game:takeCard", async () => {
    const { playerId, gameId } = socket.data;
    try {
      const game = await prisma.gameSession.findUniqueOrThrow({
        where: { id: gameId },
      });
      if (game.hostPlayerId !== playerId || game.status !== "Playing") return;

      const nextCardIndex = game.drawnCards.length;
      if (nextCardIndex >= game.initialDeckOrder.length) {
        await prisma.gameSession.update({
          where: { id: gameId },
          data: {
            status: "Waiting",
            players: {
              updateMany: {
                where: {},
                data: { status: "Waiting", playerTabla: [] },
              },
            },
          },
        });
        return await broadcastGameState(io, gameId, playerId);
      }

      const nextCard = game.initialDeckOrder[nextCardIndex];
      await prisma.gameSession.update({
        where: { id: gameId },
        data: { drawnCards: { push: nextCard } },
      });

      await broadcastGameState(io, gameId, playerId);
    } catch (error) {
      console.error(`Error taking card for game ${gameId}:`, error);
    }
  });

  socket.on("game:destroy", async () => {
    const { gameId } = socket.data;
    try {
      await prisma.gameSession.delete({ where: { id: gameId } });
      io.emit("game:destroyed", gameId);
    } catch (error) {
      console.error(`Error destroying game ${gameId}:`, error);
    }
  });
}

export function playerActions(io: SocketIOServer, socket: Socket) {
  socket.on("player:selectTabla", async ({ tabla }: { tabla: string[] }) => {
    const { playerId } = socket.data;
    try {
      await prisma.playerInGame.update({
        where: { id: playerId },
        data: { playerTabla: tabla, status: PlayerStatus.Ready },
      });
    } catch (error) {
      console.error(`Error selecting tabla for player ${playerId}:`, error);
    }
  });

  socket.on(
    "player:loteria",
    async ({ markedCards }: { markedCards: string[] }) => {
      const { playerId, gameId } = socket.data;
      try {
        const game = await prisma.gameSession.findUniqueOrThrow({
          where: { id: gameId },
          include: { players: { where: { id: playerId } } },
        });

        const player = game.players[0];
        if (!player || game.status !== "Playing") return;
        const isWinner =
          player.playerTabla.length === markedCards.length &&
          markedCards.every((card) => game.drawnCards.includes(card));

        if (isWinner) {
          await prisma.gameSession.update({
            where: { id: gameId },
            data: {
              status: "Waiting",
              players: {
                update: {
                  where: { id: playerId },
                  data: { isWinner: true, status: "Waiting" },
                },
                updateMany: {
                  where: { id: { not: playerId } },
                  data: { status: "Waiting", playerTabla: [] },
                },
              },
            },
          });
          await broadcastGameState(io, gameId, playerId);
        } else {
          await prisma.playerInGame.update({
            where: { id: playerId },
            data: { status: PlayerStatus.Eliminated },
          });

          socket.emit("game:loteriaResult", {
            success: false,
            message: "False call! You are out for the rest of this round.",
          });

          await broadcastGameState(io, gameId, playerId);
        }
      } catch (error) {
        console.error(`Error checking loteria for player ${playerId}:`, error);
      }
    }
  );
}
