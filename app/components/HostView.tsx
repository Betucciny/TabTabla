import { socket } from "~/client/socket";
import PlayerView, { type PlayerViewProps } from "./PlayerView";

interface HostViewProps extends PlayerViewProps {}

export default function HostView({ gameState }: HostViewProps) {
  const handleStartGame = () => socket.emit("game:start");

  const handleDrawCard = () => {
    socket.emit("game:takeCard");
  };

  return (
    <>
      <PlayerView gameState={gameState}>
        {gameState.status === "Waiting" && (
          <button
            onClick={handleStartGame}
            className="w-full rounded-lg bg-green-600 px-6 py-2 font-bold text-white"
          >
            Start Game
          </button>
        )}
        {gameState.status === "Playing" && (
          <button
            onClick={handleDrawCard}
            className="w-full rounded-lg bg-blue-600 px-6 py-2 font-bold text-white"
          >
            Draw Card
          </button>
        )}
      </PlayerView>
    </>
  );
}
