import styles from '@/app/components/board/card/Card.module.css';
import { CardState } from '@/app/lib/definitions';
import Tiles from '@/app/components/board/card/Tiles';
import { selectCard } from '@/app/utils/boardUtils';

export default function Card(props: {
  card: CardState,
  numSelectedCards: number,
  onSelection: (card: CardState, cardAction: string) => void;
}) {
  const {card, numSelectedCards, onSelection} = props;
  const {word, puzzleType, isSelected} = card;
  const cardClasses = `${styles.card} 
    ${isSelected ? styles.selected : ''} 
    ${puzzleType === 'wordle' ? styles.wordle : ''} 
    ${puzzleType === 'crossword' ? styles.crossword : ''}`;

  return (
    <article className={cardClasses} onClick={() => {
      selectCard(card, numSelectedCards, onSelection);
    }}>
      {!puzzleType && <p>{word}</p>}
      {puzzleType && <Tiles tileData={card} />}
    </article>
  );
}
