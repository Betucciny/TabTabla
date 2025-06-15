import type { GameStatus, PlayerStatus } from "@prisma/client";
import { prisma } from "~/server/prisma";
import { generateUniqueShortCode, getShuffleCards } from "./util";

export type GameResponse<T> = {
  data: T | null;
  success: boolean;
  error: string | null;
};

export async function createGame(
  playerName: string
): Promise<GameResponse<{ shortCode: string; playerId: string }>> {
  try {
    const shortCode = generateUniqueShortCode();
    const initialDeck = getShuffleCards();

    const newGameSession = await prisma.gameSession.create({
      data: {
        shortCode,
        initialDeckOrder: initialDeck.map((card) => card.title),
      },
    });

    const hostPlayer = await prisma.playerInGame.create({
      data: {
        name: playerName,
        playerTabla: [],
        gameSessionId: newGameSession.id,
      },
    });

    await prisma.gameSession.update({
      where: { id: newGameSession.id },
      data: { hostPlayerId: hostPlayer.id },
    });

    return {
      data: { shortCode, playerId: hostPlayer.id },
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Error in createGameAction:", error);
    return {
      data: null,
      success: false,
      error: "An internal error occurred. Please try again.",
    };
  }
}

export async function joinGame(
  shortCode: string,
  playerName: string
): Promise<
  GameResponse<{
    shortCode: string;
    playerId: string;
  }>
> {
  try {
    const game = await prisma.gameSession.findUnique({
      where: { shortCode },
      include: {
        players: true,
      },
    });

    if (!game) {
      return {
        data: null,
        success: false,
        error: "Game not found.",
      };
    }

    const player = await prisma.playerInGame.create({
      data: {
        name: playerName,
        playerTabla: [],
        gameSessionId: game.id,
      },
    });

    return {
      data: { shortCode: game.shortCode, playerId: player.id },
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Error in joinGameAction:", error);
    return {
      data: null,
      success: false,
      error: "An internal error occurred. Please try again.",
    };
  }
}

export async function getGame(
  shortCode: string,
  playerId: string
): Promise<
  GameResponse<{
    id: string;
    hostId: string;
    gameStatus: GameStatus;
    drawnCards: string[];
    playerTabla: string[];
    playerStatus: PlayerStatus;
    isHost: boolean;
    playerId: string;
    players: {
      id: string;
      name: string;
      status: PlayerStatus;
      tabla: string[];
    }[];
  }>
> {
  try {
    const game = await prisma.gameSession.findUnique({
      where: { shortCode },
      include: {
        players: true,
      },
    });

    if (!game) {
      return {
        data: null,
        success: false,
        error: "Game not found.",
      };
    }

    const player = game.players.find((player) => player.id === playerId);

    if (!player || !game.hostPlayerId) {
      return {
        data: null,
        success: false,
        error: "Player not found in game.",
      };
    }

    return {
      data: {
        id: game.id,
        hostId: game.hostPlayerId,
        gameStatus: game.status,
        drawnCards: game.drawnCards,
        playerTabla: player.playerTabla,
        playerStatus: player.status,
        isHost: player.id === game.hostPlayerId,
        playerId: player.id,
        players: game.players.map((player) => ({
          id: player.id,
          name: player.name,
          status: player.status,
          tabla: player.playerTabla,
        })),
      },
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Error in getGameAction:", error);
    return {
      data: null,
      success: false,
      error: "An internal error occurred. Please try again.",
    };
  }
}
