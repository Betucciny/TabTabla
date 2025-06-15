import { useEffect, useRef, useState } from "react";
import { useSound } from "~/client/useSound";
import { ALL_CARDS_MAP, type Card } from "~/server/shared/cards";
import type { GameState } from "~/server/socket/interfaces";

export function LastDrawnCardBanner({ card }: { card: Card | null }) {
  if (!card)
    return (
      <div className="aspect-[2/3] animate-pulse rounded-lg bg-gray-300 h-auto"></div>
    );

  return (
    <div
      className={`z-10 relative cursor-pointer rounded-lg border-2 border-white bg-white p-1 shadow-md transition-transform duration-200 hover:scale-105 h-auto`}
    >
      <img
        src={card.image}
        alt={card.title}
        className="aspect-[2/3] w-full h-auto"
      />
    </div>
  );
}

export function CardToast({ gameState }: { gameState: GameState }) {
  const [toastCard, setToastCard] = useState<Card | null>(null);
  const playCardSound = useSound("/card.mp3");
  const prevDrawnCardsCount = useRef(gameState.drawnCards.length);

  useEffect(() => {
    if (gameState.drawnCards.length > prevDrawnCardsCount.current) {
      const latestCardName =
        gameState.drawnCards[gameState.drawnCards.length - 1];
      const newCard = latestCardName
        ? ALL_CARDS_MAP.find((card) => card.title === latestCardName) || null
        : null;

      playCardSound();
      setToastCard(newCard);

      const timer = setTimeout(() => {
        setToastCard(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
    prevDrawnCardsCount.current = gameState.drawnCards.length;
  }, [gameState.drawnCards, playCardSound]); // The dependency array is now simple and correct.

  const isVisible = toastCard !== null;
  const card = toastCard;

  console.log(isVisible);
  if (!card) {
    return null;
  }

  return (
    <div
      className={`
        fixed top-5 right-5 z-50 flex items-center gap-4
        rounded-lg bg-loteria-cream p-4 text-loteria-blue shadow-2xl
        transition-all duration-500 ease-in-out
        ${
          isVisible
            ? "translate-x-0 opacity-100" // State when visible: at its position, fully opaque
            : "translate-x-full opacity-0" // State when hidden: moved off-screen to the right, fully transparent
        }
      `}
    >
      <img
        src={card.image}
        alt={card.title}
        className="h-20 w-auto rounded-md shadow-md"
      />
      <span className="text-3xl font-bold">{card.title}</span>
    </div>
  );
}
