import { getSessionCookie } from "~/.server/cookies";
import type { Route } from "./+types/game";
import { redirect } from "react-router";
import { getGame } from "~/.server/game";
import { useEffect, useState } from "react";
import { socket } from "~/client/socket";
import type { GameStatus, PlayerStatus } from "@prisma/client";

export async function loader({ params, request }: Route.LoaderArgs) {
  const session = await getSessionCookie(request.headers.get("Cookie"));
  const playerId = session.get("playerId");

  if (!playerId) {
    return redirect("/");
  }

  const game = await getGame(params.shortCode, playerId);
  if (!game.success || !game.data) {
    return redirect("/");
  }

  const isHost = game.data.hostId === playerId;

  return { gameData: game.data, playerId, isHost };
}

export default function Waiting({ loaderData }: Route.ComponentProps) {
  console.log("loaderData", loaderData);
  const { gameData, playerId } = loaderData;

  const [gameState, setGameState] = useState({
    gameStatus: gameData.gameStatus,
    drawnCards: gameData.drawnCards,
    playerTabla: gameData.playerTabla || [],
    playerStatus: gameData.playerStatus,
  });

  useEffect(() => {
    function onConnect() {
      socket.emit("player:joinRoom", { playerId });
    }

    function onGameState(message: {
      gameStatus: GameStatus;
      drawnCards: string[];
      playerTabla: string[];
      playerStatus: PlayerStatus;
    }) {
      setGameState({
        gameStatus: message.gameStatus,
        drawnCards: message.drawnCards,
        playerTabla: message.playerTabla,
        playerStatus: message.playerStatus,
      });
    }

    function onCardDrawn(message: { card: string }) {
      setGameState((prevState) => ({
        ...prevState,
        drawnCards: [...prevState.drawnCards, message.card],
      }));
    }

    function onWinnerDeclared(message: { playerName: string }) {
      alert(`Player ${message.playerName} has won the game!`);
      setGameState((prevState) => ({
        ...prevState,
        gameStatus: "Waiting",
        drawnCards: [],
      }));
    }

    socket.connect();

    socket.on("connect", onConnect);
    socket.on("game:state", onGameState);
    socket.on("game:cardDrawn", onCardDrawn);
    socket.on("game:winnerDeclared", onWinnerDeclared);
    socket.on(
      "game:playerConnected",
      (message: { playerId: string; playerName: string }) => {
        console.log(
          `Player connected: ${message.playerName} (${message.playerId})`
        );
      }
    );
    socket.on("game:playerDisconnected", (message: { playerId: string }) => {
      console.log(`Player disconnected: ${message.playerId}`);
    });
    socket.on(
      "game:playerPickedTabla",
      (message: { playerId: string; tabla: string[] }) => {
        console.log(
          `Player ${message.playerId} picked a tabla:`,
          message.tabla
        );
      }
    );
    socket.on("game:playerExcluded", (message: { playerId: string }) => {
      console.log(`Player excluded: ${message.playerId}`);
    });
    socket.on("game:noWinner", () => {
      alert("No winner for this game. The game has ended.");
    });

    return () => {
      socket.disconnect();
      socket.off("connect", onConnect);
      socket.off("game:state", onGameState);
      socket.off("game:cardDrawn", onCardDrawn);
      socket.off("game:winnerDeclared", onWinnerDeclared);
      socket.off("game:playerConnected");
      socket.off("game:playerDisconnected");
      socket.off("game:playerPickedTabla");
      socket.off("game:playerExcluded");
      socket.off("game:noWinner");
      socket.close();
    };
  }, [playerId]);

  function onStart(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    socket.timeout(5000).emit("game:start", { playerId });
  }

  return (
    <div>
      <h1>
        {gameState.gameStatus === "Waiting"
          ? "Waiting for players..."
          : "Game in progress"}
      </h1>
      <div>
        <h2>Drawn Cards:</h2>
        <ul>
          {gameState.drawnCards.map((card, index) => (
            <li key={index}>{card}</li>
          ))}
        </ul>
      </div>
      {gameState.gameStatus === "Waiting" && playerId === gameData.hostId && (
        <div className="mt-6">
          <button
            onClick={onStart}
            className="w-full rounded-lg bg-green-600 px-4 py-3 text-lg font-bold
                       text-white transition duration-300 ease-in-out hover:bg-green-700
                       hover:scale-105 transform"
          >
            Start Game
          </button>
        </div>
      )}
      {gameState.gameStatus === "Playing" && playerId === gameData.hostId && (
        <div className="mt-6">
          <button
            onClick={() => {
              socket.emit("game:takeCard");
            }}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-lg font-bold
                       text-white transition duration-300 ease-in-out hover:bg-blue-700
                       hover:scale-105 transform"
          >
            Take a Card
          </button>
        </div>
      )}
    </div>
  );
}
