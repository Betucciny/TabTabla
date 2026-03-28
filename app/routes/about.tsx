import { Link } from "react-router";
import { PapelPicadoBackground } from "~/components/PapelPicadoBackground";
import { PageNavigation } from "~/components/PageNavigation";
import type { Route } from "./+types/about";
export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `TabTabla® Lotería - About` },
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

          {/* Cultural Breviary Section */}
          <section className="mt-12">
            <h2 className="mb-4 border-b-2 border-white/20 pb-2 text-3xl font-bold">
              Cultural Breviary
            </h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                <strong>Mexican lotería:</strong> 54 cards that arrived with the
                Spanish (18th century), but Mexico gave it soul with cheeky
                verses, indigenous art, and popular humor.
              </p>
              <p>
                Since 1887, grandmas chant the verses, kids mark with beans,
                parents yell "¡Lotería!", and friends party hard!
              </p>
              <p>
                A living tradition that brings everyone together —no matter age,
                gender, or where you're from.
              </p>
            </div>
          </section>

          <section className="mt-12 text-center">
            <h2 className="mb-4 border-b-2 border-white/20 pb-2 text-3xl font-bold">
              The Team
            </h2>
            <div className="space-y-4">
              <p className="text-lg">
                <strong>Developer:</strong> Roberto Ángel Herrera Rodríguez
              </p>
              <p className="text-lg">
                <strong>Inspired by:</strong> Fernando Efrain Guzman Amaya
              </p>
              <p className="text-lg">
                <strong>Card Images:</strong> Mauro Julio Lunari
              </p>
              <a
                href="https://www.github.com/betucciny"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-3 rounded-lg bg-loteria-orange px-8 py-4 text-xl font-bold text-white shadow-lg transition hover:scale-105 hover:bg-orange-500"
              >
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
                Visit on GitHub
              </a>
            </div>
          </section>

          {/* Navigation */}
          <PageNavigation currentPage="about" />
        </div>
      </div>
    </>
  );
}
