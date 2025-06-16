import { useState, useEffect } from "react";

interface PreloaderState {
  isLoading: boolean;
  progress: number; // A percentage from 0 to 100
}

export function useImagePreloader(imageUrls: string[]): PreloaderState {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = imageUrls.length;

    if (totalImages === 0) {
      setIsLoading(false);
      return;
    }

    const promises = imageUrls.map((url) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = url;

        img.onload = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / totalImages) * 100));
          resolve();
        };

        img.onerror = (error) => {
          console.error(`Failed to load image: ${url}`, error);

          resolve();
        };
      });
    });

    Promise.all(promises).then(() => {
      setIsLoading(false);
    });
  }, [imageUrls]);

  return { isLoading, progress };
}
