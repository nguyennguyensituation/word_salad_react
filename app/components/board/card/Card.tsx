"use client";

import { useState } from "react";
import styles from '@/app/components/board/card/Card.module.css';
import {CardData} from '@/app/lib/definitions';
import Tile from '@/app/components/board/card/Tile';

export default function Card(props: {
  card: CardData,
  onSelection: Function,
  numSelectedCards: number,
}) {
  const {word, puzzleType, crosswordClue} = props.card;
  const handleCardSelection = props.onSelection;
  const numSelectedCards = props.numSelectedCards;
  const [isSelected, setIsSelected] = useState(false);
  const [puzzlePlayed, setPuzzlePlayed] = useState(!puzzleType);
  const [puzzleSolved, setPuzzleSolved] = useState(!puzzleType);
  const cardClasses = `${styles.card} 
    ${isSelected ? styles.selected : ''} 
    ${puzzleType === 'wordle' ? styles.wordle : ''} 
    ${puzzleType === 'crossword' ? styles.crossword : ''}`;

  function selectCard() {
    if (puzzleSolved && (numSelectedCards < 4 || isSelected)) {
      const cardAction = isSelected ? 'removeCard' : 'addCard';
      setIsSelected(!isSelected);
      handleCardSelection({word, puzzleType, crosswordClue}, cardAction);
    } else if (!puzzleSolved) {
      console.log("Open puzzle");
    }
  }

  return (
    <article className={cardClasses} onClick={selectCard}>
      {!puzzleType && <p>{word}</p>}
      {puzzleType && <Tile word={word}
        puzzlePlayed={puzzlePlayed}
        puzzleSolved={puzzleSolved} />}
    </article>
  );
}
