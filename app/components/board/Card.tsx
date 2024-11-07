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
  const [isSelectable, setIsSelectable] = useState(!puzzleType);
  const [puzzleSolved, setPuzzleSolved] = useState(!puzzleType);
  const cardClasses = `${styles.card} 
    ${isSelected ? styles.selected : ''} 
    ${puzzleType === 'wordle' ? styles.wordle : ''} 
    ${puzzleType === 'crossword' ? styles.crossword : ''}`;

  function selectCard() {
    const card = {word, puzzleType, crosswordClue};

    if (isSelectable) {
       if (isSelected) {
        setIsSelected(false);
        handleCardSelection(card, 'removeCard');
       } else if (numSelectedCards < 4) {
        setIsSelected(true);
        handleCardSelection(card, 'addCard');
       }
    } else {
      console.log("Open puzzle from Card!");
    }
  }

  return (
    <article className={cardClasses} onClick={selectCard}>
      {!puzzleType && <p>{word}</p>}
    </article>
  );
}