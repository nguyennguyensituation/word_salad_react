import { useState } from "react";

import styles from '@/app/components/board/Board.module.css';
import Card from '@/app/components/board/card/Card';
// import Categories from '@/app/components/board/Categories';
import Mistakes from '@/app/components/board/Mistakes';
import Controller from '@/app/components/controls/Controller';
import { CardData, DeckData } from '@/app/lib/definitions';

export default function Board(props: {deck: DeckData}) {
  const deck = props.deck;
  const [mistakesCounter, setMistakesCounter] = useState(4);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  function handleCardSelection(card: CardData, cardAction: string) {
    if (cardAction === 'addCard' && !selectedCards.includes(card.word)) {
      setSelectedCards([...selectedCards, card.word]);
    } else if (cardAction === 'removeCard') {
      setSelectedCards(selectedCards.filter(word => word !== card.word));
    }
  }

  function decrementMistakes() {
    setMistakesCounter(mistakesCounter - 1);
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
      <Mistakes remainingMistakes={mistakesCounter} />
      <Controller  disableSubmit={selectedCards.length !== 4}/>
    </>
  );
}