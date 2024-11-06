"use client";

import { useState } from "react";
import styles from '@/app/components/board/Card.module.css';
import {CardData} from '@/app/lib/definitions';

export default function Card(props: {card: CardData}) {
  const {word, puzzleType, crosswordClue} = props.card;
  const [isSelected, setIsSelected] = useState(false);
  const [puzzlePlayed, setPuzzlePlayed] = useState(!puzzleType);
  const [puzzleSolved, setPuzzleSolved] = useState(!puzzleType);
  const cardStyle = [styles.card];

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    toggleSelection();
  }

  function toggleSelection() {
    setIsSelected(!isSelected);
  }

  function setStyles() {
    if (isSelected) {
      cardStyle.push(styles.selected);
    }

    if (puzzleType) {
      cardStyle.push(puzzleType === 'wordle' ? styles.wordle : styles.crossword);
    }
  }

  setStyles();

  return (
    <article className={cardStyle.join(' ')} onClick={handleClick}>
      {!puzzleType && <p>{word}</p>}

    </article>
  );
}