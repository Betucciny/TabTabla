export interface GameState {
  id: string;
  shortCode: string;
  status: string;
  drawnCards: string[];
  hostId: string | null;
  playerTabla: string[];
  isHost: boolean;
  players: {
    id: string;
    name: string;
    status: string;
    isWinner: boolean;
  }[];
}
