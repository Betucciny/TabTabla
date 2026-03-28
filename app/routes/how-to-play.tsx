import { Link } from "react-router";
import { PapelPicadoBackground } from "~/components/PapelPicadoBackground";
import { PageNavigation } from "~/components/PageNavigation";
import type { Route } from "./+types/how-to-play";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `TabTabla® Lotería - How to Play` },
    {
      name: "description",
      content: `Learn how to play TabTabla Lotería online`,
    },
  ];
}

export default function HowToPlay() {
  return (
    <>
      <PapelPicadoBackground position="top" />
      <PapelPicadoBackground position="bottom" />
      <div className="flex bg-loteria-blue">
        <div className="mx-auto max-w-3xl p-8 rounded-lg shadow-lg my-10 text-loteria-blue bg-white">
          <header className="text-center">
            <h1 className="text-4xl font-black tracking-wide md:text-5xl">
              How to Play
            </h1>
            <p className="mt-2 text-lg">
              Learn the rules and get started with TabTabla Lotería
            </p>
          </header>

          {/* How to Play Section */}
          <section className="mt-12">
            <h2 className="mb-4 border-b-2 border-white/20 pb-2 text-3xl font-bold">
              Game Instructions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">For the Host:</h3>
                <ol className="mt-2 list-inside list-decimal space-y-2 text-lg">
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
                <ol className="mt-2 list-inside list-decimal space-y-2 text-lg">
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

          {/* Tips Section */}
          <section className="mt-12">
            <h2 className="mb-4 border-b-2 border-white/20 pb-2 text-3xl font-bold">
              Tips & Tricks
            </h2>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="mr-2 text-loteria-orange font-bold">•</span>
                <span>
                  <strong>Stay focused:</strong> Cards are drawn quickly, so
                  keep your eyes on the screen!
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-loteria-orange font-bold">•</span>
                <span>
                  <strong>Double-check:</strong> Make sure all 16 cards are
                  marked before calling Lotería to avoid being disqualified.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-loteria-orange font-bold">•</span>
                <span>
                  <strong>Random Tabla:</strong> Use the shuffle button to get a
                  new random tabla before the game starts.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-loteria-orange font-bold">•</span>
                <span>
                  <strong>Share the fun:</strong> Use the share button to send
                  the game link to friends via QR code or messaging apps.
                </span>
              </li>
            </ul>
          </section>

          {/* Navigation */}
          <PageNavigation currentPage="how-to-play" />
        </div>
      </div>
    </>
  );
}
