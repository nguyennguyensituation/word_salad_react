"use client";

import { useState } from "react";
import { GameStatus } from '../lib/definitions';
import Message from '@/app/components/messages/Message';
import Board from '@/app/components/board/Board';
// import Categories from '@/app/components/board/Categories';
import Mistakes from '@/app/components/board/Mistakes';
import Controller from '@/app/components/controls/Controller';
import { DeckData } from '@/app/lib/definitions';
// TODO: Set up database
import { tempDeckData } from "@/app/components/deck/tempDeckData";

export default function Page() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('cardsNotSolved');
  const [mistakesCounter, setMistakesCounter] = useState(4);
  const [deck, setDeck] = useState<DeckData>(tempDeckData);

  function updateStatus(status: GameStatus) {
    setGameStatus(status);
  }

  function decrementMistakes() {
    setMistakesCounter(mistakesCounter - 1);
  }
  
  return (
    <main>
      <Message status={gameStatus} />
      <Board deck={deck}/>
      {/* <Categories /> */}
      <Mistakes remainingMistakes={mistakesCounter}/>
      <Controller />
    </main>
  );
}