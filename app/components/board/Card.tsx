"use client";

import { useState } from "react";
import styles from '@/app/components/board/Card.module.css';
import {CardData} from '@/app/lib/definitions';

export default function Card(props: {
  card: CardData,
}) {
  const {word, puzzleType, crosswordClue} = props.card;
  const [isSelected, setIsSelected] = useState(false);
  const [puzzlePlayed, setPuzzlePlayed] = useState(!puzzleType);
  const [puzzleSolved, setPuzzleSolved] = useState(!puzzleType);
  const cardClasses = `${styles.card} 
    ${isSelected ? styles.selected : ''} 
    ${puzzleType === 'wordle' ? styles.wordle : ''} 
    ${puzzleType === 'crossword' ? styles.crossword : ''}`;

  function handleClick() {
    if (puzzleType && puzzlePlayed === false) {
      alert('open puzzle');
    } else {
      toggleSelection();
    }
  }

  function toggleSelection() {
    setIsSelected(!isSelected);
  }

  return (
    <article className={cardClasses} onClick={handleClick}>
      {!puzzleType && <p>{word}</p>}

    </article>
  );
}