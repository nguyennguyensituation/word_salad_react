"use client";

import { useState } from "react";
import { GameStatus, GameData, DeckData } from '../lib/definitions';
import Message from '@/app/components/message/Message';
import Board from '@/app/components/board/Board';
import { tempDeckData } from "@/app/components/deck/tempDeckData";

export default function Page() {
  const [gameData] = useState<GameData>(tempDeckData);
  const [gameStatus] = useState<GameStatus>('cardsNotSolved');
  const [deckData] = useState<DeckData>(gameData.categories.map(cat => {
    return cat.categoryWords.map(word => {
      word.category = cat.categoryName;
      return word;
    });
  }).flat());

  return (
    <main>
      <Message status={gameStatus} />
      <Board deckData={deckData}/>
    </main>
  );
}