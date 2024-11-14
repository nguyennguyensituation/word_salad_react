import { Move, CardState } from '@/app/lib/definitions';
import { act } from 'react';

function resetMessage(message: string,
  setMessage: (message: string) => void): void {
  if (message !== '') {
    setMessage('');
  }
}

function isLetter(input: string): boolean {
  return !!(input.length === 1 && input.match(/[a-z]/));
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

function isUniqueWord(letters: string[],
  prevGuesses: string[]): boolean {
  const guess = letters.join('');
  return !prevGuesses.includes(guess);
}

function isMatch(word: string, letters: string[]): boolean {
  return word === letters.join('');
}

function setWin(card: CardState): void {
  card.puzzleSolved = true;
  card.puzzlePlayed = true;
}

function updatePrevGuesses(letters: string[],
  prevGuesses: string[],
  setPrevGuesses: (guesses: string[]) => void): void {
  const guess = letters.join('');

  setPrevGuesses([...prevGuesses, guess]);
}

function decrementMistakes( mistakesCount: number,
  setMistakesCount: (count: number) => void,): void {
  setMistakesCount(mistakesCount - 1);
}

const puzzUtils = {
  resetMessage,
  getMove,
  updateCell,
  isUniqueWord,
  isMatch,
  setWin,
  updatePrevGuesses,
  decrementMistakes
}

export default puzzUtils;