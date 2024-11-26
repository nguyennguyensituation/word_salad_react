import { useState, useEffect } from "react";
import styles from '@/app/components/board/Board.module.css';
import Card from '@/app/components/board/card/Card';
import Categories from '@/app/components/board/Categories';
import Mistakes from '@/app/components/board/mistakes/Mistakes';
import Controller from '@/app/components/controls/Controller';
import { DeckData, GameStatus, CardState, CategoryDetail, ConnectionsState } from '@/app/lib/definitions';
import Puzzle from "@/app/components/board/puzzle/Puzzle";
import boardUtils from "@/app/helpers/boardUtils";

export default function Board(props: {deckData: DeckData,
  categories: CategoryDetail[],
  setGameStatus: (status: GameStatus) => void,
  playAgain: () => void,
  gameIdx: number}) {
  const [deck, setDeck] =
    useState<CardState[]>((boardUtils.createDeck(props.deckData)));
  const [mistakesCounter, setMistakesCounter] = useState(4);
  const [selection, setSelection] = useState<CardState[]>([]);
  const [currentPuzzle, setCurrentPuzzle] = useState<CardState | null>();
  const [message, setMessage] = useState<string>();
  const [allCtgs, setAllCtgs] = useState<CategoryDetail[]>(props.categories);
  const [solvedCtgs, setSolvedCtgs] = useState<CategoryDetail[]>([]);
  const [prevGuesses, setPrevGuesses] = useState<string[][]>([]);
  const [puzzleCount, setPuzzleCount] = useState<number>(0);
  const connectionsState: ConnectionsState = { selection, prevGuesses, allCtgs,
    solvedCtgs, deck, mistakesCounter, setMessage, setPrevGuesses, setAllCtgs,
    setSolvedCtgs, setDeck, setMistakesCounter, setSelection,
    setGameStatus: props.setGameStatus};
  const checkCards = () => boardUtils.checkCards(connectionsState);

  function handleCardSelection(card: CardState, cardAction: string) {
    if (message) setMessage('');

    if (cardAction === 'playPuzzle') {
      setCurrentPuzzle(card);
      setPuzzleCount(puzzleCount + 1);
      if (puzzleCount === 7) {
        props.setGameStatus('cardsSolved');
      }
    } else {
      boardUtils.updateSelection(card, cardAction, selection, setSelection);
      boardUtils.toggleCardSelect(card.word, deck);
    }
  }

  useEffect(() => {
    resetBoard();
    props.setGameStatus('cardsNotSolved');
  }, [props.gameIdx]);

  function resetBoard() {
    setMistakesCounter(4);
    setSelection([]);
    setCurrentPuzzle(null);
    setAllCtgs(props.categories);
    setSolvedCtgs([]);
    setPrevGuesses([]);
    setPuzzleCount(0);
    setDeck(boardUtils.createDeck(props.deckData));
  }

  return (
    <>
      <Categories categories={solvedCtgs}/>
      <article className={styles.board}>
        {deck.map(card => {
          return <Card
            card={card}
            key={card.word}
            onSelection={handleCardSelection}
            numSelectedCards={selection.length}/>;
        })}
      </article>
      <section>
        {message && <p className={styles.message}>{message}</p>}
      </section>
      {solvedCtgs.length !== 4 &&
        < Mistakes remainingMistakes={mistakesCounter} puzzle={false}/>}
      <Controller
        disableSubmit={selection.length !== 4}
        disableDeselect={selection.length === 0}
        gamePlayed={solvedCtgs.length === 4}
        submitCards={checkCards}
        handleShuffle={() => {
          boardUtils.handleShuffle(deck, setDeck, setMessage);
        }}
        handleDeselectAll={() => boardUtils.handleDeselectAll(selection,
          deck, setSelection, setMessage)}
        playAgain={() => props.playAgain()}/>
      {currentPuzzle && <Puzzle
        card={currentPuzzle}
        closePuzzle={() => setCurrentPuzzle(null)} />}
    </>
  );
}