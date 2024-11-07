import { useState } from "react";

import styles from '@/app/components/board/Board.module.css';
import Card from '@/app/components/board/Card';
// import Categories from '@/app/components/board/Categories';
import Mistakes from '@/app/components/board/Mistakes';
import Controller from '@/app/components/controls/Controller';
import { DeckData } from '@/app/lib/definitions';

export default function Board(props: {deck: DeckData}) {
  const deck = props.deck;
  const [mistakesCounter, setMistakesCounter] = useState(4);
  const [selectedCards, setSelectedCArds] = useState([]);

  function decrementMistakes() {
    setMistakesCounter(mistakesCounter - 1);
  }

  return (
    <>
    <article className={styles.board}>
      {deck.map(card => {
        return <Card card={card} key={card.word}/>;
      })}
    </article>
    {/* <Categories /> */}
    <Mistakes remainingMistakes={mistakesCounter}/>
    <Controller />
    </>
  );
}