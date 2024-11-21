import styles from '@/app/components/board/puzzle/Row.module.css';

function Cell(props: {
  key: string,
  ltr: string,
  result?: string}) {
  return <div className={`${styles.cell} ${props.result && styles[props.result]}`}>{props.ltr}</div>;
}

export default function Row(props: {row: string[],
  idx: number,
  results?: string[]}) {

  return (
    <div className={styles.row} key={`row-${props.idx}`}>
      { props.row.map((ltr, rowIdx) => {
        return <Cell
          key={`${props.idx}-${rowIdx}`}
          ltr={ltr}
          result={props.results && props.results[rowIdx]}
        />;
      })
      }
    </div>
  );
}
