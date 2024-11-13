import { DeckData, CardState } from '@/app/lib/definitions';

export function createDeck(deckData: DeckData): CardState[] {
  return deckData.map(card => {
    return {
      word: card.word,
      puzzleType: card.puzzleType,
      crosswordClue: card.crosswordClue,
      isSelected: false,
      puzzlePlayed: !card.puzzleType,
      puzzleSolved: !card.puzzleType,
    };
  });
}

export function selectCard(card: CardState,
  numSelectedCards: number,
  onSelection: (card: CardState, cardAction: string) => void) {
  const {puzzlePlayed, isSelected} = card;
  let cardAction = '';

  if (!puzzlePlayed) {
    cardAction = 'playPuzzle';
  } else if (isSelected) {
    cardAction = 'removeCard';
  } else if (numSelectedCards < 4) {
    cardAction = 'addCard';
  }

  if (cardAction) {
    onSelection(card, cardAction);
  }
}