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
  const [deck, setDeck] = useState<CardState[]>((boardUtils.createDeck(props.deckData)));
  const [mistakesCounter, setMistakesCounter] = useState(4);
  const [selectedCards, setSelectedCards] = useState<CardState[]>([]);
  const [currentPuzzle, setCurrentPuzzle] = useState<CardState | null>();
  const [message, setMessage] = useState<string>();
  const [remainingCategories, setRemainingCategories] = useState<CategoryDetail[]>(props.categories);
  const [foundCategories, setFoundCategories] = useState<CategoryDetail[]>([]);
  const [previousGuesses, setPreviousGuesses] = useState<CardState[][]>([]);

  function handleCardSelection(card: CardState, cardAction: string) {
    if (message) {
      setMessage('');
    }
    if (cardAction === 'playPuzzle') {
      setCurrentPuzzle(card);
    } else {
      if (cardAction === 'removeCard') {
        setSelectedCards(selectedCards.filter(selected => {
          return selected.word !== card.word;
        }));
      } else if (cardAction === 'addCard') {
        setSelectedCards([...selectedCards, card]);
      }
      boardUtils.toggleCardSelection(card.word, deck);
    }
  }

  function submitCards() {
    const cardCategories = [...new Set(selectedCards.map(card => card.category))];
    
    if (cardCategories.length === 1) {
      const categoryMatch = boardUtils.getCategory(cardCategories[0], remainingCategories);

      boardUtils.addCategory(categoryMatch, foundCategories, setFoundCategories);
      boardUtils.removeCategory(categoryMatch, remainingCategories, setRemainingCategories);
      boardUtils.removeCards(categoryMatch.name, deck, setDeck, setSelectedCards);
    } else {
      if (cardCategories.length === 2) setMessage(BOARD_MESSAGES['oneAway']);
      setMistakesCounter(mistakesCounter - 1);
      setPreviousGuesses([...previousGuesses, selectedCards]);
    }
  }

  return (
    <>
      <Categories categories={foundCategories}/>
      <article className={styles.board}>
        {deck.map(card => {
          return <Card
            card={card}
            key={card.word}
            onSelection={handleCardSelection}
            numSelectedCards={selectedCards.length}/>;
        })}
      </article>
     
      <section>
        {message && <p className={styles.message}>{message}</p>}
      </section>
      <Mistakes remainingMistakes={mistakesCounter} puzzle={false}/>
      <Controller
        disableSubmit={selectedCards.length !== 4}
        submitCards={submitCards}
        handleShuffle={() => {
          boardUtils.handleShuffle(deck, setDeck, setMessage);
        }}
        handleDeselectAll={() => boardUtils.handleDeselectAll(selectedCards,
          deck,
          setSelectedCards, setMessage)}/>
      {currentPuzzle && <Puzzle
        card={currentPuzzle}
        closePuzzle={() => setCurrentPuzzle(null)} />}
    </>
  );
}