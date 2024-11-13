import { useState, useEffect } from 'react';
import styles from '@/app/components/board/puzzle/Crossword.module.css';
import { CrosswordCells } from '@/app/components/board/puzzle/Cells';
import { CardState } from '@/app/lib/definitions';
import Mistakes from '../mistakes/Mistakes';
import { getCrosswordMove, updateCrosswordCell, isWinner } from '@/app/helpers/puzzle';
import { PUZZLE_MESSAGES } from '@/app/lib/messages';

export default function Crossword(props: { card: CardState }) {
  const { word, crosswordClue } = props.card;
  const [letters, setLetters] = useState<string[]>(new Array(word.length).fill(''));
  const [mistakesCounter, setMistakesCounter] = useState<number>(4);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      let input = event.key;
      const move = getCrosswordMove(input, letters, word);
      if (move === 'addLetter' || move === 'deleteLetter') { 
        updateCrosswordCell(move, input, letters, word, setLetters);
      } else if (move === 'checkGuess') {
        if (isWinner(word, letters)) {
          setMessage(PUZZLE_MESSAGES['winner']);
        } else {
          setMistakesCounter(mistakesCounter -1);
          if (mistakesCounter === 1) {
            setMessage(`${PUZZLE_MESSAGES['loser']} ${word.toUpperCase()}.`);
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, letters);

  return (
    <>
      <p className={styles.clue}>{crosswordClue}</p>
      <CrosswordCells letters={letters}/>
      <Mistakes remainingMistakes={mistakesCounter} puzzle={true}/>
      {message && <div className={styles.message}>{message}</div>}
    </>
  );
}