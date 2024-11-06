"use client";

import { useState } from "react";

import styles from '@/app/components/board/Card.module.css';
import {CardData} from '@/app/lib/definitions';

export default function Card(props: {card: CardData}) {
  const {id, categoryName, word, puzzleId, puzzleType} = props.card;
  const [isSelected, setIsSelected] = useState(false);
  const [puzzlePlayed, setPuzzlePlayed] = useState(!puzzleType);
  const [puzzleSolved, setPuzzleSolved] = useState(!puzzleType);

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    toggleSelection();
  }

  function toggleSelection() {
    setIsSelected(!isSelected);
  }

  const cardStyle = [styles.card];

  if (isSelected) {
    cardStyle.push(styles.selected);
  }

  if (puzzleType) {
    cardStyle.push(puzzleType === 'wordle' ? styles.wordle : styles.crossword);
  }

  return (
    <article className={cardStyle.join(' ')} onClick={handleClick}>
      <p>{word}</p>
    </article>
  );
}