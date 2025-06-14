import { GameStatus, PlayerStatus } from "@prisma/client";
import { prisma } from "../prisma";
import { getShuffleCards } from "../shared/util";

export async function endGame(gameId: string) {
  try {
    const newDeckOrder = getShuffleCards().map((card) => card.title);
    await prisma.gameSession.update({
      where: { id: gameId },
      data: {
        status: GameStatus.Waiting,
        drawnCards: [],
        initialDeckOrder: newDeckOrder,
      },
    });

    await prisma.playerInGame.updateMany({
      where: { gameSessionId: gameId },
      data: { status: PlayerStatus.Waiting, isWinner: false },
    });
  } catch (error) {
    console.error("Error in endGame function", error);
  }
}
