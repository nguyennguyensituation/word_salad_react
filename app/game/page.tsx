"use client";

import { useState } from "react";
import { GameStatus } from '../lib/definitions';
import Message from '@/app/components/messages/Message';
import Board from '@/app/components/board/Board';
import Mistakes from '@/app/components/board/Mistakes';
import Controller from '@/app/components/controls/Controller';

export default function Page() {
  // deck = array of words (value, puzzleType, puzzleId?, puzzlePlayed, cardSolved)
  // array of related puzzles (id, clue?, guessedWords)

  const [gameStatus, setGameStatus] = useState<GameStatus>('cardsNotSolved');
  const [mistakesCounter, setMistakesCounter] = useState(4);

  function updateStatus(status: GameStatus) {
    setGameStatus(status);
  }

  function decrementMistakes() {
    setMistakesCounter(mistakesCounter - 1);
  }

  return (
    <main>
      <Message status={gameStatus} />
      <Board />
      <Mistakes remainingMistakes={mistakesCounter}/>
      <Controller />
    </main>
  );
}