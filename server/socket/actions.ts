import type { Server as SocketIOServer, Socket } from "socket.io";
import { prisma } from "../prisma";
import { GameStatus, PlayerStatus } from "@prisma/client";
import { broadcastGameState, finishGame } from "./util";
import { generateRandomTabla, getShuffleCards } from "../shared/util";

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
              where: { status: PlayerStatus.Waiting },
              data: { isWinner: false, status: PlayerStatus.Playing },
            },
          },
        },
      });

      await broadcastGameState(io, gameId);
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
        await finishGame(gameId, null);
        await broadcastGameState(io, gameId);
        io.to(gameId).emit("game:winner", null);
        return;
      }

      const nextCard = game.initialDeckOrder[nextCardIndex];
      await prisma.gameSession.update({
        where: { id: gameId },
        data: { drawnCards: { push: nextCard } },
      });

      await broadcastGameState(io, gameId);
    } catch (error) {
      console.error(`Error taking card for game ${gameId}:`, error);
    }
  });

  socket.on("game:endRound", async () => {
    const { gameId } = socket.data;
    try {
      await finishGame(gameId, null);
      await broadcastGameState(io, gameId);
      io.to(gameId).emit("game:winner", null);
    } catch (error) {
      console.error(`Error ending round for game ${gameId}:`, error);
    }
  });

  socket.on("game:destroy", async () => {
    const { gameId } = socket.data;
    try {
      await prisma.gameSession.delete({ where: { id: gameId } });
      io.to(gameId).emit("game:destroyed", gameId);
    } catch (error) {
      console.error(`Error destroying game ${gameId}:`, error);
    }
  });
}

export function playerActions(io: SocketIOServer, socket: Socket) {
  socket.on("player:selectTabla", async ({ tabla }: { tabla: string[] }) => {
    const { playerId, gameId } = socket.data;
    try {
      await prisma.playerInGame.update({
        where: { id: playerId },
        data: { playerTabla: tabla },
      });
      await broadcastGameState(io, gameId);
    } catch (error) {
      console.error(`Error selecting tabla for player ${playerId}:`, error);
    }
  });

  socket.on("player:randomTabla", async () => {
    const { playerId, gameId } = socket.data;
    try {
      const randomTabla = generateRandomTabla().map((card) => card.title);
      await prisma.playerInGame.update({
        where: { id: playerId },
        data: { playerTabla: randomTabla },
      });
      await broadcastGameState(io, gameId);
    } catch (error) {
      console.error(
        `Error generating random tabla for player ${playerId}:`,
        error
      );
    }
  });

  socket.on("player:leave", async () => {
    const { playerId, gameId } = socket.data;
    try {
      await prisma.playerInGame.delete({
        where: {
          id: playerId,
        },
      });
      await broadcastGameState(io, gameId);
    } catch (error) {
      console.error(
        `Error leaving game ${gameId} for player ${playerId}:`,
        error
      );
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
          await finishGame(gameId, playerId);
          await broadcastGameState(io, gameId);
          io.to(gameId).emit("game:winner", player.name);
        } else {
          await prisma.playerInGame.update({
            where: { id: playerId },
            data: { status: PlayerStatus.Eliminated },
          });

          socket.emit("game:loteriaResult", {
            success: false,
            message: "False call! You are out for the rest of this round.",
          });
          const stillPlayers = await prisma.playerInGame.findMany({
            where: { gameSessionId: gameId, status: PlayerStatus.Playing },
          });

          if (stillPlayers.length === 0) {
            await finishGame(gameId, null);
            await broadcastGameState(io, gameId);
            io.to(gameId).emit("game:winner", null);
          } else {
            await broadcastGameState(io, gameId);
          }
        }
      } catch (error) {
        console.error(`Error checking loteria for player ${playerId}:`, error);
      }
    }
  );
}
