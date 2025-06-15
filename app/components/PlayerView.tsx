import { useEffect, useRef, useState } from "react";
import { ALL_CARDS_MAP, type Card, type Tabla } from "~/server/shared/cards";
import { PlayerTabla } from "./PlayerTabla";
import type { GameState } from "~/server/socket/interfaces";
import { BottomActionBar, PlayerList } from "./UIHelpers";
import { TablaSelectionModal } from "./TablaSelectionModal";
import { socket } from "~/client/socket";
import { useMarkedCards } from "~/client/useMarkCards";
import { CardToast, LastDrawnCardBanner } from "./LastDrawnCard";
import { WinnerModal } from "./WinnerModal";
import { LastWinnerBanner } from "./LastWinnerBanner";

export interface PlayerViewProps {
  gameState: GameState;
  children?: React.ReactNode;
}

export default function PlayerView({ gameState, children }: PlayerViewProps) {
  //Marked Cards
  const [markedCards, setMarkedCards] = useMarkedCards(gameState.id);
  useEffect(() => {
    if (gameState.status === "Playing" && gameState.drawnCards.length === 0) {
      setMarkedCards([]);
    }
  }, [gameState.status, gameState.drawnCards, setMarkedCards]);

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
  const [showTablaSelectionModal, setShowTablaSelectionModal] = useState(false);
  useEffect(() => {
    setSelectedTabla(
      gameState.playerTabla.map(
        (card) =>
          ALL_CARDS_MAP.find((card_complete) => card_complete.title === card)!!
      )
    );
  }, [gameState.playerTabla]);

  const handleConfirmTablaSelection = (selectedTabla: Tabla) => {
    const selectedTablaNames = selectedTabla.map((card) => card.title);
    console.log("Emitting player:selectTabla with data:", {
      tabla: selectedTablaNames,
    });
    setSelectedTabla(selectedTabla);
    setShowTablaSelectionModal(false);
    socket.emit("player:selectTabla", { tabla: selectedTablaNames });
  };

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

  const winnerName = gameState.players.find((player) => player.isWinner)?.name;
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  useEffect(() => {
    function handleWinner(winner: string | null) {
      setSelectedTabla([]);
      setMarkedCards([]);
      setShowWinnerModal(true);
    }
    socket.on("game:winner", handleWinner);
    return () => {
      socket.off("game:winner", handleWinner);
    };
  });

  return (
    <>
      <div className="flex h-screen flex-col bg-loteria-blue text-white">
        <BottomActionBar
          playerStatus={gameState.playerStatus}
          onLoteriaClick={handleLoteriaClick}
          disabled={
            gameState.status !== "Playing" ||
            gameState.playerStatus !== "Playing"
          }
          onHistoryClick={() =>
            alert(`History: ${gameState.drawnCards.join(", ")}`)
          }
        />
        <main className="flex-grow flex flex-col md:flex-row overflow-y-auto">
          <div className="md:w-4xl">
            <PlayerTabla
              cards={tablaCards}
              markedCards={markedCards}
              onCardClick={handleCardClick}
            />
          </div>

          <aside className="flex flex-col p-4 w-full space-y-2 items-stretch justify-between h-full">
            <div className="w-full space-y-1">
              {gameState.status === "Waiting" && (
                <button
                  onClick={() => setShowTablaSelectionModal(true)}
                  className="rounded-lg bg-white/20 px-6 py-2 font-semibold transition hover:bg-white/30 w-full"
                >
                  Change Tabla
                </button>
              )}
            </div>
            <div className="flex flex-row items-center justify-around p-4 space-x-4">
              <div className="md:w-3xs w-xs">
                <LastDrawnCardBanner card={staticBannerCard} />
              </div>
              <LastWinnerBanner winnerName={winnerName ?? null} />
            </div>
            {children}
            <PlayerList players={gameState.players} />
          </aside>
        </main>
      </div>
      <TablaSelectionModal
        isOpen={showTablaSelectionModal}
        onClose={() => setShowTablaSelectionModal(false)}
        onConfirm={handleConfirmTablaSelection}
      />
      <WinnerModal
        isOpen={showWinnerModal}
        onClose={() => setShowWinnerModal(false)}
        winnerName={winnerName ?? null}
      />
      <CardToast gameState={gameState} />
    </>
  );
}
