export type GameStatus = 'cardsNotSolved' | 'cardsSolved' | 'gameWon' | 'gameLost';

export type CardData = {
  id: number,
  categoryName: string,
  word: string,
  puzzleId: null | number,
  puzzleType: null | 'wordle' | 'crossword',
}