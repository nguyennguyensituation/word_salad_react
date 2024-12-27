import { DeckData, CardState, CategoryDetail, ConnectionsResult, GameStatus, GameState, PuzzleResult } from '@/app/lib/definitions';
import { shuffle, filterArr} from '@/app/utils/generalUtils';
import { BOARD_MESSAGES } from "@/app/lib/messages";
import {shake, bounce } from "@/app/utils/animations";

function createDeck(deckData: DeckData): CardState[] {
  return deckData.map(card => {
    return {
      word: card.word,
      puzzleType: card.puzzleType,
      crosswordClue: card.crosswordClue,
      category: card.category,
      isSelected: false,
      puzzlePlayed: !card.puzzleType,
      puzzleSolved: !card.puzzleType,
    };
  });
}

function defaultGame(deckData: DeckData,
  categories: CategoryDetail[],
): GameState {
  return {
    deck: createDeck(deckData),
    mistakesCounter: 4,
    selection: [],
    currentPuzzle: null,
    message: '',
    allCtgs: categories,
    solvedCtgs: [],
    prevGuesses: [],
    puzzleCount: 0,
  };
}

export function selectCard(card: CardState,
  numSelectedCards: number,
  handleSelection: (card: CardState, cardAction: string) => void): void {


  const { puzzlePlayed, isSelected } = card;
  let cardAction = '';

  if (!puzzlePlayed) {
    cardAction = 'playPuzzle';
  } else if (isSelected) {
    cardAction = 'removeCard';
  } else if (numSelectedCards < 4) {
    cardAction = 'addCard';
  }

  if (cardAction) handleSelection(card, cardAction);
}

function handleShuffle(gameState: GameState,
  setGameState: (state: GameState) => void): void {
  const gameCopy = {...gameState};

  gameCopy.message = '';
  gameCopy.deck = shuffle(gameState.deck);
  setGameState(gameCopy);
}

function updateSelection(card: CardState,
  cardAction: string,
  gameState: GameState,
  setGameState: (state: GameState) => void,
  setDisableSubmit: (isDisabled: boolean) => void): void {
  const gameCopy = {...gameState};
  const updatedSelection = cardAction === 'removeCard' ?
    filterArr(gameState.selection, 'word', card.word, false) :
    [...gameState.selection, card];

  gameCopy.selection = updatedSelection;
  if (gameCopy.selection.length === 4) {
    setDisableSubmit(false);
  }
  setGameState(gameCopy);
}

function toggleCardSelect(word: string,
  deck: CardState[]): void {
  const idx = deck.findIndex(card => card.word === word);

  deck[idx].isSelected = !deck[idx].isSelected;
}

function handleDeselectAll(gameState: GameState,
  setGameState: (state: GameState) => void): void {
  const gameCopy = {...gameState};
  gameState.selection.forEach(card => {
    toggleCardSelect(card.word, gameState.deck);
  });

  gameCopy.message = '';
  gameCopy.selection = [];
  setGameState(gameCopy);
}

function duplicateGuess(selection: CardState[],
  prevGuesses: string[][]): boolean {
  const guessStr = selection.map(card => card.word).sort().join(',');

  for (let guessIdx = 0; guessIdx < prevGuesses.length; guessIdx++) {
    const guess = prevGuesses[guessIdx].sort().join(',');
    if (guess === guessStr) return true;
  }

  return false;
}

function checkSelection(selection: CardState[],
  prevGuesses: string[][]): ConnectionsResult {
  if (duplicateGuess(selection, prevGuesses)) return 'duplicate';

  const categoryCount: { [key: string]: number} = {};
  let result: ConnectionsResult = 'noMatch';

  selection.forEach((card, idx) => {
    const category = card.category || '';

    if (categoryCount[category]) {
      categoryCount[category] += 1;

      if (categoryCount[category] === 4) {
        result = 'solved';
      } else if (categoryCount[category] === 3 && idx >= 2) {
        result = 'oneAway';
      }
    } else {
      categoryCount[category] = 1;
    }
  });
  return result;
}

function getCategory(categoryName: string,
  allCtgs: CategoryDetail[]): CategoryDetail {
  return filterArr(allCtgs, 'name', categoryName, true)[0];
}

function updateCategories(category: CategoryDetail,
  gameState: GameState,
  setGameState: (state: GameState) => void): void {
  const gameCopy = {...gameState};

  gameCopy.selection = [];
  gameCopy.solvedCtgs = [...gameState.solvedCtgs, category];
  gameCopy.allCtgs = filterArr(gameState.allCtgs, 'name', category.name, false);
  gameCopy.deck = filterArr(gameState.deck, 'category', category.name, false);
  setGameState(gameCopy);
}

function showWin(gameCopy: GameState,
  setGameState: (state: GameState) => void,
  setGameStatus: (status: GameStatus) => void,
  setCheckCardMode: (isChecking: boolean) => void,
  setHideResult: (hide: boolean) => void): void {
  const categoryName = gameCopy.selection[0].category || '';
  const category: CategoryDetail = getCategory(categoryName, gameCopy.allCtgs);
  const isLastCategory: boolean = gameCopy.solvedCtgs.length === 3;
  const selection = [...document.querySelectorAll('[class*="selected"]')];

  bounce(selection);

  setTimeout(() => {
    updateCategories(category, gameCopy, setGameState);
    setCheckCardMode(false);

    if (isLastCategory) {
      setGameStatus('gameWon')
      setTimeout(() => {
        setHideResult(false);
      }, 1000)
    };
    
  }, 2500);

}

function showLoss(gameCopy: GameState,
  setGameState: (state: GameState) => void,
  setGameStatus: (status: GameStatus) => void,
  setCheckCardMode: (isChecking: boolean) => void,
  setHideResult: (hide: boolean) => void): void {
  const guess = gameCopy.selection.map(card => card.word);
  const selection = [...document.querySelectorAll('[class*="selected"]')];

  bounce(selection);

  setTimeout(() => shake(selection), 1400);

  setTimeout(() => {
    gameCopy.prevGuesses = [...gameCopy.prevGuesses, guess];
    gameCopy.mistakesCounter -= 1;

    if (gameCopy.mistakesCounter === 0) {
      gameCopy.solvedCtgs = [...gameCopy.solvedCtgs, gameCopy.allCtgs].flat();
      gameCopy.deck = [];
      setGameStatus('gameLost');
      setTimeout(() => {
        setHideResult(false);
      }, 1000)
    }

    setGameState(gameCopy);
    setCheckCardMode(false);
  }, 2400);
}

function showDuplicate(gameCopy: GameState,
  setGameState: (state: GameState) => void,
  setCheckCardMode: (isChecking: boolean) => void): void {
  const selection = [...document.querySelectorAll('[class*="selected"]')];

  shake(selection);

  setTimeout(() => {
    gameCopy.message = (BOARD_MESSAGES['duplicateGuess']);
    setGameState(gameCopy);
    setCheckCardMode(false);
  }, 700);
}

function checkCards(gameState: GameState,
  setGameState: (state: GameState) => void,
  setGameStatus: (status: GameStatus) => void,
  setCheckCardMode: (status: boolean) => void,
  setDisableSubmit: (isDisabled: boolean) => void,
  setHideResult: (hide: boolean) => void,
  puzzleResult: PuzzleResult,
  setPuzzleResult: (result: PuzzleResult) => void): void {
  const result = checkSelection(gameState.selection, gameState.prevGuesses);
  const gameCopy = {...gameState};
  const puzzleResultCopy = {...puzzleResult}

  setCheckCardMode(true);

  if (result === 'duplicate') {
    showDuplicate(gameCopy, setGameState, setCheckCardMode);
  } else if (result === 'solved') {
    showWin(gameCopy, setGameState, setGameStatus, setCheckCardMode, setHideResult);
    puzzleResultCopy['connections'].push(true);
    setPuzzleResult(puzzleResultCopy);
  } else {
    const isLastGuess = gameState.mistakesCounter === 1;

    if (result === 'oneAway' && !isLastGuess) {
      gameCopy.message = BOARD_MESSAGES['oneAway'];
    }

    showLoss(gameCopy, setGameState, setGameStatus, setCheckCardMode, setHideResult);
    puzzleResultCopy['connections'].push(false);
    setPuzzleResult(puzzleResultCopy);
    setDisableSubmit(true);
  }
}

function handleCardSelection(card: CardState,
  cardAction: string,
  gameState: GameState,
  checkCardMode: boolean,
  setGameState: (state: GameState) => void,
  setGameStatus: (status: GameStatus) => void,
  setDisableSubmit: (isDisabled: boolean) => void): void {
  if (checkCardMode) return;

  const gameCopy = {...gameState};
  const allPuzzlesSolved = gameState.puzzleCount === 7;

  gameCopy.message = '';

  if (cardAction === 'playPuzzle') {
    gameCopy.currentPuzzle = card;
    gameCopy.puzzleCount += 1;
    setGameState(gameCopy);

    if (allPuzzlesSolved) setGameStatus('cardsSolved');
  } else {
    toggleCardSelect(card.word, gameState.deck);
    updateSelection(card, cardAction, gameCopy, setGameState, setDisableSubmit);
  }
}

function resetPuzzle(gameState: GameState,
  setGameState: (state: GameState) => void) {
  const gameCopy = {...gameState};

  gameCopy.currentPuzzle = null;
  setGameState(gameCopy);
}

function resetGame(deckData: DeckData,
  categories: CategoryDetail[],
  setGameState: (state: GameState) => void,
  setGameStatus: (status: GameStatus) => void): void {
  setGameState(defaultGame(deckData, categories));
  setGameStatus('cardsNotSolved');
}

const defaultResult = {
  wordle: [],
  crossword: [],
  connections: [],
};

const boardUtils = {
  defaultGame,
  createDeck,
  checkCards,
  updateSelection,
  toggleCardSelect,
  handleShuffle,
  handleDeselectAll,
  handleCardSelection,
  resetPuzzle,
  resetGame,
  defaultResult,
};

export default boardUtils;
