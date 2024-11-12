import styles from '@/app/components/board/puzzle/Puzzle.module.css';
import Crossword from '@/app/components/board/puzzle/Crossword';
import Wordle from '@/app/components/board/puzzle/Wordle';
import { CardState } from '@/app/lib/definitions';
import { PUZZLE_INSTRUCTIONS, PUZZLE_MESSAGES } from '@/app/lib/messages';

export default function Puzzle(props: {
  card: CardState,
  closePuzzle: (card: CardState) => void,
}) {
  const card = props.card;
  const closePuzzle = props.closePuzzle;
  const puzzleType = card.puzzleType;
  const puzzleClasses = `${styles.title} ${puzzleType === 'crossword' ? 'blue' : 'green'}`;

  function confirmClose() {
    if (!card.puzzlePlayed) {
      if (puzzleType && confirm(PUZZLE_MESSAGES[puzzleType])) {
        closePuzzle(card);
      }
    }
  }

  return (
    <article className={styles.puzzle}>
      <header>
        <section>
          <h2 className={puzzleClasses}>{puzzleType}</h2>
          <button className={styles.closeBtn} onClick={() => confirmClose()}>
            &#215;
          </button>
        </section>
        {puzzleType &&
          <p className={styles.instructions}>
            <b>How to play: </b> {PUZZLE_INSTRUCTIONS[puzzleType]}
          </p>
        }
      </header>
      {puzzleType === 'crossword' && <Crossword card={card}/>}
      {puzzleType === 'wordle' && <Wordle card={card}/>}
    </article>
  );
}