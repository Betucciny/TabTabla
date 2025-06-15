interface WinnerModalProps {
  winnerName: string | null;
  onClose: () => void;
  isOpen: boolean;
}

export function WinnerModal({ winnerName, onClose, isOpen }: WinnerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="flex w-11/12 max-w-md flex-col items-center gap-4 rounded-2xl bg-loteria-cream p-8 text-center text-loteria-blue shadow-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-yellow-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.926 5.074a.75.75 0 00-1.06-1.06l-1.012 1.012a4.486 4.486 0 00-6.364 0L8.478 4.014a.75.75 0 00-1.06 1.06L8.43 6.086a4.5 4.5 0 000 6.364l-1.012 1.012a.75.75 0 001.06 1.06l1.012-1.012a4.486 4.486 0 006.364 0l1.012 1.012a.75.75 0 001.06-1.06l-1.012-1.012a4.5 4.5 0 000-6.364l1.012-1.012zM10 11a2 2 0 100-4 2 2 0 000 4z" />
          <path d="M3 5a2 2 0 00-2 2v6a2 2 0 002 2h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 001.414 0l1.414-1.414a1 1 0 01.707-.293H17a2 2 0 002-2V7a2 2 0 00-2-2H3z" />
        </svg>

        {winnerName ? (
          <>
            <h1 className="text-4xl font-black uppercase tracking-wider">
              ¡LOTERÍA!
            </h1>
            <p className="text-xl">
              Congratulations to the winner,
              <span className="mt-1 block text-3xl font-bold">
                {winnerName}
              </span>
            </p>
          </>
        ) : (
          <h1 className="text-4xl font-black uppercase tracking-wider">
            There are no more Cards!
          </h1>
        )}
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-loteria-orange px-8 py-3 text-xl font-bold text-white transition hover:scale-105"
        >
          Back to Lobby
        </button>
      </div>
    </div>
  );
}
