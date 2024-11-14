import styles from '@/app/components/board/puzzle/Row.module.css';

function Cell(props: {key: string, ltr: string}) {
  return <div className={styles.cell}>{props.ltr}</div>;
}

export default function Row(props: {row: string[], idx: number}) {
  return (
    <div className={styles.row} key={`row-${props.idx}`}>
      {props.row.map((ltr, rowIdx) => {
        return <Cell key={`${props.idx}-${rowIdx}`} ltr={ltr}/>;
      })}
    </div>
  );
}
