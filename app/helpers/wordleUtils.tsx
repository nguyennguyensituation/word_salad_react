import VALID_WORDLE_WORDS from '@/app/lib/wordleDictionary';
import { getActiveCell } from '@/app/helpers/puzzleUtils';

function isValidWord(letters: string[]): boolean {
  const word = letters.join('');
  let left = 0;
  let right = VALID_WORDLE_WORDS.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
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

function updateCell(move: string,
  input: string,
  letters: string[],
  word: string,
  setLetters: (row: string[]) => void): void {
  const activeCell = getActiveCell(move, letters, word);
  const lettersCopy = [...letters];
  
  lettersCopy[activeCell] = move === 'deleteLetter' ? '' : input;
  setLetters(lettersCopy);
}

// // Return array of results for each guessed letter
// function getLetterResults(word: string,
//   row: string[],): string[] {
//   let winningLetters = word.split('');

//   let results = row.map((ltr, idx) => {
//     if (ltr === winningLetters[idx]) {
//       winningLetters[idx] = '';
//       return 'correct';
//     } else if (!winningLetters.includes(ltr)) {
//       return 'incorrect-letter';
//     } else {
//       return 'incorrect-position';
//     }
//   });

//   // Check for duplicates
//   results.forEach((result, idx) => {
//     if (result === 'incorrect-position') {
//       if (winningLetters.includes(row[idx])) {
//         const wordIdx = winningLetters.findIndex( ltr => ltr === row[idx]);
//         winningLetters[wordIdx] = '';
//       } else {
//         results[idx] = 'incorrect-letter';
//       }
//     }
//   })

//   return results;
// }

const wordleUtils = {
  isValidWord,
  updateCell,
  // getLetterResults,
}

export default wordleUtils;