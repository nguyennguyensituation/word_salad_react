import { useState, useEffect } from 'react';
import styles from '@/app/components/board/puzzle/Wordle.module.css';
import { CardState, WordleState, PuzzleResult } from '@/app/lib/definitions';
import Row from '@/app/components/board/puzzle/Row';
import {wordleKeyDown, defaultWordle} from '@/app/utils/wordleUtils';

export default function Wordle(props: { card: CardState,
  puzzleResult: PuzzleResult,
  setPuzzleResult: (result: PuzzleResult) => void}) {
  const [wordleState, setWordleState] =
    useState<WordleState>(defaultWordle(props.card));
  const {rows, prevGuesses, results, message} = wordleState;
  const handleKeyDown = (event: KeyboardEvent): void => {
    wordleKeyDown(event, wordleState, setWordleState,
      props.puzzleResult, props.setPuzzleResult);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rows, prevGuesses]);

  return (
    <>
      <section className={styles.container}>
        {rows.map((row, idx) => <Row row={row} idx={idx} key={`row-${idx}`} results={results[idx]}/>)}
      </section>
      <section>
        {message && <p className={styles.message}>{message}</p>}
      </section>
    </>
  );
}
