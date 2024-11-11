import styles from '@/app/components/board/puzzle/Cells.module.css';

export function CrosswordCells(props: {
  letters: string[];
}) {
  return (
    <section className={styles.crossword}>
      {props.letters.map((ltr, idx) => {
        return <div className={styles.cell} key={idx}>{ltr}</div>;
      })}
    </section>
  );
}