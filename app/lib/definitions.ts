export type GameStatus = 'cardsNotSolved' | 'cardsSolved' | 'gameWon' | 'gameLost';

export type CardData = {
  word: string,
  puzzleType?: 'crossword' | 'wordle'
  crosswordClue?: string
}

export type DeckData = CardData[];

export type CategoryData = {
  difficulty: number,
  categoryName: string,
  categoryWords: CardData[],
}

export type GameData = {
  id: number,
  categories: CategoryData[],
}

export type CardState = CardData & {
  isSelected: boolean,
  puzzlePlayed: boolean,
  puzzleSolved: boolean,
}

export type TileData = {
  word: string,
  puzzleType?: string,
  puzzlePlayed: boolean,
  puzzleSolved: boolean,
}