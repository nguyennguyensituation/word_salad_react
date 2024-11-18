import { DeckData, CardState } from '@/app/lib/definitions';
import shuffle from '@/app/helpers/shuffle';

function createDeck(deckData: DeckData): CardState[] {
  return deckData.map(card => {
    return {
      word: card.word,
      puzzleType: card.puzzleType,
      crosswordClue: card.crosswordClue,
      category: card.category,
      isSelected: false,
      puzzlePlayed: !card.puzzleType,
      puzzleSolved: !card.puzzleType,
    };
  });
}

function handleShuffle(deck: CardState[],
  setDeck: (deck: CardState[]) => void) {
  setDeck(shuffle(deck));
}

function toggleCardSelection(word: string,
  deck: CardState[]) {
  const idx = deck.findIndex(card => card.word === word);
  deck[idx].isSelected = !deck[idx].isSelected;
}

function handleDeselectAll(selectedCards: CardState[],
  deck: CardState[],
  setSelectedCards: (selection: CardState[]) => void) {
  selectedCards.forEach(word => toggleCardSelection(word, deck));
  setSelectedCards([]);
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

const boardUtils = {
  createDeck,
  handleShuffle,
  handleDeselectAll,
  toggleCardSelection,
};

export default boardUtils;