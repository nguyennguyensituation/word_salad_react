import WORDLE_DICTIONARY from '@/app/lib/wordleDictionary';
import { WordleResult, CardState, WordleGuess} from '../lib/definitions';
import puzzUtils from '@/app/helpers/puzzleUtils';
import { PUZZLE_MESSAGES } from '@/app/lib/messages';

function updateRow(row: string[],
  rows: string[][],
  activeIdx: number,
  setRows: (rows: string[][]) => void): void {
  const rowsCopy = [...rows];
  rowsCopy[activeIdx] = row;
  setRows(rowsCopy);
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

function isValidWord(letters: string[]): boolean {
  const word = letters.join('');
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

function checkWord(word: string,
  activeRow: string[],
  prevGuesses: string[]): {isValid: boolean,
    isUnique: boolean,
    isMatch: boolean} {
  const isValid = isValidWord(activeRow);
  const isUnique = puzzUtils.isUniqueWord(activeRow, prevGuesses);
  const isMatch = puzzUtils.isMatch(word, activeRow);

  return { isValid, isUnique, isMatch };
}

function getLetterResults(letters: string[], row: string[],): WordleResult[] {
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
  puzzUtils.updatePrevGuesses(activeRow, prevGuesses, setPrevGuesses);
  setCurrentRowIdx(currentRowIdx + 1);

  const isLastRow = currentRowIdx === 5;

  if (isLastRow) puzzUtils.showLoss(card, setMessage);
}

function checkGuess(guess: WordleGuess): void {
  const { card, rows, activeIdx, prevGuesses, results,
    setActiveIdx, setPrevGuesses, setResults, setMessage } = guess;
  const activeRow = rows[activeIdx];
  const { isValid, isUnique, isMatch } = checkWord(card.word, activeRow,
    prevGuesses);

  if (!isValid || !isUnique) {
    const message = !isValid ? 'invalid' : 'duplicate';

    setMessage(PUZZLE_MESSAGES[message]);
  } else {
    updateLetterDisplay(card.word, activeRow, results,
      activeIdx, setResults);

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
  if (guess.card.puzzlePlayed) return;

  puzzUtils.resetMessage('', guess.setMessage);

  const input = event.key.toLowerCase();
  const activeRow = guess.rows[guess.activeIdx];
  const move = puzzUtils.getMove(input, activeRow, guess.card.word);

  if (move === 'addLetter' || move === 'deleteLetter') {
    updateCell(move, input, activeRow, guess.activeIdx, guess.rows,
      guess.card.word, setRows);
  } else if (move === 'checkGuess') {
    checkGuess(guess);
  }
}
