import { useState, useEffect } from "react";
import styles from '@/app/components/board/Board.module.css';
import Card from '@/app/components/board/card/Card';
import Categories from '@/app/components/board/categories/Categories';
import Mistakes from '@/app/components/board/mistakes/Mistakes';
import Controller from '@/app/components/controls/Controller';
import { DeckData, GameStatus, CardState, CategoryDetail, GameState, PuzzleResult } from '@/app/lib/definitions';
import Puzzle from "@/app/components/board/puzzle/Puzzle";
import boardUtils from "@/app/utils/boardUtils";
import Result from '@/app/components/result/Result';

export default function Board(props: { gameIdx: number,
  deckData: DeckData,
  categories: CategoryDetail[],
  gameStatus: GameStatus,
  setGameStatus: (status: GameStatus) => void,
  playAgain: () => void}) {
  const { defaultGame, defaultResult, resetGame, handleCardSelection,
    checkCards, handleShuffle, handleDeselectAll, resetPuzzle } = boardUtils;
  const { gameIdx, deckData, categories, setGameStatus, playAgain} = props;
  const [gameState, setGameState] =
    useState<GameState>(defaultGame(deckData, categories));
  const [checkCardMode, setCheckCardMode] = useState<boolean>(false);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
  const [puzzleResult, setPuzzleResult] = useState<PuzzleResult>(defaultResult);
  const [hideResult, setHideResult] = useState<boolean>(true);

  useEffect(() => {
    resetGame(deckData, categories, setGameState, setGameStatus);
  }, [gameIdx]);

  return (
    <>
      <Result puzzleResult={puzzleResult} disabled={hideResult}
        setHideResult={setHideResult}/>
      <Categories categories={gameState.solvedCtgs}/>
      <article className={styles.board}>
        {gameState.deck.map(card => {
          return <Card card={card}
            key={card.word}
            onSelection={(card: CardState, cardAction: string) => {
              return handleCardSelection(card, cardAction, gameState,
                checkCardMode, setGameState, setGameStatus, setDisableSubmit);
            }}
            numSelectedCards={gameState.selection.length}/>;
        })}
      </article>
      <section> {gameState.message &&
        <p className={styles.message}>{gameState.message}</p>}
      </section>
      <Mistakes remainingMistakes={gameState.mistakesCounter}
        puzzle={false}/>
      <Controller
        checkCardMode={checkCardMode}
        disableDeselect={gameState.selection.length === 0}
        disableSubmit={props.gameStatus === 'cardsNotSolved' || gameState.selection.length !== 4 || disableSubmit}
        gamePlayed={gameState.solvedCtgs.length === 4}
        submitCards={() => {
          checkCards(gameState, setGameState, setGameStatus,
            setCheckCardMode, setDisableSubmit, setHideResult, puzzleResult,
            setPuzzleResult);
        }}
        handleShuffle={() => {
          handleShuffle(gameState, setGameState);
        }}
        handleDeselectAll={() => {
          handleDeselectAll(gameState, setGameState);
        }}
        playAgain={() => {
          setPuzzleResult({wordle: [], crossword: [], connections: []});
          playAgain();
        }}/>
      {gameState.currentPuzzle && <Puzzle card={gameState.currentPuzzle}
        resetPuzzle={() => resetPuzzle(gameState, setGameState)}
        puzzleResult={puzzleResult}
        setPuzzleResult={setPuzzleResult}
      />}
    </>
  );
}
