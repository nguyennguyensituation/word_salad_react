import styles from '@/app/components/board/Board.module.css';
import Card from '@/app/components/board/Card';
import {CardData} from '@/app/lib/definitions';

export default function Board(props: {deck: CardData[]}) {
  const deck = props.deck;

  return (
    <article className={styles.board}>
      {deck.map(data => <Card card={data} key={data.id}/>)}
    </article>
  );
}