"use client";

import { useState, useEffect } from "react";
import { GameStatus, GameData, DeckData, CategoryDetail } from '../lib/definitions';
import Message from '@/app/components/message/Message';
import Board from '@/app/components/board/Board';
import { tempDeckData } from "@/app/lib/tempDeckData";
import shuffle from "@/app/helpers/shuffle";

function getCategories(gameData: GameData): CategoryDetail[] {
  return gameData.categories.map(cat => {
    return {
      difficulty: cat.difficulty,
      name: cat.categoryName,
      words: cat.categoryWords.map(card => card.word)
    };
  });
}

function parseDeck() {
  const data = tempDeckData;
  const deck = data.categories.map(category => {
    return category.categoryWords.map(wordArr => {
      wordArr.category = category.categoryName;
      return wordArr;
    });
  }).flat();

  return shuffle(deck);
}

export default function Page() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('cardsNotSolved');
  const [deckData, setDeckData] = useState<DeckData>(parseDeck());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <main>
      <Message status={gameStatus} />
      <Board deckData={deckData}
        categories={getCategories(tempDeckData)}
        setGameStatus={(status: GameStatus) => setGameStatus(status)}/>
    </main>
  );
}
