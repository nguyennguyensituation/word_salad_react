export type GameStatus = 'cardsNotSolved' | 'cardsSolved' | 'gameWon' | 'gameLost';

export type CardData = {
  word: string,
  puzzleType?: 'crossword' | 'wordle'
  crosswordClue?: string
}

export type CategoryData = {
  difficulty: number,
  categoryName: string,
  categoryWords: CardData[],
}

export type GameData = {
  id: number,
  categories: CategoryData[],
}

export type DeckData = CardData[];
