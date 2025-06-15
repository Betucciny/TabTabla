interface LastWinnerBannerProps {
  winnerName: string | null;
}

export function LastWinnerBanner({ winnerName }: LastWinnerBannerProps) {
  return (
    <div className="mb-6 flex items-center justify-center gap-3 rounded-lg bg-black/20 p-3 text-center">
      {winnerName ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
            />
          </svg>
          <p className="font-semibold">
            Last Winner: <span className="font-bold">{winnerName}</span>
          </p>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-semibold text-white/70">
            No winners from the previous round.
          </p>
        </>
      )}
    </div>
  );
}
