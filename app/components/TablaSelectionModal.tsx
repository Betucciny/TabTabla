import { useState } from "react";
import { PlayerTabla } from "./PlayerTabla";
import type { Tabla } from "~/server/shared/cards";
import { generateRandomTabla } from "~/server/shared/util";

interface TablaSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedTabla: Tabla) => void;
}

export function TablaSelectionModal({
  isOpen,
  onClose,
  onConfirm,
}: TablaSelectionModalProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [tablaOptions, setTablaOptions] = useState<Tabla[]>(
    [0, 1, 2].map(() => generateRandomTabla())
  );

  const handleConfirm = () => {
    if (selectedIndex !== null) {
      onConfirm(tablaOptions[selectedIndex]);
      onClose();
    }
  };

  function newTablas() {
    setTablaOptions([0, 1, 2].map(() => generateRandomTabla()));
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center h-screen justify-center bg-black/70 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex w-11/12 max-w-4xl flex-col rounded-2xl bg-loteria-cream p-6 text-loteria-blue max-h-[90vh] ">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Choose Your Tabla</h2>
          <button onClick={onClose} className="text-3xl font-bold">
            &times;
          </button>
        </div>

        {/* Grid for Tabla Options */}
        <div className="flex flex-col md:flex-row space-y-6 space-x-0 md:space-x-6 md:space-y-0 overflow-y-scroll p-6 overflow-x-auto">
          {tablaOptions.map((tabla, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`cursor-pointer rounded-xl border-4 p-1 transition-all ${
                selectedIndex === index
                  ? "border-loteria-orange scale-105"
                  : "border-loteria-blue hover:border-loteria-orange/50"
              }`}
            >
              <PlayerTabla
                cards={tabla}
                markedCards={[]}
                onCardClick={() => {}}
              />
            </div>
          ))}
        </div>

        {/* Confirmation Button */}
        <div className="mt-6 flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between items-center">
          <button
            onClick={newTablas}
            className="rounded-lg bg-loteria-orange px-8 py-3 text-xl font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            New Tablas
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedIndex === null}
            className="rounded-lg bg-loteria-orange px-8 py-3 text-xl font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
}
