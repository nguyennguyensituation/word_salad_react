import { DeckData, CardState, CategoryDetail, ConnectionsResult, GameStatus, ConnectionsState } from '@/app/lib/definitions';
import shuffle from '@/app/helpers/shuffle';
import { BOARD_MESSAGES } from "@/app/lib/messages";

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

function handleShuffle(deck: CardState[],
  setDeck: (deck: CardState[]) => void,
  setMessage: (message: string) => void): void {
  setMessage('');
  setDeck(shuffle(deck));
}

function updateSelection(card: CardState,
  cardAction: string,
  selection: CardState[],
  setSelection: (cards: CardState[]) => void): void {
  const updated = (cardAction === 'removeCard') ?
    selection.filter(selected => selected.word !== card.word) :
    [...selection, card];

  setSelection(updated);
}

function toggleCardSelect(word: string,
  deck: CardState[]): void {
  const idx = deck.findIndex(card => card.word === word);
  deck[idx].isSelected = !deck[idx].isSelected;
}

function handleDeselectAll(selectedCards: CardState[],
  deck: CardState[],
  setSelection: (selection: CardState[]) => void,
  setMessage: (message: string) => void): void {
  setMessage('');
  selectedCards.forEach(card => toggleCardSelect(card.word, deck));
  setSelection([]);
}

export function selectCard(card: CardState,
  numSelectedCards: number,
  onSelection: (card: CardState, cardAction: string) => void): void {
  const {puzzlePlayed, isSelected} = card;
  let cardAction = '';

  if (!puzzlePlayed) {
    cardAction = 'playPuzzle';
  } else if (isSelected) {
    cardAction = 'removeCard';
  } else if (numSelectedCards < 4) {
    cardAction = 'addCard';
  }

  if (cardAction) onSelection(card, cardAction);
}

function duplicateGuess(selection: CardState[],
  prevGuesses: string[][]): boolean {
  const wordString = selection.map(card => card.word).sort().join(',');

  for (let guessIdx = 0; guessIdx < prevGuesses.length; guessIdx++) {
    const guess = prevGuesses[guessIdx].sort().join(',');
    if (guess === wordString) return true;
  }
  return false;
}

function checkSelection(selection: CardState[],
  prevGuesses: string[][]): ConnectionsResult {
  if (duplicateGuess(selection, prevGuesses)) return 'duplicate';

  const categoryCount: { [key: string]: number} = {};
  let result: ConnectionsResult = 'noMatch';

  selection.forEach((card, idx) => {
    const category = card.category;

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

function getCategory(name: string,
  allCtgs: CategoryDetail[]): CategoryDetail {
  return allCtgs.filter(cat => cat.name === name)[0];
}

function updateCategories(category: CategoryDetail,
  solvedCtgs: CategoryDetail[],
  allCtgs: CategoryDetail[],
  setSolvedCtgs: (categories: CategoryDetail[]) => void,
  setAllCtgs: (categories: CategoryDetail[]) => void): void {
  const filtered = allCtgs.filter(cat => {
    return cat.name !== category.name;
  });

  setSolvedCtgs([...solvedCtgs, category]);
  setAllCtgs(filtered);
}

function updateDeck(categoryName: string,
  deck: CardState[],
  setDeck: (deck: CardState[]) => void,
  setSelection: (cards: CardState[]) => void): void {
  const filtered = deck.filter(card => card.category !== categoryName);

  setDeck(filtered);
  setSelection([]);
}

function showWin(selection: CardState[],
  allCtgs: CategoryDetail[],
  solvedCtgs: CategoryDetail[],
  deck: CardState[],
  setSelection: (selection: CardState[]) => void,
  setAllCtgs: (categories: CategoryDetail[]) => void,
  setSolvedCtgs: (categories: CategoryDetail[]) => void,
  setDeck: (deck: CardState[]) => void,
  setGameStatus: (status: GameStatus) => void): void {
  const category = getCategory(selection[0].category, allCtgs);
  const isLastCategory = solvedCtgs.length === 3;

  updateCategories(category, solvedCtgs, allCtgs, setSolvedCtgs, setAllCtgs);
  updateDeck(category.name, deck, setDeck, setSelection);

  if (isLastCategory) setGameStatus('gameWon');
}

function showLoss(selection: CardState[],
  prevGuesses: string[][],
  mistakesCounter: number,
  setMistakesCounter: (count: number) => void,
  setPrevGuesses: (guesses: string[][]) => void): void {
  const guess = selection.map(card => card.word);

  setPrevGuesses([...prevGuesses, guess]);
  setMistakesCounter(mistakesCounter - 1);
}

function revealCategories(solvedCtgs: CategoryDetail[],
  allCtgs: CategoryDetail[],
  setSolvedCtgs: (categories: CategoryDetail[]) => void,
  setGameStatus: (status: GameStatus) => void,
  setDeck: (deck: CardState[]) => void): void {
  const revealedCtgs = [...solvedCtgs, allCtgs].flat();

  setSolvedCtgs(revealedCtgs);
  setGameStatus('gameLost');
  setDeck([]);
}

function checkCards(connectionsState: ConnectionsState): void {
  const {selection, prevGuesses, allCtgs, solvedCtgs, deck, mistakesCounter,
    setMessage, setPrevGuesses, setAllCtgs, setSolvedCtgs, setDeck,
    setMistakesCounter, setSelection, setGameStatus} = connectionsState;
  const result = checkSelection(selection, prevGuesses);

  if (result === 'duplicate') {
    setMessage(BOARD_MESSAGES['duplicateGuess']);
  } else if (result === 'solved') {
    showWin(selection, allCtgs, solvedCtgs, deck, setSelection, setAllCtgs,
      setSolvedCtgs, setDeck, setGameStatus);
  } else {
    if (result === 'oneAway' && mistakesCounter !== 1) setMessage(BOARD_MESSAGES['oneAway']);

    showLoss(selection, prevGuesses, mistakesCounter, setMistakesCounter,
      setPrevGuesses);

    if (mistakesCounter === 1) revealCategories(solvedCtgs, allCtgs,
      setSolvedCtgs, setGameStatus, setDeck);
  }
}

const boardUtils = {
  createDeck,
  checkCards,
  updateSelection,
  toggleCardSelect,
  handleShuffle,
  handleDeselectAll,
};

export default boardUtils;