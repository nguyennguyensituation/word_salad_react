import { useState } from 'react';
import styles from '@/app/components/board/puzzle/Crossword.module.css';
import { CrosswordCells } from '@/app/components/board/puzzle/Cells';

export default function Crossword(props: {
  word: string,
  crosswordClue: string,
}) {
  const { word, crosswordClue } = props;
  const [letters, setLetters] = useState<string[]>(new Array(word.length).fill(''));
  const [mistakesCounter, setMistakesCounter] = useState<number>(4);
  const [message, setMessage] = useState<string>('');

  return (
  <>
    <p className={styles.clue}>{crosswordClue}</p>
    <CrosswordCells letters={letters}/>
    <fieldset>
      <div>
        <p>Mistakes remaining:</p>
        <p>TK dots: {mistakesCounter}</p>
      </div>
      <button>Submit</button>
    </fieldset>
    <div className={styles.message}>{message}</div>
  </>);
}