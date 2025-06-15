import { getSessionCookie } from "~/.server/cookies";
import type { Route } from "./+types/game";
import { redirect } from "react-router";
import { getGame } from "~/.server/game";
import { useEffect, useState } from "react";
import { socket } from "~/client/socket";
import HostView from "~/components/HostView";
import PlayerView from "~/components/PlayerView";
import type { GameState } from "~/server/socket/interfaces";

export async function loader({ params, request }: Route.LoaderArgs) {
  const session = await getSessionCookie(request.headers.get("Cookie"));
  const playerId = session.get("playerId");

  console.log("Player ID:", playerId);
  if (!playerId) {
    return redirect("/");
  }

  const game = await getGame(params.shortCode, playerId);
  console.log("Game:", game);
  if (!game.success || !game.data) {
    return redirect("/");
  }

  return { gameId: game.data.id, playerId: playerId };
}

export default function GamePage({ loaderData }: Route.ComponentProps) {
  const { gameId, playerId } = loaderData;

  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    function onGameStateUpdate(data: GameState) {
      setGameState(data);
    }
    socket.connect();
    socket.emit("player:joinRoom", { playerId, gameId });
    socket.on("game:stateUpdate", onGameStateUpdate);

    return () => {
      socket.off("game:stateUpdate", onGameStateUpdate);
      socket.disconnect();
    };
  }, [playerId, gameId]);

  return (
    <>
      {!gameState ? (
        <div>Loading...</div>
      ) : gameState.isHost ? (
        <HostView gameState={gameState} />
      ) : (
        <PlayerView gameState={gameState} />
      )}
    </>
  );
}
