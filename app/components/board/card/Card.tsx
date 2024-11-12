import styles from '@/app/components/board/card/Card.module.css';
import { CardState } from '@/app/lib/definitions';
import Tiles from '@/app/components/board/card/Tiles';

export default function Card(props: {
  card: CardState,
  onSelection: (card: CardState, cardAction: string) => void;
  numSelectedCards: number,
}) {
  const {word, puzzleType, isSelected, puzzlePlayed} = props.card;
  const cardClasses = `${styles.card} 
    ${isSelected ? styles.selected : ''} 
    ${puzzleType === 'wordle' ? styles.wordle : ''} 
    ${puzzleType === 'crossword' ? styles.crossword : ''}`;

  function selectCard() {
    let cardAction = '';

    if (!puzzlePlayed) {
      cardAction = 'playPuzzle';
    } else if (isSelected) {
      cardAction = 'removeCard';
    } else if (props.numSelectedCards < 4) {
      cardAction = 'addCard';
    }

    if (cardAction) {
      props.onSelection(props.card, cardAction);
    }
  }

  return (
    <article className={cardClasses} onClick={selectCard}>
      {!puzzleType && <p>{word}</p>}
      {puzzleType && <Tiles tileData={props.card} />}
    </article>
  );
}
