import { useEffect, useRef, useState } from "react";
import { ALL_CARDS_MAP, type Card, type Tabla } from "~/server/shared/cards";
import { PlayerTabla } from "./PlayerTabla";
import type { GameState } from "~/server/socket/interfaces";
import { PlayerList, Spacer } from "./UIHelpers";
import { socket } from "~/client/socket";
import { useMarkedCards } from "~/client/useMarkCards";
import { CardToast, LastDrawnCardBanner } from "./LastDrawnCard";
import { WinnerModal } from "./WinnerModal";
import { LastWinnerBanner } from "./LastWinnerBanner";
import CodeShowcase from "./CodeShowcase";
import { useNavigate } from "react-router";
import { ConfirmModal } from "./ConfirmModals";
import { SoundToggle } from "./SoundToggle";

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

  // Loading states for actions
  const [isCallingLoteria, setIsCallingLoteria] = useState(false);
  const [isRandomizingTabla, setIsRandomizingTabla] = useState(false);
  const [isLeavingGame, setIsLeavingGame] = useState(false);

  // Swipe handling state
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);

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
  const playerTabla = gameState.players.find(
    (player) => player.id === playerId,
  )?.playerTabla!!;
  useEffect(() => {
    setSelectedTabla(
      playerTabla
        .map((card) =>
          ALL_CARDS_MAP.find((card_complete) => card_complete.title === card),
        )
        .filter((card) => card !== null && card !== undefined) as Tabla,
    );
  }, [playerTabla]);

  function randomTabla() {
    if (isRandomizingTabla) return;
    setIsRandomizingTabla(true);
    socket.emit("player:randomTabla");
    setTimeout(() => setIsRandomizingTabla(false), 1000);
  }

  // Swipe handlers for overlay
  const handleTouchStart = (e: React.TouchEvent) => {
    console.log("Touch Start");
    if (gameState.status !== "Waiting") return;
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setSwipeDirection(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || gameState.status !== "Waiting") return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;

    // Determine swipe direction (horizontal)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      setSwipeDirection(deltaX > 0 ? "right" : "left");
    }
  };

  const handleTouchEnd = () => {
    if (gameState.status !== "Waiting") return;

    if (
      (swipeDirection === "left" || swipeDirection === "right") &&
      !isRandomizingTabla
    ) {
      randomTabla();
    }
    setTouchStart(null);
    setSwipeDirection(null);
  };

  // Last Drawn Card
  const staticBannerCardName =
    gameState.drawnCards[gameState.drawnCards.length - 1];
  const staticBannerCard: Card | null = staticBannerCardName
    ? ALL_CARDS_MAP.find((card) => card.title === staticBannerCardName) || null
    : null;

  // Loteria
  function handleLoteriaClick() {
    if (isCallingLoteria) return;
    setIsCallingLoteria(true);
    socket.emit("player:loteria", { markedCards: markedCards });
    setTimeout(() => setIsCallingLoteria(false), 2000);
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
    (player) => player.id === playerId,
  )?.status!!;

  const isHost =
    gameState.players.find((player) => player.id === gameState.hostId)?.id ===
    playerId;

  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const handleConfirmLeaveGame = () => {
    if (isLeavingGame) return;
    setIsLeaveModalOpen(false);
    setIsLeavingGame(true);
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
      <div className="bg-loteria-blue-light text-white min-h-screen flex justify-center items-center z-50">
        <div className="flex flex-col max-w-[1200px] lg:max-h-[990px] z-10 bg-loteria-blue shadow-lg rounded-xl md:px-5 bg-opacity-50">
          <div className="flex flex-col gap-4 bg-loteria-blue p-4 shadow-lg z-50">
            <div className="flex items-center justify-between bg-white/10 p-2 rounded-lg">
              <div className="flex items-center">
                <span className="text-sm font-medium text-white">Status:</span>
                <span className="ml-2 text-sm font-bold text-loteria-orange">
                  {playerStatus}
                </span>
              </div>
              <SoundToggle />
            </div>
          </div>
          <main className="flex-grow flex flex-col md:flex-row items-stretch z-50 justify-around">
            <div className="w-full z-50 relative">
              {playerStatus === "Waiting" && (
                <div
                  className="absolute inset-0 bg-loteria-gray z-50 rounded-lg m-2 flex items-center justify-center"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {(swipeDirection === "left" ||
                    swipeDirection === "right") && (
                    <div className="text-white text-2xl font-bold animate-bounce bg-blue-500 px-6 py-3 rounded-lg">
                      Release to randomize!
                    </div>
                  )}
                </div>
              )}
              <div className="flex items-center h-full">
                <PlayerTabla
                  cards={tablaCards}
                  markedCards={markedCards}
                  onCardClick={handleCardClick}
                  canCallLoteria={
                    gameState.status === "Playing" &&
                    playerStatus === "Playing" &&
                    markedCards.length === 16 &&
                    !isCallingLoteria
                  }
                  onLoteriaClick={handleLoteriaClick}
                  isCallingLoteria={isCallingLoteria}
                  showRandomButton={gameState.status === "Waiting"}
                  onRandomTabla={randomTabla}
                  isRandomizing={isRandomizingTabla}
                />
              </div>
            </div>

            <aside className="flex flex-col p-4 w-full items-stretch justify-between lg:max-h-[1080px]">
              <div className="w-full space-y-1 flex flex-col">
                {topChildren}
                {gameState.status === "Waiting" && (
                  <button
                    onClick={randomTabla}
                    disabled={isRandomizingTabla}
                    className={`rounded-lg bg-white/20 px-6 py-2 font-semibold transition w-full z-50 ${
                      isRandomizingTabla
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:cursor-pointer hover:bg-white/30"
                    }`}
                  >
                    {isRandomizingTabla ? "Randomizing..." : "Random Tabla"}
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
                    disabled={isLeavingGame}
                    className={`w-full rounded-lg bg-red-500 px-6 py-2 font-bold text-white z-50 ${
                      isLeavingGame
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:cursor-pointer"
                    }`}
                  >
                    {isLeavingGame ? "Leaving..." : "Exit Game"}
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
