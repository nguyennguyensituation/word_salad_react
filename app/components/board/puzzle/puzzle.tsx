import styles from '@/app/components/board/puzzle/Puzzle.module.css';
import Crossword from '@/app/components/board/puzzle/Crossword';
import Wordle from '@/app/components/board/puzzle/Wordle';
import { CardState } from '@/app/lib/definitions';
import { PUZZLE_INSTRUCTIONS, PUZZLE_MESSAGES } from '@/app/lib/messages';

function confirmClose(card: CardState, closePuzzle: (card: CardState) => void) {
  const {puzzlePlayed, puzzleType} = card;
  if (!puzzlePlayed && puzzleType && confirm(PUZZLE_MESSAGES[puzzleType])) {
    closePuzzle(card);
  }
}

export default function Puzzle(props: {
  card: CardState,
  closePuzzle: (card: CardState) => void,
}) {
  const {card, closePuzzle} = props;
  const puzzleType = card.puzzleType;
  const puzzleClasses = `${styles.title} ${puzzleType === 'crossword' ? 'blue' : 'green'}`;

  return (
    <article className={styles.puzzle}>
      <header>
        <section>
          <h2 className={puzzleClasses}>{puzzleType}</h2>
          <button className={styles.closeBtn} onClick={() => {
            confirmClose(card, closePuzzle);
          }}>
            &#215;
          </button>
        </section>
        {puzzleType &&
          <p className={styles.instructions}>
            <b>How to play: </b>{PUZZLE_INSTRUCTIONS[puzzleType]}
          </p>
        }
      </header>
      {puzzleType === 'crossword' ? <Crossword card={card}/> : <Wordle card={card}/>}
    </article>
  );
}