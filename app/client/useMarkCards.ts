import { useState, useEffect } from "react";

export function useMarkedCards(
  gameId: string
): [string[], React.Dispatch<React.SetStateAction<string[]>>] {
  const storageKey = `loteria_marked_cards_${gameId}`;

  const [markedCards, setMarkedCards] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const savedItem = window.localStorage.getItem(storageKey);
      const parsedItem = savedItem ? JSON.parse(savedItem) : [];
      return Array.isArray(parsedItem) ? parsedItem : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, JSON.stringify(markedCards));
    }
  }, [markedCards, storageKey]);

  return [markedCards, setMarkedCards];
}
