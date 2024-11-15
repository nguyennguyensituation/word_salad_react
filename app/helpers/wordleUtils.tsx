import VALID_WORDLE_WORDS from '@/app/lib/wordleDictionary';

export function isValidWord(letters: string[]): boolean {
  const word = letters.join('');
  let left = 0;
  let right = VALID_WORDLE_WORDS.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (VALID_WORDLE_WORDS[mid] === word) {
      return true;
    } else if (VALID_WORDLE_WORDS[mid] < word) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
}

// Return array of results for each guessed letter
export function getLetterResults(word: string,
  row: string[],): string[] {
  const winningLetters = word.split('');

  // Get initial results
  const results = row.map((ltr, idx) => {
    if (ltr === '') {
      return "empty";
    } else if (ltr === winningLetters[idx]) {
      winningLetters[idx] = '';
      return 'correct';
    } else if (!winningLetters.includes(ltr)) {
      return 'incorrectLetter';
    } else {
      return 'incorrectPosition';
    }
  });

  // Handle duplicate letters
  results.forEach((result, idx) => {
    if (result === 'incorrectPosition') {
      if (winningLetters.includes(row[idx])) {
        const wordIdx = winningLetters.findIndex( ltr => ltr === row[idx]);
        winningLetters[wordIdx] = '';
      } else {
        results[idx] = 'incorrectLetter';
      }
    }
  });

  return results;
}

export function renderResults(results: string[],
  rowResults: string[][],
  currentRowIdx: number,
  setRowResults: (row: string[][]) => void,
) {
  const resultsCopy = [...rowResults];
  resultsCopy[currentRowIdx] = results;
  setRowResults(resultsCopy);
}

const wordleUtils = {
  isValidWord,
  getLetterResults,
  renderResults
};

export default wordleUtils;
