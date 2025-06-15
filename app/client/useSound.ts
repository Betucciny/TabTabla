import { useState, useCallback } from "react";

export function useSound(soundUrl: string) {
  const [audio] = useState(new Audio(soundUrl));

  const play = useCallback(() => {
    audio.currentTime = 0;
    audio.play().catch((e) => console.error("Error playing sound:", e));
  }, [audio]);

  return play;
}
