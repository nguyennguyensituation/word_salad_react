import styles from '@/app/components/board/puzzle/Puzzle.module.css';
import Crossword from '@/app/components/board/puzzle/Crossword';
import Wordle from '@/app/components/board/puzzle/Wordle';
import { CardState } from '@/app/lib/definitions';
import { PUZZLE_INSTRUCTIONS } from '@/app/lib/messages';
import { confirmClose } from '@/app/utils/puzzleUtils';

export default function Puzzle(props: { card: CardState,
  closePuzzle: () => void }) {
  const puzzleType = props.card.puzzleType;

  return (
    <article className={styles.puzzle}>
      <header>
        <section>
          <h2 className={`${styles.title} ${puzzleType === 'crossword' ? 'blue' : 'green'}`}>
            {puzzleType}</h2>
          <button className={styles.closeBtn} onClick={() => {
            confirmClose(props.card, props.closePuzzle);
          }}>&#215;</button>
        </section>

        {puzzleType && <p className={styles.instructions}>
          <b>How to play: </b>{PUZZLE_INSTRUCTIONS[puzzleType]}</p>}
      </header>
      {puzzleType === 'crossword' ? <Crossword card={props.card}/> : <Wordle card={props.card}/>}
    </article>
  );
}