import { cards, type Card } from "./cards";

export function generateUniqueShortCode(): string {
  const length = 10;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function getShuffleCards() {
  const array = [...cards];
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generateRandomTabla(): Card[] {
  const shuffledCards = getShuffleCards();
  return shuffledCards.slice(0, 16);
}
