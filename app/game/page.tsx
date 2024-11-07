"use client";

import { useState } from "react";
import { GameStatus, GameData, DeckData } from '../lib/definitions';
import Message from '@/app/components/messages/Message';
import Board from '@/app/components/board/Board';
import { tempDeckData } from "@/app/components/deck/tempDeckData";

export default function Page() {
  const [gameData, setGameData] = useState<GameData>(tempDeckData);
  const [gameStatus, setGameStatus] = useState<GameStatus>('cardsNotSolved');
  
  const [deck, setDeck] = useState<DeckData>(gameData.categories.map(cat => {
    return cat.categoryWords;
  }).flat());

  function updateStatus(status: GameStatus) {
    setGameStatus(status);
  }

  return (
    <main>
      <Message status={gameStatus} />
      <Board deck={deck}/>
      
    </main>
  );
}