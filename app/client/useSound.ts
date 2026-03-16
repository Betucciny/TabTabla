import { useState, useCallback } from "react";
import { useSound as useSoundContext } from "~/contexts/SoundContext";

export function useSoundEffect(soundUrl: string) {
  const [audio] = useState(new Audio(soundUrl));
  const { isSoundEnabled } = useSoundContext();

  const play = useCallback(() => {
    if (!isSoundEnabled) return;
    audio.currentTime = 0;
    audio.play().catch((e) => console.error("Error playing sound:", e));
  }, [audio, isSoundEnabled]);

  return play;
}
