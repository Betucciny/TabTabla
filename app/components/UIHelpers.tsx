import type { Card } from "~/server/shared/cards";

export function BottomActionBar({
  onLoteriaClick,
  onHistoryClick,
  disabled,
}: {
  onLoteriaClick: () => void;
  onHistoryClick: () => void;
  disabled: boolean;
}) {
  return (
    <div className="flex items-center gap-4 bg-loteria-blue p-4 shadow-lg">
      <button onClick={onHistoryClick} className="rounded-full p-3 bg-black/20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <button
        onClick={onLoteriaClick}
        className={`flex-grow rounded-lg bg-loteria-orange py-4 text-2xl font-black text-white ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={disabled}
      >
        ¡LOTERÍA!
      </button>
    </div>
  );
}

export function DrawnCardModal({
  card,
  onDrawNext,
}: {
  card: Card;
  onDrawNext: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="flex w-11/12 max-w-sm flex-col items-center gap-6 rounded-2xl bg-loteria-cream p-8 text-loteria-blue">
        <img
          src={card.image}
          alt={card.title}
          className="w-48 rounded-lg shadow-lg"
        />
        <h2 className="text-4xl font-bold">{card.title}</h2>
        <button
          onClick={onDrawNext}
          className="w-full rounded-lg bg-loteria-orange py-3 text-xl font-bold text-white"
        >
          Draw Next Card
        </button>
      </div>
    </div>
  );
}

export function PlayerList({
  players,
}: {
  players: { id: string; name: string }[];
}) {
  return (
    <div className="my-6">
      <h3 className="text-xl font-bold">Players</h3>
      <ul className="mt-2 space-y-2 space-x-2 flex flex-wrap">
        {players.map((player) => (
          <li key={player.id} className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-white/20"></div>
            <span>{player.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
