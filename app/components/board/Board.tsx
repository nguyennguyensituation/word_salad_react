import { useState } from "react";
import styles from '@/app/components/board/Board.module.css';
import Card from '@/app/components/board/card/Card';
import Categories from '@/app/components/board/Categories';
import Mistakes from '@/app/components/board/mistakes/Mistakes';
import Controller from '@/app/components/controls/Controller';
import { DeckData, GameStatus, CardState, CategoryDetail } from '@/app/lib/definitions';
import Puzzle from "@/app/components/board/puzzle/Puzzle";
import boardUtils from "@/app/helpers/boardUtils";
import { BOARD_MESSAGES } from "@/app/lib/messages";

export default function Board(props: {deckData: DeckData,
  categories: CategoryDetail[],
  setGameStatus: (status: GameStatus) => void}) {
  const [deck, setDeck] =
    useState<CardState[]>((boardUtils.createDeck(props.deckData)));
  const [mistakesCounter, setMistakesCounter] = useState(4);
  const [selection, setSelection] = useState<CardState[]>([]);
  const [currentPuzzle, setCurrentPuzzle] = useState<CardState | null>();
  const [message, setMessage] = useState<string>();
  const [allCategories, setAllCategories] = useState<CategoryDetail[]>(props.categories);
  const [solvedCategories, setSolvedCategories] = useState<CategoryDetail[]>([]);
  const [prevGuesses, setPrevGuesses] = useState<string[][]>([]);
  const [puzzleCount, setPuzzleCount] = useState<number>(0);

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

  function submitCards() {
    const result = boardUtils.checkSelection(selection, prevGuesses);

    if (result === 'duplicate') {
      setMessage(BOARD_MESSAGES['duplicateGuess']);
    } else if (result === 'solved') {
      const category = boardUtils.getCategory(selection[0].category,
        allCategories);

      boardUtils.updateCategories(category, solvedCategories, allCategories,
        setSolvedCategories, setAllCategories);
      boardUtils.updateDeck(category.name, deck, setDeck, setSelection);

      if (solvedCategories.length === 3) props.setGameStatus('gameWon');
    } else {
      if (result === 'oneAway') setMessage(BOARD_MESSAGES['oneAway']);

      setMistakesCounter(mistakesCounter - 1);
      setPrevGuesses([...prevGuesses, selection.map(card => card.word)]);

      if (mistakesCounter === 1) props.setGameStatus('gameLost');
    }
  }

  return (
    <>
      <Categories categories={solvedCategories}/>
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
      <Mistakes remainingMistakes={mistakesCounter} puzzle={false}/>
      <Controller
        disableSubmit={selection.length !== 4}
        submitCards={submitCards}
        handleShuffle={() => {
          boardUtils.handleShuffle(deck, setDeck, setMessage);
        }}
        handleDeselectAll={() => boardUtils.handleDeselectAll(selection,
          deck, setSelection, setMessage)}/>
      {currentPuzzle && <Puzzle
        card={currentPuzzle}
        closePuzzle={() => setCurrentPuzzle(null)} />}
    </>
  );
}