import { useState } from 'react';
import styles from '@/app/components/board/puzzle/Wordle.module.css';
import { CardState } from '@/app/lib/definitions';
import Row from '@/app/components/board/puzzle/Row';

export default function Wordle(props: { card: CardState }) {
  const { word } = props.card;
  const [letters] = useState<string[]>(new Array(word.length).fill(''));
  const [message] = useState<string>('test message');
  const [rows] = useState(new Array(6).fill(''));

  return (
    <>
      <section className={styles.wordleContainer}>
        {rows.map((row, idx) => {
          return <Row row={row} idx={idx} key={idx}/>;
        })}
      </section>
      <section>
        <p className={styles.message}>{message}</p>
      </section>
    </>
  );
}


