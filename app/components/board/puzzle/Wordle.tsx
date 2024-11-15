import { useState, useEffect } from 'react';
import styles from '@/app/components/board/puzzle/Wordle.module.css';
import { CardState } from '@/app/lib/definitions';
import Row from '@/app/components/board/puzzle/Row';
import puzzUtils from '@/app/helpers/puzzleUtils';
import wordleUtils from '@/app/helpers/wordleUtils';
import { PUZZLE_MESSAGES } from '@/app/lib/messages';

export default function Wordle(props: { card: CardState }) {
  const { word, puzzlePlayed } = props.card;
  const [message, setMessage] = useState<string>('');
  const [rows, setRows] = useState<string[][]>(new Array(6).fill(['', '', '', '', '']));
  const [currentRowIdx, setCurrentRowIdx] = useState<number>(0);
  const [prevGuesses, setPrevGuesses] = useState<string[]>([]);
  const [rowResults, setRowResults] = useState<string[][]>(new Array(6).fill([]));

  function updateRow(row: string[]) {
    const rowsCopy = [...rows];
    
    rowsCopy[currentRowIdx] = row;
    setRows(rowsCopy);
  }
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (puzzlePlayed) return;

      const activeRow = rows[currentRowIdx];
      const input = event.key.toLowerCase();
      const move = puzzUtils.getMove(input, activeRow, word);

      puzzUtils.resetMessage(message, setMessage);

      if (move === 'addLetter' || move === 'deleteLetter') {
        puzzUtils.updateCell(move, input, activeRow, word, updateRow);
      } else if (move === 'checkGuess') {
        const isUnique = puzzUtils.isUniqueWord(activeRow, prevGuesses);
        const lastRow = currentRowIdx === 5;

        if (!wordleUtils.isValidWord(activeRow)) {
          setMessage(PUZZLE_MESSAGES['invalidWordle']);
        } else if (!isUnique) {
          setMessage(PUZZLE_MESSAGES['duplicateGuess']);
        } else {
          const isMatch = puzzUtils.isMatch(word, activeRow);
          const results = wordleUtils.getLetterResults(word, activeRow);

          wordleUtils.renderResults(results, rowResults,currentRowIdx, setRowResults);     
          if (isMatch) {
            puzzUtils.showWin(props.card,setMessage);       
          } else {
            puzzUtils.updatePrevGuesses(activeRow, prevGuesses, setPrevGuesses);
            setCurrentRowIdx(currentRowIdx + 1);

            if (lastRow) puzzUtils.showLoss(props.card, setMessage);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rows, prevGuesses]);

  return (
    <>
      <section className={styles.wordleContainer}>
        {rows.map((row, idx) => {
          return <Row row={row} idx={idx} key={`row-${idx}`} results={rowResults[idx]}/>;
        })}
      </section>
      <section>
        {message && <p className={styles.message}>{message}</p>}
      </section>
    </>
  );
}
