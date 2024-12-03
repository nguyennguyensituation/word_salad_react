import puzzUtils from '@/app/utils/puzzleUtils';
import { CardState, CrosswordState } from '@/app/lib/definitions';
import { PUZZLE_MESSAGES } from '../lib/messages';

function showNoMatch(isLastGuess: boolean,
  xWordState: CrosswordState,
  setXWordState: (state: CrosswordState) => void): void {
  const {prevGuesses, mistakesCount} = xWordState;
  const guess = xWordState.letters.join('');
  const word = xWordState.card.word.toUpperCase();
  const message = !isLastGuess ? '' : `${PUZZLE_MESSAGES['noMatch']} ${word}`;
  const xWordCopy = {...xWordState};

  xWordCopy.prevGuesses = [...prevGuesses, guess];
  xWordCopy.mistakesCount = mistakesCount - 1;
  xWordCopy.message = message;
  setXWordState(xWordCopy);
}

function showMatch(xWordState: CrosswordState,
  setXWordState: (state: CrosswordState) => void): void {
  const xWordCopy = {...xWordState};

  xWordCopy.message = PUZZLE_MESSAGES['crosswordMatch'];
  setXWordState(xWordCopy);
}

function invalidGuess(xWordState: CrosswordState,
  setXWordState: (state: CrosswordState) => void): void {
  const xWordCopy = {...xWordState};

  xWordCopy.message = PUZZLE_MESSAGES['duplicate'];
  setXWordState(xWordCopy);
}

function checkGuess(xWordState: CrosswordState,
  setXWordState: (state: CrosswordState) => void): void {
  const {letters, prevGuesses, card} = xWordState;
  const isUnique = puzzUtils.isUniqueWord(letters, prevGuesses);
  const isMatch = puzzUtils.isMatch(card.word, letters);
  const isLastGuess = xWordState.mistakesCount === 1;

  if (!isUnique) {
    invalidGuess(xWordState, setXWordState);
  } else if (isMatch) {
    showMatch(xWordState, setXWordState);
    puzzUtils.setPuzzleComplete(xWordState.card, true);
  } else {
    showNoMatch(isLastGuess, xWordState, setXWordState);

    if (isLastGuess) puzzUtils.setPuzzleComplete(xWordState.card, false);
  }
}

function updateLetter(move: string,
  input: string,
  xWordState: CrosswordState,
  setXWordState: (state: CrosswordState) => void): void {
  const {card, letters} = xWordState;
  const activeCell = puzzUtils.getActiveCell(move, letters, card.word);
  const xWordCopy = {...xWordState};
  const lettersCopy = [...letters];

  lettersCopy[activeCell] = move === 'deleteLetter' ? '' : input;
  xWordCopy.letters = lettersCopy;
  xWordCopy.message = '';
  setXWordState(xWordCopy);
}

export function xWordKeyDown(event: KeyboardEvent,
  xWordState: CrosswordState,
  setXWordState: (state: CrosswordState) => void): void {
  if (xWordState.card.puzzlePlayed) return;

  const input = event.key.toLowerCase();
  const {letters, card} = xWordState;
  const move = puzzUtils.getMove(input, letters, card.word);

  if (move === 'addLetter' || move === 'deleteLetter') {
    updateLetter(move, input, xWordState, setXWordState);
  } else if (move === 'checkGuess') {
    checkGuess(xWordState, setXWordState);
  }
}

export function defaultXWord(card: CardState): CrosswordState {
  return {
    card,
    letters: new Array(card.word.length).fill(''),
    mistakesCount: 4,
    message: '',
    prevGuesses: [],
  };
}
