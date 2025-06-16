import { getSessionCookie } from "~/.server/cookies";
import type { Route } from "./+types/game";
import { redirect, useNavigate } from "react-router";
import { getGame } from "~/.server/game";
import { useEffect, useState } from "react";
import { socket } from "~/client/socket";
import HostView from "~/components/HostView";
import PlayerView from "~/components/PlayerView";
import type { GameState } from "~/server/socket/interfaces";
import Loading from "~/components/Loading";

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
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    function onGameStateUpdate(data: GameState) {
      setGameState(data);
    }

    function onGameDestroyed() {
      alert("Game has been destroyed");
      navigate("/");
    }

    socket.connect();
    socket.emit("player:joinRoom", { playerId, gameId });
    socket.on("game:stateUpdate", onGameStateUpdate);
    socket.on("game:destroyed", onGameDestroyed);

    return () => {
      socket.off("game:stateUpdate", onGameStateUpdate);
      socket.off("game:destroyed", onGameDestroyed);
      socket.disconnect();
    };
  }, [playerId, gameId]);

  const isHost = gameState?.hostId === playerId;

  return (
    <>
      {!gameState ? (
        <Loading />
      ) : isHost ? (
        <HostView gameState={gameState} playerId={playerId} />
      ) : (
        <PlayerView gameState={gameState} playerId={playerId} />
      )}
    </>
  );
}
