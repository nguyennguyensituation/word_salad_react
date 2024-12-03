import { useState, useEffect } from 'react';
import styles from '@/app/components/board/puzzle/Crossword.module.css';
import { CrosswordCells } from '@/app/components/board/puzzle/Cells';
import { CardState, CrosswordState } from '@/app/lib/definitions';
import Mistakes from '../mistakes/Mistakes';
import {xWordKeyDown, defaultXWord} from '@/app/utils/xWordUtils';

export default function Crossword(props: { card: CardState }) {
  const { puzzleSolved, crosswordClue} = props.card;
  const [xWordState, setXWordState] = useState<CrosswordState>(defaultXWord(props.card));
  const {letters, mistakesCount, message} = xWordState;
  const handleKeyDown = (event: KeyboardEvent) => {
    xWordKeyDown(event, xWordState, setXWordState);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [xWordState]);

  return (
    <>
      <p className={styles.clue}>{crosswordClue}</p>
      <CrosswordCells letters={letters} puzzleSolved={puzzleSolved}/>
      <Mistakes remainingMistakes={mistakesCount} puzzle={true}/>
      {message && <div className={styles.message}>{message}</div>}
    </>
  );
}