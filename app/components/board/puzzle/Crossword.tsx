import { useState } from 'react';
import styles from '@/app/components/board/puzzle/Crossword.module.css';
import { CrosswordCells } from '@/app/components/board/puzzle/Cells';
import { CardState } from '@/app/lib/definitions';

export default function Crossword(props: { card: CardState }) {
  const { word, crosswordClue } = props.card;
  const [letters] = useState<string[]>(new Array(word.length).fill(''));
  const [mistakesCounter] = useState<number>(4);
  const [message] = useState<string>('');

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
    </>
  );
}