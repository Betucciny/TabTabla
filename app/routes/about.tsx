import { Link } from "react-router";
import { PapelPicadoBackground } from "~/components/PapelPicadoBackground";
import type { Route } from "./+types/about";
export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `TabTabla Lotería - About` },
    { name: "description", content: `Juego de Lotería | About` },
  ];
}

export default function About() {
  return (
    <>
      <PapelPicadoBackground position="top" />
      <PapelPicadoBackground position="bottom" />
      <div className="flex bg-loteria-blue">
        <div className=" mx-auto max-w-3xl p-8 rounded-lg shadow-lg my-10 text-loteria-blue bg-white">
          <header className="text-center">
            <h1 className="text-4xl font-black tracking-wide  md:text-5xl">
              Digital Loteria
            </h1>
            <p className="mt-2 text-lg ">
              The classic Mexican bingo game, brought online for friends and
              family.
            </p>
          </header>

          {/* The Story Section */}
          <section className="mt-12">
            <h2 className="mb-4 border-b-2 border-white/20 pb-2 text-3xl font-bold">
              About This Project
            </h2>
            <p className="text-lg leading-relaxed ">
              This version of Loteria was built as a fun project for a friend so
              we could play together online during parties. The goal was to
              create a simple, fast, and authentic experience that captures the
              spirit of gathering around a table and shouting "¡LOTERÍA!".
            </p>
          </section>

          {/* How to Play Section */}
          <section className="mt-12">
            <h2 className="mb-4 border-b-2 border-white/20 pb-2 text-3xl font-bold">
              How to Play
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">For the Host:</h3>
                <ol className="mt-2 list-inside list-decimal space-y-2 text-lg ">
                  <li>
                    Click "Create Game" on the home page to start a new lobby.
                  </li>
                  <li>Share the 4-letter Game Code with your friends.</li>
                  <li>
                    Once everyone has joined and chosen their tabla, click
                    "Start Game".
                  </li>
                  <li>
                    Click "Draw Card" to reveal a new card to all players.
                  </li>
                  <li>
                    Keep drawing until someone wins! The game will reset for the
                    next round.
                  </li>
                </ol>
              </div>
              <div>
                <h3 className="text-xl font-semibold">For Players:</h3>
                <ol className="mt-2 list-inside list-decimal space-y-2 text-lg ">
                  <li>
                    Enter the 4-letter Game Code from the host and click "Join
                    Game".
                  </li>
                  <li>Choose your tabla (game board).</li>
                  <li>
                    Pay attention as the host draws cards! Tap the matching card
                    on your board to mark it.
                  </li>
                  <li>
                    When you've marked all 16 cards on your board, quickly tap
                    the big "¡LOTERÍA!" button.
                  </li>
                  <li>
                    If you make a false call, you'll be out for the rest of the
                    round, so be sure!
                  </li>
                </ol>
              </div>
            </div>
          </section>

          <section className="mt-12 text-center">
            <h2 className="mb-4 border-b-2 border-white/20 pb-2 text-3xl font-bold">
              Enjoying the Game?
            </h2>
            <p className="mx-auto max-w-xl text-lg leading-relaxed ">
              This project is free to use and was built with love. If you're
              having fun and want to show your support, you can buy me a virtual
              coffee. It helps cover server costs and encourages future updates!
            </p>
            <div className="flex flex-col space-y-2 items-center">
              <a
                href="https://www.paypal.me/betucciny"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-3 rounded-lg bg-loteria-orange px-8 py-4 text-xl font-bold text-white shadow-lg transition hover:scale-105 hover:bg-orange-500"
              >
                {/* Coffee Cup Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.926 5.074a.75.75 0 00-1.06-1.06l-1.012 1.012a4.486 4.486 0 00-6.364 0L8.478 4.014a.75.75 0 00-1.06 1.06L8.43 6.086a4.5 4.5 0 000 6.364l-1.012 1.012a.75.75 0 001.06 1.06l1.012-1.012a4.486 4.486 0 006.364 0l1.012 1.012a.75.75 0 001.06-1.06l-1.012-1.012a4.5 4.5 0 000-6.364l1.012-1.012zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
                Buy Me a Coffee
              </a>
              <a
                href="https://www.github.com/betucciny"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-3 rounded-lg bg-loteria-orange px-8 py-4 text-xl font-bold text-white shadow-lg transition hover:scale-105 hover:bg-orange-500"
              >
                {/* GitHub Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.983 1.03-2.682-.103-.253-.447-1.27.098-2.647 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.296 2.75-1.026 2.75-1.026.545 1.377.202 2.394.1 2.647.64.7 1.03 1.591 1.03 2.682 0 3.842-2.337 4.687-4.565 4.935.36.31.682.92.682 1.855 0 1.34-.012 2.42-.012 2.748 0 .267.18.578.688.48C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                    clipRule="evenodd"
                  />
                </svg>
                My GitHub
              </a>
            </div>
          </section>

          {/* Back to Home Link */}
          <div className="mt-16 text-center">
            <Link
              to="/"
              className="text-lg font-semibold text-loteria-orange hover:underline"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
