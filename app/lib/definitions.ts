export type GameStatus = 'cardsNotSolved' | 'cardsSolved' | 'gameWon' | 'gameLost';

export type Move = 'addLetter' | 'deleteLetter' | 'checkGuess' | 'invalid';

export type LetterResult = 'correct' | 'incorrectLetter' | 'incorrectPosition';

export type ConnectionsResult = 'duplicate' | 'noMatch' |'solved' |'oneAway';

export type ClickHandler = (event: React.MouseEvent<HTMLInputElement>) => void;

export type CardData = {
  word: string,
  puzzleType?: 'crossword' | 'wordle'
  crosswordClue?: string,
  category?: string,
}

export type DeckData = CardData[];

export type CardState = CardData & {
  isSelected: boolean,
  puzzlePlayed: boolean,
  puzzleSolved: boolean,
}

export type CategoryDetail = {
  name: string,
  difficulty: number,
  words: string[],
}

export type GameState = {
  deck: CardState[],
  mistakesCounter: number,
  selection: CardState[],
  currentPuzzle: CardState | null,
  message: string,
  allCtgs: CategoryDetail[],
  solvedCtgs: CategoryDetail[],
  prevGuesses: string[][],
  puzzleCount: number,
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

export type TileData = {
  word: string,
  puzzleType?: string,
  puzzlePlayed: boolean,
  puzzleSolved: boolean,
}

export type WordleGuess = {
  card: CardState,
  rows: string[][],
  activeIdx: number,
  prevGuesses: string[],
  results: string[][],
  setActiveIdx: (idx: number) => void,
  setPrevGuesses: (guesses: string[]) => void,
  setResults: (results: string[][]) => void,
  setMessage: (message: string) => void
}
