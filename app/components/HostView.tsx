import { socket } from "~/client/socket";
import PlayerView, { type PlayerViewProps } from "./PlayerView";
import { ConfirmModal } from "./ConfirmModals";
import { useState } from "react";
import { PlayerList } from "./UIHelpers";

interface HostViewProps extends PlayerViewProps {}

export default function HostView({ gameState, playerId }: HostViewProps) {
  const handleDrawCard = () => {
    socket.emit("game:takeCard");
  };

  const [isDestroyModalOpen, setIsDestroyModalOpen] = useState(false);

  const handleConfirmDestroyRoom = () => {
    setIsDestroyModalOpen(false);
    socket.emit("game:destroy");
  };

  const handleCancelDestroyRoom = () => {
    setIsDestroyModalOpen(false);
  };

  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

  const handleConfirmFinishGame = () => {
    setIsFinishModalOpen(false);
    socket.emit("game:endRound");
  };

  const handleCancelFinishGame = () => {
    setIsFinishModalOpen(false);
  };

  const [isStartModalOpen, setIsStartModalOpen] = useState(false);

  const handleConfirmStartGame = () => {
    setIsStartModalOpen(false);
    socket.emit("game:start");
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
                className="hover:cursor-pointer  w-full rounded-lg bg-green-600 px-6 py-2 font-bold text-white z-50"
              >
                Start Game
              </button>
            )}
            {gameState.status === "Playing" && (
              <button
                onClick={handleDrawCard}
                className="hover:cursor-pointer  w-full rounded-lg bg-blue-600 px-6 py-2 font-bold text-white z-50"
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
              onClick={() => setIsFinishModalOpen(true)}
              className="hover:cursor-pointer  w-full rounded-lg bg-red-500 px-6 py-2 font-bold text-white z-50"
            >
              Finish Game
            </button>
          )}

          <button
            onClick={() => setIsDestroyModalOpen(true)}
            className="hover:cursor-pointer  w-full rounded-lg bg-red-600 px-6 py-2 font-bold text-white z-50"
          >
            Destroy Room
          </button>
        </div>
      </PlayerView>
    </>
  );
}
