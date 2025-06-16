import { socket } from "~/client/socket";
import PlayerView, { type PlayerViewProps } from "./PlayerView";

interface HostViewProps extends PlayerViewProps {}

export default function HostView({ gameState, playerId }: HostViewProps) {
  const handleStartGame = () => {
    socket.emit("game:start");
  };

  const handleDrawCard = () => {
    socket.emit("game:takeCard");
  };

  const handleDestroyRoom = () => {
    socket.emit("game:destroy");
  };

  const handleFinishGame = () => {
    socket.emit("game:endRound");
  };

  return (
    <>
      <PlayerView
        gameState={gameState}
        playerId={playerId}
        topChildren={
          <>
            {gameState.status === "Waiting" && (
              <button
                onClick={handleStartGame}
                className="w-full rounded-lg bg-green-600 px-6 py-2 font-bold text-white z-50"
              >
                Start Game
              </button>
            )}
            {gameState.status === "Playing" && (
              <button
                onClick={handleDrawCard}
                className="w-full rounded-lg bg-blue-600 px-6 py-2 font-bold text-white z-50"
              >
                Draw Card
              </button>
            )}
          </>
        }
      >
        <div className="flex flex-col space-y-2">
          {gameState.status === "Playing" && (
            <button
              onClick={handleFinishGame}
              className="w-full rounded-lg bg-red-400 px-6 py-2 font-bold text-white z-50"
            >
              Finish Game
            </button>
          )}

          <button
            onClick={handleDestroyRoom}
            className="w-full rounded-lg bg-red-600 px-6 py-2 font-bold text-white z-50"
          >
            Destroy Room
          </button>
        </div>
      </PlayerView>
    </>
  );
}
