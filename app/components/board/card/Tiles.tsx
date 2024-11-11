import styles from '@/app/components/board/card/Tiles.module.css';
import { TileData } from '@/app/lib/definitions';

export default function Tiles(props: { tileData: TileData}) {
  const {word, puzzlePlayed, puzzleSolved, puzzleType} = props.tileData;

  return (
    <>
      {word.split('').map((char, idx) => {
        char = puzzlePlayed ? char : '';
        return <div key={idx} className={
          `${styles.tile}
           ${puzzleSolved ? '' : styles.reveal}
           ${puzzleType === 'wordle' ? styles.wordle : styles.crossword}`}>{char}
        </div>;
      })}
    </>
  );
}