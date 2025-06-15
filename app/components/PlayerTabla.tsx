import type { Card } from "~/server/shared/cards";

type PlayerTablaProps = {
  cards: Card[];
  markedCards: string[];
  onCardClick: (cardName: string) => void;
};

export function PlayerTabla({
  cards,
  markedCards,
  onCardClick,
}: PlayerTablaProps) {
  return (
    <div className="grid grid-cols-4 gap-2 p-4 ">
      {cards.length === 0
        ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
            (index) => (
              <div
                key={index}
                className="aspect-[2/3] animate-pulse rounded-lg bg-gray-300 h-auto"
              ></div>
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
      {isMarked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-green-500/60">
          <span className="text-white text-6xl font-bold">X</span>
        </div>
      )}
    </div>
  );
}
