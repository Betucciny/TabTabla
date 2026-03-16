import { Link } from "react-router";
import type { Route } from "./+types/gallery";
import { ALL_CARDS_MAP } from "~/server/shared/cards";
import { PapelPicadoBackground } from "~/components/PapelPicadoBackground";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TabTabla Lotería - Galería de Cartas" },
    { name: "description", content: "Galería completa de las 54 cartas de Lotería Mexicana" },
  ];
}

export default function GalleryPage() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (cardId: number) => {
    setSelectedCard(cardId);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const selectedCardData = selectedCard
    ? ALL_CARDS_MAP.find((card) => card.id === selectedCard)
    : null;

  return (
    <>
      <PapelPicadoBackground position="top" />
      <PapelPicadoBackground position="bottom" />
      <div className="min-h-screen bg-loteria-blue text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 [text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)]">
              Galería de Lotería
            </h1>
            <p className="text-xl mb-6">
              Las 54 cartas tradicionales de la Lotería Mexicana
            </p>
            <Link
              to="/"
              className="inline-block bg-loteria-orange hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              ← Volver al Inicio
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {ALL_CARDS_MAP.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className="cursor-pointer transform transition-all duration-200 hover:scale-105 hover:z-10"
              >
                <div className="relative rounded-lg border-2 border-white bg-white p-1 shadow-lg hover:shadow-2xl">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="aspect-[2/3] w-full h-auto rounded"
                  />
                  {/* Card Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-loteria-blue via-loteria-blue/95 to-transparent px-2 py-1 rounded-b-lg">
                    <p className="text-white text-center text-xs md:text-sm font-bold [text-shadow:_1px_1px_2px_rgb(0_0_0_/_80%)]">
                      {card.title}
                    </p>
                  </div>
                  {/* Card Number Badge */}
                  <div className="absolute top-2 left-2 bg-loteria-orange text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-lg">
                    {card.id}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Card Details */}
        {selectedCardData && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={handleCloseModal}
          >
            <div
              className="bg-loteria-cream rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-loteria-blue hover:text-loteria-orange transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Card Number Badge */}
              <div className="absolute top-4 left-4 bg-loteria-orange text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-lg shadow-lg">
                {selectedCardData.id}
              </div>

              {/* Card Content */}
              <div className="flex flex-col items-center mt-8">
                <img
                  src={selectedCardData.image}
                  alt={selectedCardData.title}
                  className="w-64 rounded-lg shadow-lg mb-4"
                />
                <h2 className="text-3xl font-bold text-loteria-blue mb-4">
                  {selectedCardData.title}
                </h2>
                <div className="w-full space-y-2">
                  {selectedCardData.sentences.map((sentence, index) => (
                    <p
                      key={index}
                      className="text-center text-gray-700 text-lg italic border-t border-gray-300 pt-2"
                    >
                      "{sentence}"
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
