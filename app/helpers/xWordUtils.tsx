import puzzUtils from '@/app/helpers/puzzleUtils';
import { CardState } from '@/app/lib/definitions';
import { PUZZLE_MESSAGES } from '../lib/messages';

function showLoss(card: CardState,
  letters: string[],
  mistakesCount: number,
  prevGuesses: string[],
  setMistakesCount: (count: number) => void,
  setPrevGuesses: (guesses: string[]) => void,
  setMessage: (message: string) => void,
): void {
  const isLastGuess = mistakesCount === 1;

  puzzUtils.updatePrevGuesses(letters, prevGuesses, setPrevGuesses);
  puzzUtils.decrementMistakes(mistakesCount, setMistakesCount);

  if (isLastGuess) puzzUtils.showLoss(card, setMessage);
}

function checkGuess(card: CardState,
  letters: string[],
  prevGuesses: string[],
  mistakesCount: number,
  setMessage: (message: string) => void,
  setPrevGuesses: (guesses: string[]) => void,
  setMistakesCount: (count: number) => void,
): void {
  const isUnique = puzzUtils.isUniqueWord(letters, prevGuesses);
  const isMatch = puzzUtils.isMatch(card.word, letters);

  if (!isUnique) {
    setMessage(PUZZLE_MESSAGES['duplicate']);
  } else if (isMatch) {
    puzzUtils.showWin(card, setMessage);
  } else {
    showLoss(card, letters, mistakesCount, prevGuesses,
      setMistakesCount, setPrevGuesses, setMessage);
  }
}

export default function xWordKeyDown(event: KeyboardEvent, card: CardState,
  letters: string[], prevGuesses: string[], mistakesCount: number,
  setMessage: (message: string) => void,
  setLetters: (letters: string[]) => void,
  setPrevGuesses: (guesses: string[]) => void,
  setMistakesCount: (count: number) => void,
): void {
  if (card.puzzlePlayed) return;

  puzzUtils.resetMessage('', setMessage);

  const input = event.key.toLowerCase();
  const move = puzzUtils.getMove(input, letters, card.word);

  if (move === 'addLetter' || move === 'deleteLetter') {
    puzzUtils.updateCell(move, input, letters, card.word, setLetters);
  } else if (move === 'checkGuess') {
    checkGuess(card, letters, prevGuesses, mistakesCount,
      setMessage, setPrevGuesses, setMistakesCount);
  }
}