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

export type DeckData = {
  id: number,
  categories: CategoryData[],
}
