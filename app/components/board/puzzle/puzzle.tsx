import styles from '@/app/components/board/puzzle/Puzzle.module.css';
import Crossword from '@/app/components/board/puzzle/Crossword';
import { CardState } from '@/app/lib/definitions';
import { PUZZLE_INSTRUCTIONS } from '@/app/components/board/puzzle/messages';

export default function Puzzle(props: {card: CardState}) {
  const puzzleType = props.card.puzzleType;
  const puzzleClasses = `${styles.title} ${puzzleType === 'crossword' ? 'blue' : 'green'}`;
  const instructions = puzzleType && PUZZLE_INSTRUCTIONS[puzzleType];

  return (
    <article className={styles.puzzle}>
      <header>
        <section>
          <h2 className={puzzleClasses}>{puzzleType}</h2>
          <button>&#215;</button>
        </section>
        <p className={styles.instructions}>
          <b>How to play: </b> {instructions}
        </p>
      </header>
      {puzzleType === 'crossword' && <Crossword card={props.card}/>}
    </article>
  );
}