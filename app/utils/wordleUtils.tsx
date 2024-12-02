import { LetterResult, CardState, WordleGuess} from '../lib/definitions';
import WORDLE_DICTIONARY from '@/app/lib/wordleDictionary';
import { PUZZLE_MESSAGES } from '@/app/lib/messages';
import puzzUtils from '@/app/utils/puzzleUtils';

function updateRow(row: string[],
  rows: string[][],
  activeIdx: number,
  setRows: (rows: string[][]) => void): void {
  const updatedRows = [...rows];

  updatedRows[activeIdx] = row;
  setRows(updatedRows);
}

function updateCell(move: string,
  input: string,
  activeRow: string[],
  activeIdx: number,
  rows: string[][],
  word: string,
  setRows: (rows: string[][]) => void): void {
  const activeCell = puzzUtils.getActiveCell(move, activeRow, word);
  const rowCopy = [...activeRow];

  rowCopy[activeCell] = move === 'deleteLetter' ? '' : input;
  updateRow(rowCopy, rows, activeIdx, setRows);
}

function isValidWord(activeRow: string[]): boolean {
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

function getWordResult(word: string,
  activeRow: string[],
  prevGuesses: string[]): {isValid: boolean,
    isUnique: boolean,
    isMatch: boolean} {
  const isValid = isValidWord(activeRow);
  const isUnique = puzzUtils.isUniqueWord(activeRow, prevGuesses);
  const isMatch = puzzUtils.isMatch(word, activeRow);

  return { isValid, isUnique, isMatch };
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

function updateLetterDisplay(word: string,
  activeRow: string[],
  rowResults: string[][],
  currentRowIdx: number,
  setRowResults: (row: string[][]) => void): void {
  const result = getLetterResults(word.split(''), activeRow);
  const resultsCopy = [...rowResults];

  resultsCopy[currentRowIdx] = result;
  setRowResults(resultsCopy);
}

function showLoss(card: CardState,
  activeRow: string[],
  prevGuesses: string[],
  currentRowIdx: number,
  setPrevGuesses: (guesses: string[]) => void,
  setCurrentRowIdx: (idx: number) => void,
  setMessage: (message: string) => void) {
  const isLastRow = currentRowIdx === 5;

  puzzUtils.updatePrevGuesses(activeRow, prevGuesses, setPrevGuesses);
  setCurrentRowIdx(currentRowIdx + 1);

  if (isLastRow) puzzUtils.showLoss(card, setMessage);
}

function checkGuess(guess: WordleGuess): void {
  const { card, rows, activeIdx, prevGuesses, results,
    setActiveIdx, setPrevGuesses, setResults, setMessage } = guess;
  const activeRow = rows[activeIdx];
  const { isValid, isUnique, isMatch } = getWordResult(card.word, activeRow,
    prevGuesses);

  if (!isValid || !isUnique) {
    setMessage(PUZZLE_MESSAGES[!isValid ? 'invalid' : 'duplicate']);
  } else {
    updateLetterDisplay(card.word, activeRow, results, activeIdx, setResults);

    if (isMatch) {
      puzzUtils.showWin(card, setMessage);
    } else {
      showLoss(card, activeRow, prevGuesses, activeIdx,
        setPrevGuesses, setActiveIdx, setMessage);
    }
  }
}

export default function wordleKeyDown(event: KeyboardEvent,
  setRows: (rows: string[][]) => void,
  guess: WordleGuess): void {
  const { card, rows, activeIdx, setMessage } = guess;
  const { puzzlePlayed, word } = card;

  if (puzzlePlayed) return;

  puzzUtils.resetMessage('', setMessage);

  const input = event.key.toLowerCase();
  const activeRow = rows[activeIdx];
  const move = puzzUtils.getMove(input, activeRow, word);

  if (move === 'addLetter' || move === 'deleteLetter') {
    updateCell(move, input, activeRow, activeIdx, rows, word, setRows);
  } else if (move === 'checkGuess') {
    checkGuess(guess);
  }
}
