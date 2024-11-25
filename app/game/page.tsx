"use client";

import { useState, useEffect } from "react";
import { GameStatus, GameData, DeckData } from '../lib/definitions';
import Message from '@/app/components/message/Message';
import Board from '@/app/components/board/Board';
import connectionsData from "@/app/lib/connectionsData";
import gameUtils from "../helpers/gameUtils";

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  const [gameStatus, setGameStatus] = useState<GameStatus>('cardsNotSolved');
  const [gameIdx, setGameIdx] = useState<number>(0);
  const [prevGamesIdx, setPrevGamesIdx] = useState<number[]>([]);
  const data: GameData = connectionsData[gameIdx];
  const deckData: DeckData = gameUtils.parseGameData(data);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <main>
      <Message status={gameStatus} />
      <Board deckData={deckData}
        categories={gameUtils.getCategories(data)}
        setGameStatus={(status: GameStatus) => setGameStatus(status)}
        setNewGameIdx={() => gameUtils.setNewGameIdx(gameIdx, prevGamesIdx, setGameIdx, setPrevGamesIdx)}/>
    </main>
  );
}
