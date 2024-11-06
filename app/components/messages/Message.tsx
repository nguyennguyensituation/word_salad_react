import styles from '@/app/components/messages/Message.module.css';
import { GameStatus } from '../../lib/definitions';

const MESSAGES: Record<GameStatus, string> = {
  cardsNotSolved: 'First, solve the puzzles on the blank cards to reveal the missing words...',
  cardsSolved: 'All the cards have been solved! Now, create four groups of four!',
  gameWon: 'You found all the categories! Great job!',
  gameLost: 'Better luck next time!',
};

export default function Message(props: {
  status: GameStatus
}) {
  const messageContent: string = MESSAGES[props.status];

  return (
    <section className={styles.message}>
      <p>{messageContent}</p>
    </section>
  );
}
