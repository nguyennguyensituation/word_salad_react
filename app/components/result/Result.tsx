import styles from '@/app/components/result/Result.module.css';
import { PuzzleResult } from '@/app/lib/definitions';
import { puzzleDisplayText, calculateScore } from '@/app/utils/resultsUtils';

function Counter(props: {result: boolean[], puzzleType: string}) {
  const puzzleType = props.puzzleType;
  let result = props.result;

  if (puzzleType === 'connections') {

    result = result.filter(res => res);
    while (result.length < 4) {
      result.push(false);
    }
  }

  return <li className={styles[puzzleType]}>
    <p>{puzzleDisplayText(puzzleType, result)}</p>
    {result.map((res, idx) => {
      return <div className={`${styles.marker} ${res ? styles.solved : ''}`}
        key={idx}></div>
    })}
  </li>;
}

export default function Result(props: {
  puzzleResult: PuzzleResult,
  disabled: boolean;
  setHideResult: (result: boolean) => void,
}) {
  const { wordle, crossword, connections } = props.puzzleResult;
  const score = calculateScore(props.puzzleResult);

  return <article className={`${styles.result} ${props.disabled ? styles.hide : ''}`}>
    <header>
      <h2 className={styles.title}>Results</h2>
      <button className={styles.closeBtn}
        onClick={() => {
          props.setHideResult(true);
        }}>&#215;</button>
    </header>

    <p className={styles.score}>Your score: {score}</p>
    <hr></hr>

    <ul className={styles.categories}>
      <Counter result={wordle} puzzleType='wordle'/>
      <Counter result={crossword} puzzleType='crossword'/>
      <Counter result={connections} puzzleType='connections'/>
    </ul>
  </article>;
}