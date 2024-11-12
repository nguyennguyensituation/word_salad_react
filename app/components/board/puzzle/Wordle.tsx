import { useState } from 'react';
import styles from '@/app/components/board/puzzle/Wordle.module.css';
import { CardState } from '@/app/lib/definitions';
import Row from '@/app/components/board/puzzle/Row';

export default function Wordle(props: { card: CardState }) {
  const [message] = useState<string>('');
  const [rows] = useState(new Array(6).fill(''));

  return (
    <>
      <section className={styles.wordleContainer}>
        {rows.map((row, idx) => {
          return <Row row={row} idx={idx} key={idx}/>;
        })}
      </section>
      <section>
        {message &&
          <p className={styles.message}>{message}</p>
        }
      </section>
    </>
  );
}


