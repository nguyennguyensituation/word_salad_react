import styles from '@/app/components/board/puzzle/puzzle.module.css';

export default function Puzzle(props: {
  word: string;
  hide: boolean;
}) {
  return (
    <article className={styles.puzzle}>
      <header>
        <section>
          <h2 className={`${styles.title} blue`}>Crossword</h2>
          <button>&#215;</button>
        </section>
        <p className={styles.instructions}><b>How to play:</b> Try to guess the word in 4 tries.</p>
      </header>
      <p className={styles.clue}>TK Crossword clue</p>
      <section>
       {/* TK tiles */}
      </section>
      <fieldset>
        <section>
          <p>Mistakes remaining:</p>
          {/* TK mistake dots */}
        </section>
        
        <button>Submit</button>
      </fieldset>

      <div className={styles.message}>TK puzzle message</div>
    </article>
  );
}