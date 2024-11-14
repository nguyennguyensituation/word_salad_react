import { useState, useEffect } from 'react';
import styles from '@/app/components/board/puzzle/Crossword.module.css';
import { CrosswordCells } from '@/app/components/board/puzzle/Cells';
import { CardState } from '@/app/lib/definitions';
import Mistakes from '../mistakes/Mistakes';
import xWordUtils from '@/app/helpers/xWordUtils';
import { PUZZLE_MESSAGES } from '@/app/lib/messages';

export default function Crossword(props: { card: CardState }) {
  const card = props.card;
  const word = card.word;
  const [letters, setLetters] = useState<string[]>(new Array(word.length).fill(''));
  const [mistakesCount, setMistakesCount] = useState<number>(4);
  const [message, setMessage] = useState<string>('');
  const [prevGuesses, setPrevGuesses] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (card.puzzlePlayed) return;

      const input = event.key.toLowerCase();
      const move = xWordUtils.getMove(input, letters, word);

      xWordUtils.resetMessage(message, setMessage);

      if (move === 'addLetter' || move === 'deleteLetter') {
        xWordUtils.updateCell(move, input, letters, word, setLetters);
      } else if (move === 'checkGuess') {
        if (xWordUtils.isValidGuess(letters, prevGuesses)) {
          xWordUtils.checkGuess(card, letters, prevGuesses, mistakesCount,
            setMessage, setPrevGuesses, setMistakesCount);
        } else {
          setMessage(PUZZLE_MESSAGES['duplicateGuess']);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [letters]);

  return (
    <>
      <p className={styles.clue}>{card.crosswordClue}</p>
      <CrosswordCells letters={letters} puzzleSolved={card.puzzleSolved}/>
      <Mistakes remainingMistakes={mistakesCount} puzzle={true}/>
      {message && <div className={styles.message}>{message}</div>}
    </>
  );
}