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
import { PapelPicadoBackground } from "~/components/PapelPicadoBackground";
import { ALL_CARDS_MAP } from "~/server/shared/cards";
import { useImagePreloader } from "~/client/useImagePreloader";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `TabTabla Lotería - ${params.shortCode}` },
    { name: "description", content: `Juego de Lotería | ${params.shortCode}` },
  ];
}

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

  return { gameId: game.data.id, playerId: playerId };
}

const allImageUrls = ALL_CARDS_MAP.map((card) => card.image);

export default function GamePage({ loaderData }: Route.ComponentProps) {
  const { gameId, playerId } = loaderData;
  const navigate = useNavigate();
  const { isLoading } = useImagePreloader(allImageUrls);
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    function onGameStateUpdate(data: GameState) {
      console.log("Game State Updated");
      setGameState(data);
    }

    function onGameDestroyed() {
      alert("Game has been destroyed");
      navigate("/");
    }

    socket.emit("player:joinRoom", { playerId, gameId });
    socket.on("game:stateUpdate", onGameStateUpdate);
    socket.on("game:destroyed", onGameDestroyed);

    return () => {
      socket.off("game:stateUpdate", onGameStateUpdate);
      socket.off("game:destroyed", onGameDestroyed);
    };
  }, [playerId, gameId]);

  const isHost = gameState?.hostId === playerId;

  return (
    <>
      <PapelPicadoBackground position="top" />
      <PapelPicadoBackground position="bottom" />
      {!gameState || isLoading ? (
        <Loading />
      ) : isHost ? (
        <HostView gameState={gameState} playerId={playerId} />
      ) : (
        <PlayerView gameState={gameState} playerId={playerId} />
      )}
    </>
  );
}
