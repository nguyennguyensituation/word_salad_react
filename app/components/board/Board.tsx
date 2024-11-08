import { useState } from "react";

import styles from '@/app/components/board/Board.module.css';
import Card from '@/app/components/board/card/Card';
// import Categories from '@/app/components/board/Categories';
import Mistakes from '@/app/components/board/Mistakes';
import Controller from '@/app/components/controls/Controller';
import { DeckData } from '@/app/lib/definitions';
import createDeck from '@/app/helpers/createDeck';

export default function Board(props: {deckData: DeckData}) {
  const [deck] = useState(createDeck(props.deckData));
  const [mistakesCounter, setMistakesCounter] = useState(4);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  function handleCardSelection(word: string, cardAction: string) {
    if (cardAction === 'addCard' && !selectedCards.includes(word)) {
      setSelectedCards([...selectedCards, word]);
    } else if (cardAction === 'removeCard') {
      setSelectedCards(selectedCards.filter(card => card !== word));
    }
    toggleCardSelection(word);
  }

  function toggleCardSelection(word: string) {
    const idx = deck.findIndex(card => card.word === word);
    deck[idx].isSelected = !deck[idx].isSelected;
  }

  function decrementMistakes() {
    setMistakesCounter(mistakesCounter - 1);
  }

  return (
    <>
      <article className={styles.board}>
        {deck.map(card => {
          return <Card
            CardState={card}
            key={card.word}
            onSelection={handleCardSelection}
            numSelectedCards={selectedCards.length}/>;
        })}
      </article>
      {/* <Categories /> */}
      <Mistakes remainingMistakes={mistakesCounter} />
      <Controller  disableSubmit={selectedCards.length !== 4}/>
    </>
  );
}