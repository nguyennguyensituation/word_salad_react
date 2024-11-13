import { useState, useEffect } from 'react';
import styles from '@/app/components/board/puzzle/Crossword.module.css';
import { CrosswordCells } from '@/app/components/board/puzzle/Cells';
import { CardState } from '@/app/lib/definitions';
import Mistakes from '../mistakes/Mistakes';
import { getCrosswordMove,
  updateCrosswordCell,
  isWinner,
  crosswordWin,
  crosswordLoss } from '@/app/helpers/crosswordHelpers';

export default function Crossword(props: { card: CardState }) {
  const card = props.card;
  const word = card.word;
  const [letters, setLetters] = useState<string[]>(new Array(word.length).fill(''));
  const [mistakesCounter, setMistakesCounter] = useState<number>(4);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const input = event.key;
      const move = getCrosswordMove(input, letters, word);

      if (move === 'addLetter' || move === 'deleteLetter') { 
        updateCrosswordCell(move, input, letters, word, setLetters);
      } else if (move === 'checkGuess' && isWinner(word, letters)){
        crosswordWin(card, setMessage);
      } else if (move === 'checkGuess') {
        setMistakesCounter(mistakesCounter - 1);
        if (mistakesCounter === 1) { crosswordLoss(card, setMessage);}
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, letters);

  return (
    <>
      <p className={styles.clue}>{card.crosswordClue}</p>
      <CrosswordCells letters={letters}/>
      <Mistakes remainingMistakes={mistakesCounter} puzzle={true}/>
      {message && <div className={styles.message}>{message}</div>}
    </>
  );
}