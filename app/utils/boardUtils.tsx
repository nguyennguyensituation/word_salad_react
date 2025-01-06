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

const defaultResult = {
  wordle: [],
  crossword: [],
  connections: [],
};

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

function showWin(gameState: GameState,
  setGameState: (state: GameState) => void,
  setGameStatus: (status: GameStatus) => void,
  setHideResult: (hide: boolean) => void): void {
  const gameCopy = {...gameState};
  const categoryName = gameCopy.selection[0].category || '';
  const category: CategoryDetail = getCategory(categoryName, gameCopy.allCtgs);
  const isLastCategory: boolean = gameCopy.solvedCtgs.length === 3;
  const selection = [...document.querySelectorAll('[class*="selected"]')];

  bounce(selection);

  setTimeout(() => {
    updateCategories(category, gameCopy, setGameState);

    if (isLastCategory) {
      setGameStatus('gameWon');
      setTimeout(() => setHideResult(false), 1000);
    }
  }, 2500);
}

function setNoMatchGuess(gameCopy: GameState,
  setGameState: (state: GameState) => void,
  setGameStatus: (status: GameStatus) => void,
  setHideResult: (hide: boolean) => void): void {
  const guess = gameCopy.selection.map(card => card.word);
  const isLastGuess = gameCopy.mistakesCounter === 0;

  gameCopy.prevGuesses = [...gameCopy.prevGuesses, guess];
  gameCopy.mistakesCounter -= 1;

  if (isLastGuess) {
    gameCopy.solvedCtgs = [...gameCopy.solvedCtgs, gameCopy.allCtgs].flat();
    gameCopy.deck = [];
    setGameStatus('gameLost');
    setTimeout(() => setHideResult(false), 1000);
  }

  setGameState(gameCopy);
}

function showLoss(gameState: GameState,
  setGameState: (state: GameState) => void,
  setGameStatus: (status: GameStatus) => void,
  setHideResult: (hide: boolean) => void,
  isOneAway: boolean): void {
  const gameCopy = {...gameState};
  const selection = [...document.querySelectorAll('[class*="selected"]')];

  bounce(selection);

  setTimeout(() => shake(selection), 1400);

  setTimeout(() => {
    if (isOneAway) {
      gameCopy.message = (BOARD_MESSAGES['oneAway']);
    }

    setNoMatchGuess(gameCopy, setGameState, setGameStatus, setHideResult);
  }, 2400);
}

function showDuplicate(gameState: GameState,
  setGameState: (state: GameState) => void): void {
  const gameCopy = {...gameState};

  gameCopy.message = (BOARD_MESSAGES['duplicateGuess']);
  setGameState(gameCopy);
}

function setConnectionsResult(isMatch: boolean,
  puzzleResult: PuzzleResult,
  setPuzzleResult: (result: PuzzleResult) => void
) {
  const puzzleResultCopy = {...puzzleResult};

  puzzleResultCopy['connections'].push(isMatch);
  setPuzzleResult(puzzleResultCopy);
}

function showResult(result: string,
  gameState: GameState,
  setGameState: (state: GameState) => void,
  setGameStatus: (status: GameStatus) => void,
  setHideResult: (hide: boolean) => void): void {
  if (result === 'duplicate') {
    showDuplicate(gameState, setGameState);
  } else if (result === 'solved') {
    showWin(gameState, setGameState, setGameStatus, setHideResult);
  } else {
    const isOneAway = result === 'oneAway' && gameState.mistakesCounter !== 1;

    showLoss(gameState, setGameState, setGameStatus, setHideResult, isOneAway);
  }
}

function checkCards(gameState: GameState,
  setGameState: (state: GameState) => void,
  setGameStatus: (status: GameStatus) => void,
  setCheckCardMode: (status: boolean) => void,
  setDisableSubmit: (isDisabled: boolean) => void,
  setHideRes: (hide: boolean) => void,
  puzzleResult: PuzzleResult,
  setPuzzleResult: (result: PuzzleResult) => void): void {
  const result = checkSelection(gameState.selection, gameState.prevGuesses);
  const isMatch = result === 'solved';

  setCheckCardMode(true);
  showResult(result, gameState, setGameState, setGameStatus, setHideRes);

  if (result !== 'duplicate') {
    setConnectionsResult(isMatch, puzzleResult, setPuzzleResult);
  }
  setCheckCardMode(false);
  setDisableSubmit(true);
}

function playPuzzle(card: CardState,
  gameCopy: GameState,
  setGameState: (state: GameState) => void,
  setGameStatus: (status: GameStatus) => void) {
  const allPuzzlesSolved = gameCopy.puzzleCount === 7;

  gameCopy.currentPuzzle = card;
  gameCopy.puzzleCount += 1;
  setGameState(gameCopy);

  if (allPuzzlesSolved) setGameStatus('cardsSolved');
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
  gameCopy.message = '';

  if (cardAction === 'playPuzzle') {
    playPuzzle(card, gameCopy, setGameState, setGameStatus);
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

const boardUtils = {
  defaultGame,
  defaultResult,
  createDeck,
  checkCards,
  updateSelection,
  toggleCardSelect,
  handleShuffle,
  handleDeselectAll,
  handleCardSelection,
  resetPuzzle,
  resetGame,
};

export default boardUtils;
