import { useRef } from 'react';
import styles from '@/app/components/board/puzzle/Puzzle.module.css';
import Crossword from '@/app/components/board/puzzle/Crossword';
import Wordle from '@/app/components/board/puzzle/Wordle';
import { CardState, PuzzleResult } from '@/app/lib/definitions';
import { PUZZLE_INSTRUCTIONS } from '@/app/lib/messages';
import { confirmClose } from '@/app/utils/puzzleUtils';

export default function Puzzle(props: { card: CardState,
  resetPuzzle: () => void
  puzzleResult: PuzzleResult,
  setPuzzleResult: (result: PuzzleResult) => void}) {
  const puzzleType = props.card.puzzleType;
  const buttonRef = useRef<HTMLElement>(null);

  return (
    <article className={styles.puzzle}>
      <header>
        <section>
          <h2 className={`${styles.title} ${puzzleType === 'crossword' ? 'blue' : 'green'}`}>
            {puzzleType}</h2>
          <button className={styles.closeBtn} ref={buttonRef} onClick={() => {
            confirmClose(buttonRef, props.card, props.resetPuzzle, props.puzzleResult,
              props.setPuzzleResult);
          }}>&#215;</button>
        </section>

        {puzzleType && <p className={styles.instructions}>
          <b>How to play: </b>{PUZZLE_INSTRUCTIONS[puzzleType]}</p>}
      </header>
      {puzzleType === 'crossword' ?
        <Crossword card={props.card}
          puzzleResult={props.puzzleResult}
          setPuzzleResult={props.setPuzzleResult}/> :
        <Wordle card={props.card}
          puzzleResult={props.puzzleResult}
          setPuzzleResult={props.setPuzzleResult}/>}
    </article>
  );
}