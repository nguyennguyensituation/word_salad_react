import styles from '@/app/components/board/card/Card.module.css';
import { CardState, TileData } from '@/app/lib/definitions';
import Tiles from '@/app/components/board/card/Tiles';

export default function Card(props: {
  CardState: CardState,
  onSelection: (word: string, cardAction: string) => void;
  numSelectedCards: number,
}) {
  const {word,
    puzzleType,
    crosswordClue,
    isSelected,
    puzzlePlayed,
    puzzleSolved} = props.CardState;
  const handleCardSelection = props.onSelection;
  const numSelectedCards = props.numSelectedCards;
  const tileData: TileData = { word, puzzleType, puzzlePlayed, puzzleSolved };
  const cardClasses = `${styles.card} 
    ${isSelected ? styles.selected : ''} 
    ${puzzleType === 'wordle' ? styles.wordle : ''} 
    ${puzzleType === 'crossword' ? styles.crossword : ''}`;

  function selectCard() {
    if (puzzleSolved && (numSelectedCards < 4 || isSelected)) {
      const cardAction = isSelected ? 'removeCard' : 'addCard';
      handleCardSelection(word, cardAction);
    } else if (!puzzleSolved) {
      handleCardSelection(word, 'playPuzzle');
    }
  }

  return (
    <article className={cardClasses} onClick={selectCard}>
      {!puzzleType && <p>{word}</p>}
      {puzzleType && <Tiles tileData={tileData} />}
    </article>
  );
}
