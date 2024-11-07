"use client";

import { useState } from "react";
import styles from '@/app/components/board/Card.module.css';
import {CardData} from '@/app/lib/definitions';

export default function Card(props: {
  card: CardData,
  onSelection: Function,
  numSelectedCards: number,
}) {
  const {word, puzzleType, crosswordClue} = props.card;
  const handleCardSelection = props.onSelection;
  const numSelectedCards = props.numSelectedCards;
  const [isSelected, setIsSelected] = useState(false);
  const [puzzleSolved, setPuzzleSolved] = useState(!puzzleType);
  const cardClasses = `${styles.card} 
    ${isSelected ? styles.selected : ''} 
    ${puzzleType === 'wordle' ? styles.wordle : ''} 
    ${puzzleType === 'crossword' ? styles.crossword : ''}`;

  function selectCard() {
    const card = {word, puzzleType, crosswordClue};

    if (puzzleSolved && (numSelectedCards < 4 || isSelected)) {
      const cardAction = isSelected ? 'removeCard' : 'addCard';
      setIsSelected(!isSelected);
      handleCardSelection(card, cardAction);
    } else if (!puzzleSolved) {
      console.log("Open puzzle");
    }
  }

  return (
    <article className={cardClasses} onClick={selectCard}>
      {!puzzleType && <p>{word}</p>}
    </article>
  );
}