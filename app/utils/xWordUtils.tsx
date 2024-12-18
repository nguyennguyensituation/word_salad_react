import puzzUtils from '@/app/utils/puzzleUtils';
import { CardState, CrosswordState } from '@/app/lib/definitions';
import { PUZZLE_MESSAGES } from '../lib/messages';
import { shake, bounce } from '@/app/utils/animations';

const { isUniqueWord, isMatch, setPuzzleComplete, getActiveCell,
  getMove } = puzzUtils;

function showNoMatch(isLastGuess: boolean,
  xWordState: CrosswordState,
  setXWordState: (state: CrosswordState) => void): void {
  const {prevGuesses, mistakesCount} = xWordState;
  const guess = xWordState.letters.join('');
  const word = xWordState.card.word.toUpperCase();
  const message = !isLastGuess ? '' : `${PUZZLE_MESSAGES['noMatch']} ${word}`;
  const xWordCopy = {...xWordState};
  const row = document.getElementById('crossword-row');

  if (row) shake([...row.children]);

  xWordCopy.prevGuesses = [...prevGuesses, guess];
  xWordCopy.mistakesCount = mistakesCount - 1;
  xWordCopy.message = message;
  setXWordState(xWordCopy);
}

function showMatch(xWordState: CrosswordState,
  setXWordState: (state: CrosswordState) => void): void {
  const xWordCopy = {...xWordState};
  const row = document.getElementById('crossword-row');

  if (row) bounce([...row.children]);

  xWordCopy.message = PUZZLE_MESSAGES['crosswordMatch'];
  setXWordState(xWordCopy);
}

function invalidGuess(xWordState: CrosswordState,
  setXWordState: (state: CrosswordState) => void): void {
  const xWordCopy = {...xWordState};
  const row = document.getElementById('crossword-row');

  if (row) shake([...row.children]);

  xWordCopy.message = PUZZLE_MESSAGES['duplicate'];
  setXWordState(xWordCopy);
}

export function checkGuess(xWordState: CrosswordState,
  setXWordState: (state: CrosswordState) => void): void {
  const {letters, prevGuesses, card} = xWordState;
  const isUnique = isUniqueWord(letters, prevGuesses);
  const isMatching = isMatch(card.word, letters);
  const isLastGuess = xWordState.mistakesCount === 1;

  if (!isUnique) {
    invalidGuess(xWordState, setXWordState);
  } else if (isMatching) {
    showMatch(xWordState, setXWordState);
    setPuzzleComplete(xWordState.card, true);
  } else {
    showNoMatch(isLastGuess, xWordState, setXWordState);

    if (isLastGuess) setPuzzleComplete(xWordState.card, false);
  }
}

function updateLetter(move: string,
  input: string,
  xWordState: CrosswordState,
  setXWordState: (state: CrosswordState) => void): void {
  const {card, letters} = xWordState;
  const activeCell = getActiveCell(move, letters, card.word);
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
  const move = getMove(input, letters, card.word);

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
