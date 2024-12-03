import { useState, useEffect } from "react";
import styles from '@/app/components/board/Board.module.css';
import Card from '@/app/components/board/card/Card';
import Categories from '@/app/components/board/categories/Categories';
import Mistakes from '@/app/components/board/mistakes/Mistakes';
import Controller from '@/app/components/controls/Controller';
import { DeckData, GameStatus, CardState, CategoryDetail, GameState } from '@/app/lib/definitions';
import Puzzle from "@/app/components/board/puzzle/Puzzle";
import boardUtils from "@/app/utils/boardUtils";

export default function Board(props: { gameIdx: number,
  deckData: DeckData,
  categories: CategoryDetail[],
  setGameStatus: (status: GameStatus) => void,
  playAgain: () => void}) {
  const { gameIdx, deckData, categories, setGameStatus, playAgain} = props;
  const [gameState, setGameState] =
    useState<GameState>(boardUtils.defaultGame(deckData, categories));

  useEffect(() => {
    boardUtils.resetGame(deckData, categories, setGameState, setGameStatus);
  }, [gameIdx]);

  return (
    <>
      <Categories categories={gameState.solvedCtgs}/>
      <article className={styles.board}>
        {gameState.deck.map(card => {
          return <Card card={card}
            key={card.word}
            onSelection={(card: CardState, cardAction: string) => {
              return boardUtils.handleCardSelection(card, cardAction, gameState,
                setGameState, setGameStatus);
            }
            }
            numSelectedCards={gameState.selection.length}/>;
        })}
      </article>
      <section> {gameState.message &&
        <p className={styles.message}>{gameState.message}</p>}
      </section>
      {gameState.solvedCtgs.length !== 4 &&
        <Mistakes remainingMistakes={gameState.mistakesCounter}
          puzzle={false}/>}
      <Controller disableSubmit={gameState.selection.length !== 4}
        disableDeselect={gameState.selection.length === 0}
        gamePlayed={gameState.solvedCtgs.length === 4}
        submitCards={() => {
          boardUtils.checkCards(gameState, setGameState, setGameStatus);
        }}
        handleShuffle={() => {
          boardUtils.handleShuffle(gameState, setGameState);
        }}
        handleDeselectAll={() => {
          boardUtils.handleDeselectAll(gameState, setGameState);
        }}
        playAgain={() => playAgain()}/>
      {gameState.currentPuzzle && <Puzzle card={gameState.currentPuzzle}
        closePuzzle={() => boardUtils.resetPuzzle(gameState, setGameState)}/>}
    </>
  );
}