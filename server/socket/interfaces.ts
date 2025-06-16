export interface GameState {
  id: string;
  shortCode: string;
  status: string;
  drawnCards: string[];
  hostId: string | null;
  players: {
    id: string;
    name: string;
    status: string;
    isWinner: boolean;
    playerTabla: string[];
  }[];
}
