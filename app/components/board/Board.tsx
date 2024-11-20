import { useState } from "react";
import styles from '@/app/components/board/Board.module.css';
import Card from '@/app/components/board/card/Card';
import Categories from '@/app/components/board/Categories';
import Mistakes from '@/app/components/board/mistakes/Mistakes';
import Controller from '@/app/components/controls/Controller';
import { DeckData, CardState, CategoryDetail } from '@/app/lib/definitions';
import Puzzle from "@/app/components/board/puzzle/Puzzle";
import boardUtils from "@/app/helpers/boardUtils";
import { BOARD_MESSAGES } from "@/app/lib/messages";

export default function Board(props: {deckData: DeckData,
  categories: CategoryDetail[],
}) {
  const [deck, setDeck] =
    useState<CardState[]>((boardUtils.createDeck(props.deckData)));
  const [mistakesCounter, setMistakesCounter] = useState(4);
  const [selection, setSelection] = useState<CardState[]>([]);
  const [currentPuzzle, setCurrentPuzzle] = useState<CardState | null>();
  const [message, setMessage] = useState<string>();
  const [cats, setCats] = useState<CategoryDetail[]>(props.categories);
  const [foundCats, setFoundCats] = useState<CategoryDetail[]>([]);
  const [prevGuesses, setPrevGuesses] = useState<CardState[][]>([]);

  function handleCardSelection(card: CardState, cardAction: string) {
    if (message) setMessage('');

    if (cardAction === 'playPuzzle') {
      setCurrentPuzzle(card);
    } else {
      boardUtils.updateSelection(card, cardAction, selection, setSelection);
      boardUtils.toggleCardSelect(card.word, deck);
    }
  }

  function submitCards() {
    const cardCats = [...new Set(selection.map(card => {
      return card.category;
    }))];
    const allCardsMatch = cardCats.length === 1;
    const isOneAway = cardCats.length === 2;

    if (allCardsMatch) {
      const catMatch = boardUtils.getCat(cardCats[0], cats);

      boardUtils.updateCats(catMatch, foundCats, cats, setFoundCats, setCats);
      boardUtils.updateDeck(catMatch.name, deck,setDeck, setSelection);
    } else {
      if (isOneAway) setMessage(BOARD_MESSAGES['oneAway']);

      setMistakesCounter(mistakesCounter - 1);
      setPrevGuesses([...prevGuesses, selection]);
    }
  }

  return (
    <>
      <Categories categories={foundCats}/>
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