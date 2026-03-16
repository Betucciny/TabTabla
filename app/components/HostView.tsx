import { socket } from "~/client/socket";
import PlayerView, { type PlayerViewProps } from "./PlayerView";
import { ConfirmModal } from "./ConfirmModals";
import { useState } from "react";
import { PlayerList } from "./UIHelpers";

interface HostViewProps extends PlayerViewProps {}

export default function HostView({ gameState, playerId }: HostViewProps) {
  const [isDrawingCard, setIsDrawingCard] = useState(false);
  const [isStartingGame, setIsStartingGame] = useState(false);
  const [isFinishingGame, setIsFinishingGame] = useState(false);
  const [isDestroyingRoom, setIsDestroyingRoom] = useState(false);

  const handleDrawCard = () => {
    if (isDrawingCard) return;
    setIsDrawingCard(true);
    socket.emit("game:takeCard");
    setTimeout(() => setIsDrawingCard(false), 1000);
  };

  const [isDestroyModalOpen, setIsDestroyModalOpen] = useState(false);

  const handleConfirmDestroyRoom = () => {
    if (isDestroyingRoom) return;
    setIsDestroyModalOpen(false);
    setIsDestroyingRoom(true);
    socket.emit("game:destroy");
  };

  const handleCancelDestroyRoom = () => {
    setIsDestroyModalOpen(false);
  };

  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

  const handleConfirmFinishGame = () => {
    if (isFinishingGame) return;
    setIsFinishModalOpen(false);
    setIsFinishingGame(true);
    socket.emit("game:endRound");
    setTimeout(() => setIsFinishingGame(false), 1000);
  };

  const handleCancelFinishGame = () => {
    setIsFinishModalOpen(false);
  };

  const [isStartModalOpen, setIsStartModalOpen] = useState(false);

  const handleConfirmStartGame = () => {
    if (isStartingGame) return;
    setIsStartModalOpen(false);
    setIsStartingGame(true);
    socket.emit("game:start");
    setTimeout(() => setIsStartingGame(false), 1000);
  };

  const handleCancelStartGame = () => {
    setIsStartModalOpen(false);
  };

  return (
    <>
      <ConfirmModal
        isOpen={isDestroyModalOpen}
        title="Confirm Destroy Room"
        onConfirm={handleConfirmDestroyRoom}
        onCancel={handleCancelDestroyRoom}
      >
        <p>Are you sure you want to destroy the room?</p>
      </ConfirmModal>
      <ConfirmModal
        isOpen={isFinishModalOpen}
        title="Confirm Finish Game"
        onConfirm={handleConfirmFinishGame}
        onCancel={handleCancelFinishGame}
      >
        <p>Are you sure you want to finish the round?</p>
      </ConfirmModal>
      <ConfirmModal
        isOpen={isStartModalOpen}
        title="Confirm Start Game"
        onConfirm={handleConfirmStartGame}
        onCancel={handleCancelStartGame}
      >
        <p>Are you sure you want to start the game?</p>
        <PlayerList players={gameState.players} isHeightLimited={false} />
      </ConfirmModal>
      <PlayerView
        gameState={gameState}
        playerId={playerId}
        topChildren={
          <>
            {gameState.status === "Waiting" && (
              <button
                onClick={() => setIsStartModalOpen(true)}
                disabled={isStartingGame}
                className={`w-full rounded-lg bg-green-600 px-6 py-2 font-bold text-white z-50 ${
                  isStartingGame
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:cursor-pointer"
                }`}
              >
                {isStartingGame ? "Starting..." : "Start Game"}
              </button>
            )}
            {gameState.status === "Playing" && (
              <button
                onClick={handleDrawCard}
                disabled={isDrawingCard}
                className={`w-full rounded-lg bg-blue-600 px-6 py-2 font-bold text-white z-50 ${
                  isDrawingCard
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:cursor-pointer"
                }`}
              >
                {isDrawingCard ? "Drawing..." : "Draw Card"}
              </button>
            )}
          </>
        }
      >
        <div className="flex flex-col space-y-2">
          {gameState.status === "Playing" && (
            <button
              onClick={() => setIsFinishModalOpen(true)}
              disabled={isFinishingGame}
              className={`w-full rounded-lg bg-red-500 px-6 py-2 font-bold text-white z-50 ${
                isFinishingGame
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:cursor-pointer"
              }`}
            >
              {isFinishingGame ? "Finishing..." : "Finish Game"}
            </button>
          )}

          <button
            onClick={() => setIsDestroyModalOpen(true)}
            disabled={isDestroyingRoom}
            className={`w-full rounded-lg bg-red-600 px-6 py-2 font-bold text-white z-50 ${
              isDestroyingRoom
                ? "opacity-50 cursor-not-allowed"
                : "hover:cursor-pointer"
            }`}
          >
            {isDestroyingRoom ? "Destroying..." : "Destroy Room"}
          </button>
        </div>
      </PlayerView>
    </>
  );
}
