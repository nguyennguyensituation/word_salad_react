import WORDLE_DICTIONARY from '@/app/lib/wordleDictionary';
import { WordleResult } from '../lib/definitions';

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

function getLetterResults(word: string, row: string[],): WordleResult[] {
  const letters = word.split('');

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

function renderResults(results: string[],
  rowResults: string[][],
  currentRowIdx: number,
  setRowResults: (row: string[][]) => void): void {
  const resultsCopy = [...rowResults];

  resultsCopy[currentRowIdx] = results;
  setRowResults(resultsCopy);
}

const wordleUtils = {
  isValidWord,
  getLetterResults,
  renderResults,
};

export default wordleUtils;
