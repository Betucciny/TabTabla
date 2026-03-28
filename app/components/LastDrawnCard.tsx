import { useEffect, useRef, useState } from "react";
import { useSoundEffect } from "~/client/useSound";
import { ALL_CARDS_MAP, type Card } from "~/server/shared/cards";
import type { GameState } from "~/server/socket/interfaces";
import LoteriaCard from "./PlayerTabla";

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
        <div className="absolute -top-2 -left-2 bg-loteria-orange text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-lg">
          {card.id}
        </div>
      </div>
      <div className="flex flex-col mt-2 text-center text-md font-bold text-black bg-white rounded-lg flex-7/12 p-2 m-4">
        <span className="text-lg font-black text-loteria-blue mb-2">
          {card.title}
        </span>
        <span className="text-md">{randomSentence}</span>
      </div>
    </div>
  );
}

export function CardToast({ gameState }: { gameState: GameState }) {
  const [toastCard, setToastCard] = useState<Card | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const playCardSound = useSoundEffect("/card.mp3");
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
      }, 2000);

      return () => {
        clearTimeout(hideTimer);
      };
    }
    if (gameState.status === "Waiting") {
      setIsVisible(false);
    }
    prevDrawnCardsCount.current = gameState.drawnCards.length;
  }, [gameState.drawnCards, playCardSound, gameState.status]);

  const card = toastCard;

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
      {card && (
        <>
          <img
            src={card.image}
            alt={card.title}
            className="h-28 w-auto rounded-md shadow-md"
          />
          <div className="absolute -top-1 -left-1 bg-loteria-orange text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-lg">
            {card.id}
          </div>
          <span className="text-3xl font-bold">{card.title}</span>
        </>
      )}
    </div>
  );
}
