import { useState } from "react";
import styles from '@/app/components/board/Board.module.css';
import Card from '@/app/components/board/card/Card';
// import Categories from '@/app/components/board/Categories';
import Mistakes from '@/app/components/board/mistakes/Mistakes';
import Controller from '@/app/components/controls/Controller';
import { DeckData, CardState } from '@/app/lib/definitions';
import Puzzle from "@/app/components/board/puzzle/Puzzle";
import { createDeck, handleShuffle, handleDeselectAll, closePuzzle, toggleCardSelection } from "@/app/helpers/boardUtils";

export default function Board(props: {deckData: DeckData}) {
  const [deck, setDeck] = useState<CardState[]>((createDeck(props.deckData)));
  const [mistakesCounter] = useState(4);
  const [selectedCards, setSelectedCards] = useState<CardState[]>([]);
  const [currentPuzzle, setCurrentPuzzle] = useState<CardState>();

  function handleCardSelection(
    card: CardState,
    cardAction: string) {
    if (cardAction === 'playPuzzle') {
      setCurrentPuzzle(card);
    } else {
      if (cardAction === 'removeCard') {
        setSelectedCards(selectedCards.filter(selected => selected.word !== card.word));
      } else if (cardAction === 'addCard') {
        setSelectedCards([...selectedCards, card]);
      } 
      toggleCardSelection(card.word, deck);
    }
  }

  return (
    <>
      <article className={styles.board}>
        {deck.map(card => {
          return <Card
            card={card}
            key={card.word}
            onSelection={handleCardSelection}
            numSelectedCards={selectedCards.length}/>;
        })}
      </article>
      {/* <Categories /> */}
      <Mistakes remainingMistakes={mistakesCounter} puzzle={false}/>
      <Controller disableSubmit={selectedCards.length !== 4}
        handleShuffle={() => handleShuffle(deck, setDeck)}
        handleDeselectAll={() => handleDeselectAll(selectedCards,
          deck,
          setSelectedCards)}/>
      { currentPuzzle && <Puzzle card={currentPuzzle}
        closePuzzle={() => closePuzzle(setCurrentPuzzle)} />}
    </>
  );
}