import styles from '@/app/components/board/card/Tile.module.css';

export default function Tile(props: {
  word: string,
  puzzleType: string,
  puzzlePlayed: boolean,
  puzzleSolved: boolean,
}) {
  const {word, puzzlePlayed, puzzleSolved, puzzleType} = props;

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