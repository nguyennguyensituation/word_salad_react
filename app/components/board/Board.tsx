import { useState, useEffect } from "react";
import styles from '@/app/components/board/Board.module.css';
import Card from '@/app/components/board/card/Card';
// import Categories from '@/app/components/board/Categories';
import Mistakes from '@/app/components/board/mistakes/Mistakes';
import Controller from '@/app/components/controls/Controller';
import { DeckData, CardState } from '@/app/lib/definitions';
import createDeck from '@/app/helpers/createDeck';
import shuffle from '@/app/helpers/shuffle';
import Puzzle from "@/app/components/board/puzzle/Puzzle";

export default function Board(props: {deckData: DeckData}) {
  const [deck, setDeck] = useState<CardState[]>((createDeck(props.deckData)));
  const [mistakesCounter] = useState(4);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [currentPuzzle, setCurrentPuzzle] = useState<CardState | null>(null);

  function handleCardSelection(
    card: CardState,
    cardAction: string) {
    if (cardAction === 'playPuzzle') {
      setCurrentPuzzle(card);
    } else {
      if (cardAction === 'addCard' && !selectedCards.includes(card.word)) {
        setSelectedCards([...selectedCards, card.word]);
      } else if (cardAction === 'removeCard') {
        setSelectedCards(selectedCards.filter(word => word !== card.word));
      }
      toggleCardSelection(card.word);
    }
  }

  function toggleCardSelection(word: string) {
    const idx = deck.findIndex(card => card.word === word);
    deck[idx].isSelected = !deck[idx].isSelected;
  }

  //Deck functions
  function handleShuffle() {
    setDeck(shuffle(deck));
  }

  function handleDeselectAll() {
    selectedCards.forEach(word => toggleCardSelection(word));
    setSelectedCards([]);
  }

  function closePuzzle() {
    setCurrentPuzzle(null);
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
        handleShuffle={handleShuffle}
        handleDeselectAll={handleDeselectAll}/>
      { currentPuzzle && <Puzzle card={currentPuzzle}
        closePuzzle={closePuzzle} />}
    </>
  );
}