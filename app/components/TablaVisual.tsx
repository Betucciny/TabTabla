import type { Card } from "~/server/shared/cards";

type TablaVisualProps = {
  cards: Card[];
  className?: string;
};

export default function TablaVisual({ cards, className }: TablaVisualProps) {
  return (
    <div
      className={`grid grid-cols-4 grid-rows-4 border-2 rounded-lg ${className} max-h-[70vh] w-fit`}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className="flex justify-stretch items-stretch max-h-full overflow-hidden"
        >
          <img
            src={card.image}
            alt={`Card ${index + 1}`}
            className="rounded-sm w-full"
          />
        </div>
      ))}
    </div>
  );
}
