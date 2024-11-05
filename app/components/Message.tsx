import styles from '@/app/components/Message.module.css';

const MESSAGES = {
  cardsNotSolved: 'First, solve the puzzles on the blank cards to reveal the missing words...',
  cardsSolved: 'All the cards have been solved! Now, create four groups of four!',
  gameWon: 'You found all the categories! Great job!',
  gameLost: 'Better luck next time!',
};

export default function Message(props: {
  status: 'cardsNotSolved' | 'cardsSolved' | 'gameWon' | 'gameLost'
}) {
  const messageContent: string = MESSAGES[props.status];

  return (
    <section className={styles.message}>
      <p>{messageContent}</p>
    </section>
  );
}
