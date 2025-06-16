import type { Card } from "~/server/shared/cards";

export function BottomActionBar({
  onLoteriaClick,
  onHistoryClick,
  disabled,
  playerStatus,
}: {
  onLoteriaClick: () => void;
  onHistoryClick: () => void;
  disabled: boolean;
  playerStatus: string;
}) {
  return (
    <div className="flex flex-col gap-4 bg-loteria-blue p-4 shadow-lg z-50">
      <div className="flex items-center ">
        {/* <button
          onClick={onHistoryClick}
          className="rounded-full p-3 bg-black/20"
        >
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
        </button> */}
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
      <div className="flex items-center justify-center bg-white/10 p-2 rounded-lg">
        <span className="text-sm font-medium text-white">Status:</span>
        <span className="ml-2 text-sm font-bold text-loteria-orange">
          {playerStatus}
        </span>
      </div>
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
  players: { id: string; name: string; status: string }[];
}) {
  const statusClasses: Record<string, string> = {
    Playing: "bg-green-500",
    Waiting: "bg-yellow-500",
    Ready: "bg-blue-500",
  };
  const playerCounts = players.reduce(
    (counts, player) => {
      if (
        player.status === "Playing" ||
        player.status === "Waiting" ||
        player.status === "Ready"
      ) {
        counts[player.status] = (counts[player.status] || 0) + 1;
      }
      counts.total += 1;
      return counts;
    },
    { Playing: 0, Waiting: 0, Ready: 0, total: 0 }
  );

  return (
    <div className="my-6 ">
      <h3 className="text-xl font-bold">Players</h3>
      <div className="mb-4">
        <p className="text-sm font-medium">
          Total Players: {playerCounts.total}
        </p>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-green-500"></div>
            <span className="text-sm">Playing: {playerCounts.Playing}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
            <span className="text-sm">Waiting: {playerCounts.Waiting}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-blue-500"></div>
            <span className="text-sm">Ready: {playerCounts.Ready}</span>
          </div>
        </div>
      </div>
      <ul className="mt-2 flex flex-wrap justify-around items-center md:max-h-24 overflow-scroll">
        {players.map((player) => (
          <li key={player.id} className="flex items-center gap-3 m-2">
            <div
              className={`h-8 w-8 rounded-full ${
                statusClasses[player.status] || "bg-gray-500"
              }`}
            ></div>
            <span>{player.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Spacer() {
  return <div className="h-4"></div>;
}
