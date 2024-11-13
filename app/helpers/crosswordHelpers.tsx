import { CardState } from "../lib/definitions";
import { PUZZLE_MESSAGES } from '@/app/lib/messages';

export function isLetter(input: string) {
  return !!(input.length === 1 && input.match(/[a-zA-Z]/));
}

export function getMove(input: string,
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

export function getCellIdx(move: string,
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

export function updateCrosswordCell(move: string,
  input: string,
  letters: string[],
  word: string,
  setLetters: (newLetters: string[]) => void) {
  const activeCell = getCellIdx(move, letters, word);
  const lettersCopy = [...letters];

  lettersCopy[activeCell] = move === 'deleteLetter' ? '' : input;
  setLetters(lettersCopy);
}

export function isWinner(word: string, letters: string[]) {
  return word === letters.join('');
}

export function showWin(card: CardState,
  setMessage: (message: string) => void) {
  card.puzzleSolved = true;
  card.puzzlePlayed = true;
  setMessage(PUZZLE_MESSAGES['match']);
}

export function showLoss(card: CardState,
  setMessage: (message: string) => void) {
  card.puzzleSolved = false;
  card.puzzlePlayed = true;
  setMessage(`${PUZZLE_MESSAGES['noMatch']} ${card.word.toUpperCase()}`);
}
