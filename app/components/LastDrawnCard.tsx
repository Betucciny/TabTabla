import { useEffect, useRef, useState } from "react";
import { useSound } from "~/client/useSound";
import { ALL_CARDS_MAP, type Card } from "~/server/shared/cards";
import type { GameState } from "~/server/socket/interfaces";

export function LastDrawnCardBanner({ card }: { card: Card | null }) {
  if (!card)
    return (
      <div className="aspect-[2/3] animate-pulse rounded-lg bg-gray-300 h-auto lg:w-4/12 w-7/12"></div>
    );

  const randomSentence =
    card.sentences[Math.floor(Math.random() * card.sentences.length)];

  return (
    <div className="flex flex-row w-full grow items-center">
      <div
        className={`z-10 flex-4/12 relative cursor-pointer rounded-lg border-2 border-white bg-white p-1 shadow-md transition-transform duration-200 hover:scale-105 h-auto`}
      >
        <img
          src={card.image}
          alt={card.title}
          className="aspect-[2/3] w-full h-auto"
        />
      </div>
      <div className="mt-2 text-center text-md font-bold text-black bg-white rounded-lg flex-7/12 p-2 m-4">
        {randomSentence}
      </div>
    </div>
  );
}

export function CardToast({ gameState }: { gameState: GameState }) {
  const [toastCard, setToastCard] = useState<Card | null>(null);
  const [isVisible, setIsVisible] = useState(false);
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
      setIsVisible(true);

      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      const nullifyTimer = setTimeout(() => {
        setToastCard(null);
      }, 8000);

      return () => {
        clearTimeout(hideTimer);
        clearTimeout(nullifyTimer);
      };
    }
    prevDrawnCardsCount.current = gameState.drawnCards.length;
  }, [gameState.drawnCards, playCardSound]);

  const card = toastCard;

  if (!card) {
    return null;
  }

  return (
    <div
      className={`
            fixed top-5 right-5 z-50 flex items-center gap-4
            rounded-lg bg-loteria-cream p-4 text-loteria-blue shadow-2xl
            transition-all duration-1000 ease-in-out

            ${
              isVisible
                ? "translate-x-0 opacity-100" // State when visible
                : "translate-x-full opacity-0" // State when hidden
            }
          `}
    >
      <img
        src={card.image}
        alt={card.title}
        className="h-28 w-auto rounded-md shadow-md"
      />
      <span className="text-3xl font-bold">{card.title}</span>
    </div>
  );
}
