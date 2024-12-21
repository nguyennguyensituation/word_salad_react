import { useState, useEffect } from 'react';
import styles from '@/app/components/board/puzzle/Crossword.module.css';
import { CrosswordCells } from '@/app/components/board/puzzle/Cells';
import { CardState, CrosswordState, PuzzleResult } from '@/app/lib/definitions';
import Mistakes from '../mistakes/Mistakes';
import Button from '@/app/components/controls/Button';
import {xWordKeyDown, defaultXWord, checkGuess} from '@/app/utils/xWordUtils';

export default function Crossword(props: { card: CardState,
  puzzleResult: PuzzleResult,
  setPuzzleResult: (result: PuzzleResult) => void}) {
  const { puzzleSolved, crosswordClue} = props.card;
  const [xWordState, setXWordState] =
    useState<CrosswordState>(defaultXWord(props.card));
  const {letters, mistakesCount, message} = xWordState;
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
  const handleKeyDown = (event: KeyboardEvent) => {
    xWordKeyDown(event, xWordState, setXWordState, setDisableSubmit, props.puzzleResult,
      props.setPuzzleResult);
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
      <Button
        id=""
        value="Submit"
        disabled={disableSubmit}
        onClick={() => checkGuess(xWordState, setXWordState, setDisableSubmit)}
        isXWord={true}
        isPrimary={true}/>
      {message && <div className={styles.message}>{message}</div>}
    </>
  );
}