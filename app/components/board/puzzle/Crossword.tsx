import { useState, useEffect } from 'react';
import styles from '@/app/components/board/puzzle/Crossword.module.css';
import { CrosswordCells } from '@/app/components/board/puzzle/Cells';
import { CardState } from '@/app/lib/definitions';
import Mistakes from '../mistakes/Mistakes';
import xWordKeyDown from '@/app/helpers/xWordUtils';

export default function Crossword(props: { card: CardState }) {
  const { word, puzzleSolved, crosswordClue} = props.card;
  const [letters, setLetters] = useState<string[]>(new Array(word.length).fill(''));
  const [mistakesCount, setMistakesCount] = useState<number>(4);
  const [message, setMessage] = useState<string>('');
  const [prevGuesses, setPrevGuesses] = useState<string[]>([]);
  const handleKeyDown = (event: KeyboardEvent) => {
    xWordKeyDown(event, props.card, letters, prevGuesses, mistakesCount,
      setMessage, setLetters, setPrevGuesses, setMistakesCount);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [letters]);

  return (
    <>
      <p className={styles.clue}>{crosswordClue}</p>
      <CrosswordCells letters={letters} puzzleSolved={puzzleSolved}/>
      <Mistakes remainingMistakes={mistakesCount} puzzle={true}/>
      {message && <div className={styles.message}>{message}</div>}
    </>
  );
}