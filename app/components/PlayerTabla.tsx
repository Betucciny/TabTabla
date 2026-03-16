import { useState } from "react";
import type { Card } from "~/.server/cards";

type PlayerTablaProps = {
  cards: Card[];
  markedCards: string[];
  onCardClick: (cardName: string) => void;
  canCallLoteria?: boolean;
  onLoteriaClick?: () => void;
  isCallingLoteria?: boolean;
  showRandomButton?: boolean;
  onRandomTabla?: () => void;
  isRandomizing?: boolean;
};

export function PlayerTabla({
  cards,
  markedCards,
  onCardClick,
  canCallLoteria = false,
  onLoteriaClick,
  isCallingLoteria = false,
  showRandomButton = false,
  onRandomTabla,
  isRandomizing = false,
}: PlayerTablaProps) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    console.log("Start Touch");
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setSwipeDirection(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    console.log("Touch Move");
    if (!touchStart) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;

    // Determine swipe direction (horizontal)
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > 50) {
        setSwipeDirection(deltaX > 0 ? "right" : "left");
      }
    }
  };

  const handleTouchEnd = () => {
    console.log("Touch End");
    if (
      (swipeDirection === "left" || swipeDirection === "right") &&
      showRandomButton &&
      onRandomTabla &&
      !isRandomizing
    ) {
      onRandomTabla();
    }
    setTouchStart(null);
    setSwipeDirection(null);
  };

  return (
    <div
      className="relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Random Tabla Button - Top Right */}
      {showRandomButton && onRandomTabla && (
        <div className="absolute top-2 right-2 z-50 pointer-events-none">
          <button
            onClick={onRandomTabla}
            disabled={isRandomizing}
            className={`pointer-events-auto rounded-full bg-loteria-orange p-4 md:p-6 text-white shadow-2xl transform transition-all duration-200 border-4 border-yellow-300 ${
              isRandomizing
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-110 hover:rotate-180"
            }`}
            title="Random Tabla (or swipe left/right)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 md:h-8 md:w-8 ${
                isRandomizing ? "animate-spin" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Swipe indicator */}
      {(swipeDirection === "left" || swipeDirection === "right") &&
        showRandomButton && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40 bg-blue-500/20">
            <div className="text-white text-2xl font-bold animate-bounce">
              Release to randomize!
            </div>
          </div>
        )}

      <div className="grid grid-cols-4 gap-2 p-4 ">
        {cards.length === 0
          ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (index) => (
                <div
                  key={index}
                  className={`z-10 relative cursor-pointer rounded-lg border-2 border-white bg-white p-1 shadow-md transition-transform duration-200 hover:scale-105 h-auto`}
                >
                  <img
                    src={`/question.png`}
                    alt={`Placeholder ${index}`}
                    className="aspect-[2/3] w-full h-auto"
                  />
                </div>
              )
            )
          : cards.map((card) => (
              <LoteriaCard
                key={card.title}
                card={card}
                isMarked={markedCards.includes(card.title)}
                onClick={() => onCardClick(card.title)}
              />
            ))}
      </div>

      {/* Loteria Button - Center */}
      {canCallLoteria && onLoteriaClick && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            onClick={onLoteriaClick}
            disabled={isCallingLoteria}
            className={`pointer-events-auto z-50 rounded-full bg-loteria-orange px-12 py-8 text-4xl font-black text-white shadow-2xl transform transition-transform duration-200 border-8 border-yellow-300 ${
              isCallingLoteria
                ? "opacity-75 cursor-not-allowed"
                : "animate-bounce hover:scale-110"
            }`}
          >
            {isCallingLoteria ? "Calling..." : "¡LOTERÍA!"}
          </button>
        </div>
      )}
    </div>
  );
}

interface CardProps {
  card: Card;
  isMarked: boolean;
  onClick: () => void;
}

export default function LoteriaCard({ card, isMarked, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`z-10 relative cursor-pointer rounded-lg border-2 border-white bg-white p-1 shadow-md transition-transform duration-200 hover:scale-105 h-auto`}
    >
      <img
        src={card.image}
        alt={card.title}
        className="aspect-[2/3] w-full h-auto"
      />

      {/* Card Title Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-loteria-blue via-loteria-blue/95 to-transparent px-2 py-1 rounded-b-lg">
        <p className="text-white text-center text-xs md:text-sm font-bold [text-shadow:_1px_1px_2px_rgb(0_0_0_/_80%)]">
          {card.title}
        </p>
      </div>

      {isMarked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-green-500/60">
          <span className="text-white text-6xl font-bold" translate="no">
            X
          </span>
        </div>
      )}
    </div>
  );
}
