import type { Server as SocketIOServer, Socket } from "socket.io";
import { prisma } from "../prisma";
import { GameStatus, PlayerStatus } from "@prisma/client";
import { endGame } from "./util";

export function registerSocketHandlers(io: SocketIOServer) {
  io.on("connection", (socket: Socket) => {
    console.log("Socket connected", socket.id);
    socket.on("disconnect", async () => {
      console.log(`A user disconnected: ${socket.id}`);
      if (socket.data.gameId && socket.data.playerId) {
        io.to(socket.data.gameId).emit("game:playerDisconnected", {
          playerId: socket.data.playerId,
        });

        try {
          await prisma.playerInGame.updateMany({
            where: { id: socket.data.playerId },
            data: { status: "Waiting" },
          });
        } catch (error) {
          console.error("Error updating player status on disconnect", error);
        }
      }
    });
    socket.on("player:joinRoom", async ({ playerId }) => {
      console.log("Player JoinRoom", socket.data);
      try {
        const player = await prisma.playerInGame.findFirst({
          where: { id: playerId },
        });

        if (player) {
          const gameId = player.gameSessionId;
          socket.join(gameId);
          socket.data.playerId = playerId;
          socket.data.gameId = gameId;

          // Emit game state on first connection or reconnection
          const gameSession = await prisma.gameSession.findFirst({
            where: { id: gameId },
          });

          if (gameSession) {
            socket.emit("game:state", {
              gameStatus: gameSession.status,
              drawnCards: gameSession.drawnCards,
              playerTabla: player.playerTabla,
              playerStatus: player.status,
              isHost: gameSession.hostPlayerId === playerId,
              playerId: player.id,
            });
          }

          console.log(
            `Socket ${socket.id} (Player ${playerId}) joined room ${gameId}`
          );
          socket.to(socket.data.gameId).emit("game:playerConnected", {
            playerId: player.id,
            playerName: player.name,
          });
        } else {
          socket.emit("error", { message: "Invalid player or game ID." });
        }
      } catch (error) {
        console.error("Error in player:joinRoom", error);
        socket.emit("error", { message: "An internal error occurred." });
      }
    });

    socket.on("player:pickTabla", async ({ tabla }: { tabla: string[] }) => {
      console.log("Player PickTabla", socket.data, socket.id);
      try {
        const player = await prisma.playerInGame.findFirst({
          where: {
            id: socket.data.playerId,
          },
        });

        if (player) {
          const gameSession = await prisma.gameSession.findFirst({
            where: { id: player.gameSessionId },
          });

          if (gameSession?.status === "Waiting") {
            await prisma.playerInGame.update({
              where: { id: player.id },
              data: { playerTabla: tabla, status: "Ready" },
            });
            socket.to(socket.data.gameId).emit("game:playerPickedTabla", {
              playerId: player.id,
              tabla,
            });
          } else {
            socket.emit("error", {
              message: "Game must be in the 'Waiting' state to select a tabla.",
            });
          }
        } else {
          socket.emit("error", { message: "Invalid player or game ID." });
        }
      } catch (error) {
        console.error("Error in player:pickTabla", error);
        socket.emit("error", { message: "An internal error occurred." });
      }
    });

    socket.on(
      "player:checkWinner",
      async ({ markedCards }: { markedCards: string[] }) => {
        console.log("Player checkWinner", socket.data, socket.id);
        try {
          const player = await prisma.playerInGame.findFirst({
            where: {
              id: socket.data.playerId,
              gameSessionId: socket.data.gameId,
            },
          });

          if (!player) {
            socket.emit("error", { message: "Invalid player or game ID." });
            return;
          }

          const gameSession = await prisma.gameSession.findFirst({
            where: { id: socket.data.gameId },
          });

          if (!gameSession) {
            socket.emit("error", { message: "Game session not found." });
            return;
          }

          const isWinner = markedCards.every(
            (card) =>
              player.playerTabla.includes(card) &&
              gameSession.drawnCards.includes(card)
          );

          if (isWinner) {
            await prisma.playerInGame.update({
              where: { id: player.id },
              data: { isWinner: true },
            });

            io.to(socket.data.gameId).emit("game:winnerDeclared", {
              playerId: player.id,
              playerName: player.name,
            });

            await endGame(socket.data.gameId);
          } else {
            socket.emit("error", {
              message: "Incorrect cards marked. You did not win.",
            });
          }
        } catch (error) {
          console.error("Error in player:checkWinner", error);
          socket.emit("error", { message: "An internal error occurred." });
        }
      }
    );

    socket.on("game:takeCard", async () => {
      console.log("Player takeCard", socket.data, socket.id);
      try {
        const gameSession = await prisma.gameSession.findFirst({
          where: { id: socket.data.gameId },
        });

        if (
          !gameSession ||
          !gameSession.initialDeckOrder ||
          gameSession.status !== GameStatus.Playing
        ) {
          socket.emit("error", { message: "Game session not found." });
          return;
        }

        const remainingDeck = gameSession.initialDeckOrder.filter(
          (card) => !gameSession.drawnCards.includes(card)
        );

        if (remainingDeck.length === 0) {
          await endGame(socket.data.gameId);
          io.emit("game:noWinner");
          return;
        }

        const nextCard = remainingDeck[0];
        await prisma.gameSession.update({
          where: { id: socket.data.gameId },
          data: { drawnCards: [...gameSession.drawnCards, nextCard] },
        });

        io.to(socket.data.gameId).emit("game:cardDrawn", { card: nextCard });
      } catch (error) {
        console.error("Error in game:takeCard", error);
        socket.emit("error", { message: "An internal error occurred." });
      }
    });
    socket.on("game:start", async () => {
      console.log("Player start", socket.data, socket.id);
      try {
        const gameSession = await prisma.gameSession.findFirst({
          where: { id: socket.data.gameId },
        });

        if (gameSession?.status === "Waiting") {
          await prisma.gameSession.update({
            where: { id: socket.data.gameId },
            data: { status: GameStatus.Playing },
          });

          await prisma.playerInGame.updateMany({
            where: { gameSessionId: socket.data.gameId },
            data: { isWinner: false, status: PlayerStatus.Playing },
          });
          const excludedPlayers = await prisma.playerInGame.findMany({
            where: { gameSessionId: socket.data.gameId, status: "Waiting" },
          });

          excludedPlayers.forEach((player) => {
            socket.to(socket.data.gameId).emit("game:playerExcluded", {
              playerId: player.id,
            });
          });

          io.to(socket.data.gameId).emit("game:started", {
            message: "Game has started!",
          });
        } else {
          socket.emit("error", {
            message: "Game must be in the 'Waiting' state to start.",
          });
        }
      } catch (error) {
        console.error("Error in game:start", error);
        socket.emit("error", { message: "An internal error occurred." });
      }
    });
  });
}
