import { CardState } from "../lib/definitions";
import { PUZZLE_MESSAGES } from '@/app/lib/messages';

function isLetter(input: string) {
  return !!(input.length === 1 && input.match(/[a-zA-Z]/));
}

function getMove(input: string,
  letters: string[],
  word: string) {
  const rowIsComplete = letters.join('').length === word.length;

  if (isLetter(input) && !rowIsComplete) {
    return 'addLetter';
  } else if (input === 'Backspace') {
    return 'deleteLetter';
  } else if (input === 'Enter' && rowIsComplete) {
    return 'checkGuess';
  }
  return 'invalid';
}

function getCellIdx(move: string,
  letters: string[],
  word: string) {
  const firstEmptyIdx = letters.findIndex(char => char === '');
  const lastIdx = word.length - 1;
  const idx = firstEmptyIdx !== -1 ? firstEmptyIdx : lastIdx;

  if (move === 'deleteLetter') {
    return (idx === 0 || letters[idx] !== '') ? idx : idx - 1;
  }
  return idx;
}

function updateCell(move: string,
  input: string,
  letters: string[],
  word: string,
  setLetters: (newLetters: string[]) => void) {
  const activeCell = getCellIdx(move, letters, word);
  const lettersCopy = [...letters];

  lettersCopy[activeCell] = move === 'deleteLetter' ? '' : input.toLowerCase();
  setLetters(lettersCopy);
}

function isValidGuess(letters: string[],
  prevGuesses: string[]) {
  const guess = letters.join('');
  return !prevGuesses.includes(guess);
}

function checkGuess(card: CardState,
  letters: string[],
  prevGuesses: string[],
  mistakesCount: number,
  setMessage: (message: string) => void,
  setPrevGuesses: (guesses: string[]) => void,
  setMistakesCount: (count:  number) => void) {
  const word = card.word;

  if (isMatch(word, letters)) {
    showWin(card, setMessage);
  } else {
    updatePrevGuesses(letters, prevGuesses, setPrevGuesses);
    decrementMistakes(mistakesCount, setMistakesCount);

    if (mistakesCount === 1) {
      showLoss(card, setMessage);
    }
  }
}

function isMatch(word: string, letters: string[]) {
  return word === letters.join('');
}

function updatePrevGuesses(letters: string[],
  prevGuesses: string[],
  setPrevGuesses: (guesses: string[]) => void) {
  setPrevGuesses([...prevGuesses, letters.join('')]);
}

function showWin(card: CardState,
  setMessage: (message: string) => void) {
  card.puzzleSolved = true;
  card.puzzlePlayed = true;
  setMessage(PUZZLE_MESSAGES['match']);
}

function showLoss(card: CardState,
  setMessage: (message: string) => void) {
  card.puzzleSolved = false;
  card.puzzlePlayed = true;
  setMessage(`${PUZZLE_MESSAGES['noMatch']} ${card.word.toUpperCase()}`);
}

function decrementMistakes( mistakesCount: number,
  setMistakesCount: (count: number) => void,) {
  setMistakesCount(mistakesCount - 1);
}

function resetMessage(message: string,
  setMessage: (message: string) => void) {
  if (message !== '') {
    setMessage('');
  }
}

const xWordUtils = {
  getMove,
  updateCell,
  isValidGuess,
  checkGuess,
  isMatch,
  updatePrevGuesses,
  showWin,
  showLoss,
  decrementMistakes,
  resetMessage
};

export default xWordUtils;