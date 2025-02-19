import { Move, CardState, PuzzleResult } from '@/app/lib/definitions';
import { PUZZLE_MESSAGES } from '@/app/lib/messages';

function isUniqueWord(letters: string[],
  prevGuesses: string[]): boolean {
  const guess = letters.join('');

  return !prevGuesses.includes(guess);
}

function isMatch(word: string, letters: string[]): boolean {
  return word === letters.join('');
}

function isLetter(input: string): boolean {
  return !!(input.length === 1 && input.match(/[a-z]/));
}

export function getActiveCell(move: string,
  letters: string[],
  word: string): number {
  const firstEmptyIdx = letters.findIndex(char => char === '');
  const lastIdx = word.length - 1;
  const idx = firstEmptyIdx !== -1 ? firstEmptyIdx : lastIdx;

  if (move === 'deleteLetter') {
    return (idx === 0 || letters[idx] !== '') ? idx : idx - 1;
  }

  return idx;
}

function getMove(input: string,
  letters: string[],
  word: string): Move {
  const rowIsComplete = letters.join('').length === word.length;

  if (isLetter(input) && !rowIsComplete) {
    return 'addLetter';
  } else if (input === 'backspace') {
    return 'deleteLetter';
  } else if (input === 'enter' && rowIsComplete) {
    return 'checkGuess';
  }
  return 'invalid';
}

function setPuzzleComplete(card: CardState, isWinner: boolean) {
  card.puzzlePlayed = true;
  card.puzzleSolved = isWinner;
}

export function confirmClose(buttonRef: React.RefObject<HTMLElement>,
  card: CardState,
  resetPuzzle: () => void,
  puzzleResult: PuzzleResult,
  setPuzzleResult: (result: PuzzleResult) => void) {
  const { puzzlePlayed, puzzleType } = card;
  const resultCopy = {...puzzleResult};

  if (!puzzlePlayed && puzzleType && confirm(PUZZLE_MESSAGES[puzzleType])) {
    if (card.puzzleType) {
      resultCopy[card.puzzleType].push(false);
    }
    setPuzzleResult(resultCopy);
    card.puzzlePlayed = true;
    resetPuzzle();
  } else if (puzzlePlayed) {
    resetPuzzle();
  } else if (buttonRef.current) {
    buttonRef.current.blur();
  }
}

const puzzUtils = {
  confirmClose,
  getMove,
  getActiveCell,
  isUniqueWord,
  isMatch,
  setPuzzleComplete,
};

export default puzzUtils;
