import styles from '@/app/components/board/puzzle/Cells.module.css';

export function CrosswordCells(props: {
  letters: string[],
  puzzleSolved: boolean,
}) {
  return (
    <section className={styles.crossword} id="crossword-row">
      {props.letters.map((ltr, idx) => {
        return <div className={`${styles.cell} ${props.puzzleSolved && styles.solved}`}
          key={idx}>{ltr}</div>;
      })}
    </section>
  );
}