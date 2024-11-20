"use client";

import { useState } from "react";
import { GameStatus, GameData, DeckData, CategoryDetail } from '../lib/definitions';
import Message from '@/app/components/message/Message';
import Board from '@/app/components/board/Board';
import { tempDeckData } from "@/app/components/deck/tempDeckData";

function getCategories(gameData: GameData): CategoryDetail[] {
  return gameData.categories.map(cat => {
    return {
      difficulty: cat.difficulty,
      name: cat.categoryName,
      words: cat.categoryWords.map(card => card.word)
    };
  });
}

export default function Page() {
  const [gameData] = useState<GameData>(tempDeckData);
  const [gameStatus, setGameStatus] = useState<GameStatus>('cardsNotSolved');
  const [deckData] = useState<DeckData>(gameData.categories.map(category => {
    return category.categoryWords.map(wordArr => {
      wordArr.category = category.categoryName;
      return wordArr;
    });
  }).flat());

  return (
    <main>
      <Message status={gameStatus} />
      <Board deckData={deckData}
        categories={getCategories(gameData)}
        setGameStatus={(status: GameStatus) => setGameStatus(status)}/>
    </main>
  );
}