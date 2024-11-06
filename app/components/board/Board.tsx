import styles from '@/app/components/board/Board.module.css';
import Card from '@/app/components/board/Card';
import { DeckData } from '@/app/lib/definitions';

export default function Board(props: {deck: DeckData}) {
  const deck = props.deck;

  return (
    <article className={styles.board}>
      {deck.map(card => {
        return <Card card={card} key={card.word}/>
      })}
    </article>
  );
}