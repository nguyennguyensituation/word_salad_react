import styles from '@/app/components/board/puzzle/Puzzle.module.css';
import Crossword from '@/app/components/board/puzzle/Crossword';

export default function Puzzle(props: {
  puzzleType: string,
  word: string;
  crosswordClue: string;
}) {
  const {puzzleType, word, crosswordClue} = props;
  const puzzleClasses = `${styles.title} ${puzzleType === 'crossword' ? 'blue' : 'green'}`;
  const instructions = puzzleType === 'crossword' ? "Try to guess the word in 4 tries." : "TK Wordle";

  return (
    <article className={styles.puzzle}>
      <header>
        <section>
          <h2 className={puzzleClasses}>{puzzleType}</h2>
          <button>&#215;</button>
        </section>
        <p className={styles.instructions}><b>How to play: </b> {instructions}</p>
      </header>
      {puzzleType === 'crossword' && <Crossword word={word} crosswordClue={crosswordClue}/>}
    </article>
  );
}