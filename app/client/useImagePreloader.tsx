import { useState, useEffect } from "react";

interface PreloaderState {
  isLoading: boolean;
  progress: number; // A percentage from 0 to 100
}

const CACHE_KEY = "loteria_images_cache_timestamp";
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 1 month in milliseconds

function isCacheExpired(): boolean {
  try {
    const cachedTimestamp = localStorage.getItem(CACHE_KEY);
    if (!cachedTimestamp) {
      return true;
    }
    const timestamp = parseInt(cachedTimestamp, 10);
    const now = Date.now();
    return now - timestamp > CACHE_DURATION;
  } catch {
    return true;
  }
}

function updateCacheTimestamp(): void {
  try {
    localStorage.setItem(CACHE_KEY, Date.now().toString());
  } catch (error) {
    console.error("Failed to update cache timestamp:", error);
  }
}

function clearImageCache(): void {
  try {
    // Clear all cached images by adding a cache-busting timestamp
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (img.src) {
        const url = new URL(img.src);
        url.searchParams.set("_cacheBust", Date.now().toString());
        img.src = url.toString();
      }
    });
  } catch (error) {
    console.error("Failed to clear image cache:", error);
  }
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

    // Check if cache has expired
    const cacheExpired = isCacheExpired();
    if (cacheExpired) {
      clearImageCache();
      updateCacheTimestamp();
    }

    const cacheBuster = cacheExpired ? `?_cb=${Date.now()}` : "";

    const promises = imageUrls.map((url) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = url + cacheBuster;

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
