import { useState } from "react";
import type { Tabla } from "~/server/shared/cards";
import { generateRandomTabla } from "~/server/shared/util";
import TablaVisual from "./TablaVisual";

type ModalSelectTablaProps = {
  onConfirm: (selectedCards: Tabla) => void;
  cancel: () => void;
};

export default function ModalSelectTabla({
  onConfirm,
  cancel,
}: ModalSelectTablaProps) {
  const [selectedOption, setSelectedOption] = useState<{
    index: number;
    tabla: Tabla;
  } | null>(null);

  const [options, setOptions] = useState(
    [0, 1, 2, 3, 4, 5].map((index) => ({
      index,
      tabla: generateRandomTabla(),
    }))
  );

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setSelectedOption(null);
    setOptions(
      [0, 1, 2, 3, 4, 5].map((index) => ({
        index,
        tabla: generateRandomTabla(),
      }))
    );
    setTimeout(() => setIsRefreshing(false), 500);
  };
  const handleConfirm = () => {
    if (selectedOption) {
      onConfirm(selectedOption.tabla);
    }
  };

  return (
    <div className="grow p-10  ">
      <h1
        className="mb-8 animate-fade-in-down text-6xl font-bold
                                 [text-shadow:_2px_2px_4px_rgb(0_0_0_/_40%)]"
      >
        Select Your Tabla
      </h1>
      <div className="flex flex-wrap justify-around space-x-1 space-y-1 h-[70vh] overflow-y-scroll">
        {options.map((option, index) => (
          <label
            key={index}
            className="flex flex-col items-center rounded max-w-full w-3xs relative h-fit"
          >
            <div className="absolute top-0 left-0 flex flex-row bg-blue-100 p-4 rounded-lg m-2 space-x-2">
              <input
                type="radio"
                name="tabla"
                value={index}
                checked={selectedOption?.index === index}
                onChange={() => setSelectedOption(option)}
                className="form-radio w-6 h-6 text-blue-500 border-gray-300 focus:ring-blue-400"
              />
              <div className=" flex items-center justify-center text-sm font-semibold text-blue-700 pointer-events-none">
                Pick Me!
              </div>
            </div>
            <TablaVisual cards={option.tabla} className="" />
          </label>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          disabled={isRefreshing}
          onClick={handleRefresh}
          className={`px-4 py-2 rounded ${
            isRefreshing
              ? "bg-red-300 cursor-not-allowed"
              : "bg-green-200 hover:bg-green-400"
          }`}
        >
          Refresh
        </button>
        <button
          onClick={cancel}
          className={`px-4 py-2 rounded ${
            isRefreshing
              ? "bg-red-300 cursor-not-allowed"
              : "bg-green-200 hover:bg-green-400"
          }`}
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={!selectedOption}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
