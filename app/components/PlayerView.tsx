import { useEffect, useRef, useState } from "react";
import { ALL_CARDS_MAP, type Card, type Tabla } from "~/server/shared/cards";
import { PlayerTabla } from "./PlayerTabla";
import type { GameState } from "~/server/socket/interfaces";
import { BottomActionBar, PlayerList, Spacer } from "./UIHelpers";
import { socket } from "~/client/socket";
import { useMarkedCards } from "~/client/useMarkCards";
import { CardToast, LastDrawnCardBanner } from "./LastDrawnCard";
import { WinnerModal } from "./WinnerModal";
import { LastWinnerBanner } from "./LastWinnerBanner";
import CodeShowcase from "./CodeShowcase";
import { useNavigate } from "react-router";
import { ConfirmModal } from "./ConfirmModals";

export interface PlayerViewProps {
  gameState: GameState;
  playerId: string;
  children?: React.ReactNode;
  topChildren?: React.ReactNode;
}

export default function PlayerView({
  gameState,
  children,
  playerId,
  topChildren,
}: PlayerViewProps) {
  //Marked Cards
  const [markedCards, setMarkedCards] = useMarkedCards(gameState.id);

  function handleCardClick(cardName: string) {
    setMarkedCards((prev) => {
      if (prev.includes(cardName)) {
        return prev.filter((card) => card !== cardName);
      } else {
        return [...prev, cardName];
      }
    });
  }

  // Tabla Selection
  const [tablaCards, setSelectedTabla] = useState<Tabla>([]);
  const playerTabla = gameState.players.find((player) => player.id === playerId)
    ?.playerTabla!!;
  useEffect(() => {
    console.log("playerTabla", playerTabla);
    setSelectedTabla(
      playerTabla.map(
        (card) =>
          ALL_CARDS_MAP.find((card_complete) => card_complete.title === card)!!
      )
    );
  }, [playerTabla]);

  function randomTabla() {
    socket.emit("player:randomTabla");
  }

  // Last Drawn Card
  const staticBannerCardName =
    gameState.drawnCards[gameState.drawnCards.length - 1];
  const staticBannerCard: Card | null = staticBannerCardName
    ? ALL_CARDS_MAP.find((card) => card.title === staticBannerCardName) || null
    : null;

  // Loteria
  function handleLoteriaClick() {
    socket.emit("player:loteria", { markedCards: markedCards });
  }

  const navigate = useNavigate();

  const winnerName = gameState.players.find((player) => player.isWinner)?.name;
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  useEffect(() => {
    function handleWinner(winner: string | null) {
      setMarkedCards([]);
      setShowWinnerModal(true);
    }
    socket.on("game:winner", handleWinner);
    return () => {
      socket.off("game:winner", handleWinner);
    };
  });

  const playerStatus = gameState.players.find(
    (player) => player.id === playerId
  )?.status!!;

  const isHost =
    gameState.players.find((player) => player.id === gameState.hostId)?.id ===
    playerId;

  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const handleConfirmLeaveGame = () => {
    setIsLeaveModalOpen(false);
    socket.emit("player:leave", playerId);
    navigate("/");
  };

  const handleCancelLeaveGame = () => {
    setIsLeaveModalOpen(false);
  };

  return (
    <>
      <ConfirmModal
        title="Leave Game"
        isOpen={isLeaveModalOpen}
        onConfirm={handleConfirmLeaveGame}
        onCancel={handleCancelLeaveGame}
      >
        <p>Are you sure you want to leave the game?</p>
      </ConfirmModal>
      <div className="bg-loteria-blue-light text-white min-h-screen flex justify-center items-center">
        <div className="flex flex-col max-w-[1200px] lg:max-h-[990px] z-10 bg-loteria-blue shadow-lg rounded-xl md:px-5 bg-opacity-50">
          <BottomActionBar
            playerStatus={playerStatus}
            onLoteriaClick={handleLoteriaClick}
            disabled={
              gameState.status !== "Playing" ||
              playerStatus !== "Playing" ||
              markedCards.length !== 16
            }
            onHistoryClick={() =>
              alert(`History: ${gameState.drawnCards.join(", ")}`)
            }
          />
          <main className="flex-grow flex flex-col md:flex-row items-stretch z-50 justify-around">
            <div className="w-full z-50 relative">
              {playerStatus === "Waiting" && (
                <div className="absolute inset-0 bg-loteria-gray z-50 rounded-lg m-2"></div>
              )}
              <div className="flex items-center h-full">
                <PlayerTabla
                  cards={tablaCards}
                  markedCards={markedCards}
                  onCardClick={handleCardClick}
                />
              </div>
            </div>

            <aside className="flex flex-col p-4 w-full items-stretch justify-between lg:max-h-[1080px]">
              <div className="w-full space-y-1 flex flex-col">
                {topChildren}
                {gameState.status === "Waiting" && (
                  <button
                    onClick={randomTabla}
                    className="hover:cursor-pointer rounded-lg bg-white/20 px-6 py-2 font-semibold transition hover:bg-white/30 w-full z-50"
                  >
                    Random Tabla
                  </button>
                )}
                <CodeShowcase code={gameState.shortCode} />
              </div>
              <div className="flex flex-col items-center justify-around p-4 space-y-2 space-x-0  ">
                <LastDrawnCardBanner card={staticBannerCard} />
                <LastWinnerBanner winnerName={winnerName ?? null} />
              </div>
              <div>
                <PlayerList
                  players={gameState.players}
                  isHeightLimited={true}
                />
                {children}
                {!isHost && (
                  <button
                    onClick={() => setIsLeaveModalOpen(true)}
                    className="hover:cursor-pointer  w-full rounded-lg bg-red-500 px-6 py-2 font-bold text-white z-50"
                  >
                    Exit Game
                  </button>
                )}
              </div>
            </aside>
          </main>
        </div>
      </div>
      <WinnerModal
        isOpen={showWinnerModal}
        onClose={() => setShowWinnerModal(false)}
        winnerName={winnerName ?? null}
      />
      <CardToast gameState={gameState} />
    </>
  );
}
