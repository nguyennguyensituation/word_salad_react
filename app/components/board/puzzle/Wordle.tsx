import { useState, useEffect } from 'react';
import styles from '@/app/components/board/puzzle/Wordle.module.css';
import { CardState } from '@/app/lib/definitions';
import Row from '@/app/components/board/puzzle/Row';
import wordleKeyDown from '@/app/helpers/wordleUtils';

export default function Wordle(props: { card: CardState }) {
  const [message, setMessage] = useState<string>('');
  const [rows, setRows] = useState<string[][]>(new Array(6).fill(['', '', '', '', '']));
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [prevGuesses, setPrevGuesses] = useState<string[]>([]);
  const [results, setResults] = useState<string[][]>(new Array(6).fill([]));
  const handleKeyDown = (event: KeyboardEvent): void => {
    wordleKeyDown(event, setRows, { card: props.card, rows, activeIdx,
      prevGuesses, results, setActiveIdx, setPrevGuesses, setResults,
      setMessage });
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
