export type GameStatus = 'cardsNotSolved' | 'cardsSolved' | 'gameWon' | 'gameLost';

export type Move = 'addLetter' | 'deleteLetter' | 'checkGuess' | 'invalid';

export type LetterResult = 'correct' | 'incorrectLetter' | 'incorrectPosition';

export type ConnectionsResult = 'duplicate' | 'noMatch' |'solved' |'oneAway';

export type CardData = {
  word: string,
  puzzleType?: 'crossword' | 'wordle'
  crosswordClue?: string,
  category: string,
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

export type CategoryDetail = {
  name: string,
  difficulty: number,
  words: string[],
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

export type ConnectionsState = {
  selection: CardState[],
  prevGuesses: string[][],
  allCtgs: CategoryDetail[],
  solvedCtgs: CategoryDetail[],
  deck: CardState[],
  mistakesCounter: number,
  setMessage: (message: string) => void,
  setPrevGuesses: (guesses: string[][]) => void,
  setAllCtgs: (categories: CategoryDetail[]) => void,
  setSolvedCtgs: (categories: CategoryDetail[]) => void,
  setDeck: (deck: CardState[]) => void,
  setMistakesCounter: (count: number) => void,
  setSelection: (selection: CardState[]) => void,
  setGameStatus: (status: GameStatus) => void
}

export type ClickHandler = (event: React.MouseEvent<HTMLInputElement>) => void;