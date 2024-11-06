export type GameStatus = 'cardsNotSolved' | 'cardsSolved' | 'gameWon' | 'gameLost';

export type CardData = {
  id: number;
  categoryName: string;
  word: string;
  puzzleId: number | null;
  puzzleType: 'crossword' | 'wordle' | null;
}

export type DeckData = CardData[];