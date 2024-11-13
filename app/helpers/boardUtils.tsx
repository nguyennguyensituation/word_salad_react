import { DeckData, CardState } from '@/app/lib/definitions';
import shuffle from '@/app/helpers/shuffle';

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

export function handleShuffle(deck: CardState[],
  setDeck: (deck: CardState[]) => void) {
  setDeck(shuffle(deck));
}

export function toggleCardSelection(word: string,
  deck: CardState[]) {
  const idx = deck.findIndex(card => card.word === word);
  deck[idx].isSelected = !deck[idx].isSelected;
}

export function handleDeselectAll(selectedCards: string[],
  deck: CardState[],
  setSelectedCards: (selection: string[]) => void) {
  selectedCards.forEach(word => toggleCardSelection(word, deck));
  setSelectedCards([]);
}

export function closePuzzle(
  setCurrentPuzzle: (puzzle: CardState | null) => void) {
  setCurrentPuzzle(null);
}
