import styles from '@/app/components/board/puzzle/Row.module.css';

export default function Row(props: {
  row: string[],
  idx: number,
}) {
  return (
    <div className={styles.row} key={props.idx}>
      <div className={styles.tile}></div>
      <div className={styles.tile}></div>
      <div className={styles.tile}></div>
      <div className={styles.tile}></div>
      <div className={styles.tile}></div>
    </div>
  );
}
