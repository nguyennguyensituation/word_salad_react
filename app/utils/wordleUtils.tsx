import { LetterResult, CardState, WordleState} from '../lib/definitions';
import WORDLE_DICTIONARY from '@/app/lib/wordleDictionary';
import { PUZZLE_MESSAGES } from '@/app/lib/messages';
import puzzUtils from '@/app/utils/puzzleUtils';

export function defaultWordle(card: CardState): WordleState {
  return {
    card,
    activeIdx: 0,
    rows: new Array(6).fill(['', '', '', '', '']),
    message: '',
    prevGuesses: [],
    results: new Array(6).fill([]),
  };
}

function getLetterResults(letters: string[], row: string[],): LetterResult[] {
  // First pass: check letter position
  const results = row.map((ltr, idx) => {
    if (ltr === letters[idx]) {
      letters[idx] = '';
      return 'correct';
    } else {
      return !letters.includes(ltr) ? 'incorrectLetter' : 'incorrectPosition';
    }
  });

  // Second pass: adjust for duplicate letters
  results.forEach((result, idx) => {
    if (result === 'incorrectPosition') {
      if (letters.includes(row[idx])) {
        letters[letters.findIndex( ltr => ltr === row[idx])] = '';
      } else {
        results[idx] = 'incorrectLetter';
      }
    }
  });

  return results;
}

function updateLetterStyles(activeRow: string[],
  wordleState: WordleState,
  setWordleState: (state: WordleState) => void): void {
  const word = wordleState.card.word;
  const result = getLetterResults(word.split(''), activeRow);
  const wordleCopy = {...wordleState};

  wordleCopy.results[wordleState.activeIdx] = result;
  wordleCopy.activeIdx = wordleState.activeIdx + 1;
  setWordleState(wordleCopy);
}

function showNoMatch(activeRow: string[],
  isLastRow: boolean,
  wordleState: WordleState,
  setWordleState: (state: WordleState) => void) {
  const wordleCopy = {...wordleState};
  const guess = activeRow.join('');
  const word = wordleState.card.word.toUpperCase();
  const message = !isLastRow ? '' : `${PUZZLE_MESSAGES['noMatch']} ${word}`;

  wordleCopy.prevGuesses = [...wordleState.prevGuesses, guess];
  wordleCopy.message = message;
  updateLetterStyles(activeRow, wordleCopy, setWordleState);
}

function showMatch(activeRow: string[],
  wordleState: WordleState,
  setWordleState: (state: WordleState) => void): void {
  const wordleCopy = {...wordleState};

  wordleCopy.message = PUZZLE_MESSAGES['wordleMatch'];
  updateLetterStyles(activeRow, wordleCopy, setWordleState);
}

function invalidGuess(isValid: boolean,
  wordleState: WordleState,
  setWordleState: (state: WordleState) => void): void {
  const wordleCopy = {...wordleState};
  const message = PUZZLE_MESSAGES[!isValid ? 'invalid' : 'duplicate'];

  wordleCopy.message = message;
  setWordleState(wordleCopy);
}

function isValidWordle(activeRow: string[]): boolean {
  const word = activeRow.join('');
  let left = 0;
  let right = WORDLE_DICTIONARY.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (WORDLE_DICTIONARY[mid] === word) {
      return true;
    } else if (WORDLE_DICTIONARY[mid] < word) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
}

function getWordValidity(word: string,
  activeRow: string[],
  wordleState: WordleState): {isValid: boolean,
    isUnique: boolean,
    isMatch: boolean} {
  return { isValid: isValidWordle(activeRow),
    isUnique: puzzUtils.isUniqueWord(activeRow, wordleState.prevGuesses),
    isMatch: puzzUtils.isMatch(word, activeRow)};
}

function checkGuess(activeRow: string[],
  wordleState: WordleState,
  setWordleState: (state: WordleState) => void): void {
  const word = wordleState.card.word;
  const { isValid, isUnique, isMatch } = getWordValidity(word, activeRow,
    wordleState);
  const isLastRow = wordleState.activeIdx === 5;

  if (!isValid || !isUnique) {
    invalidGuess(isValid, wordleState, setWordleState);
  } else if (isMatch) {
    showMatch(activeRow, wordleState, setWordleState);
    puzzUtils.setPuzzleComplete(wordleState.card, true);
  } else {
    showNoMatch(activeRow, isLastRow, wordleState, setWordleState);

    if (isLastRow) puzzUtils.setPuzzleComplete(wordleState.card, false);
  }
}

function updateLetter(move: string,
  input: string,
  activeRow: string[],
  wordleState: WordleState,
  setWordleState: (state: WordleState) => void): void {
  const word = wordleState.card.word;
  const activeCell = puzzUtils.getActiveCell(move, activeRow, word);
  const wordleCopy = {...wordleState};
  const updatedRow = [...activeRow];

  updatedRow[activeCell] = move === 'deleteLetter' ? '' : input;
  wordleCopy.rows[wordleState.activeIdx] = updatedRow;
  wordleCopy.message = '';
  setWordleState(wordleCopy);
}

export function wordleKeyDown(event: KeyboardEvent,
  wordleState: WordleState,
  setWordleState: (state: WordleState) => void): void {
  const { puzzlePlayed, word } = wordleState.card;

  if (puzzlePlayed) return;

  const input = event.key.toLowerCase();
  const activeRow = wordleState.rows[wordleState.activeIdx];
  const move = puzzUtils.getMove(input, activeRow, word);

  if (move === 'addLetter' || move === 'deleteLetter') {
    updateLetter(move, input, activeRow, wordleState, setWordleState);
  } else if (move === 'checkGuess') {
    checkGuess(activeRow, wordleState, setWordleState);
  }
}
