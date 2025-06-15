import type { Card } from "~/server/shared/cards";

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

interface CardToastProps {
  card: Card | null;
  isVisible: boolean;
}

export function CardToast({ card, isVisible }: CardToastProps) {
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
