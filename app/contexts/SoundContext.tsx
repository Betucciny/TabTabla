import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface SoundContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  // Load sound preference from localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem("soundEnabled");
    if (savedPreference !== null) {
      setIsSoundEnabled(savedPreference === "true");
    }
  }, []);

  const toggleSound = () => {
    setIsSoundEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem("soundEnabled", String(newValue));
      return newValue;
    });
  };

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
}
