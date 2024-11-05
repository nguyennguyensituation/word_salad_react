"use client";

import { useState } from "react";
import { GameStatus } from '../lib/definitions';
import Message from '@/app/components/Message';
import Board from '@/app/components/Board';
import Mistakes from '@/app/components/Mistakes';
import Controller from '@/app/components/Controller';

export default function Page() {
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