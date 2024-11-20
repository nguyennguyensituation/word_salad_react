import { DeckData, CardState, CategoryDetail } from '@/app/lib/definitions';
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
  setDeck: (deck: CardState[]) => void,
  setMessage: (message: string) => void) {
  setMessage('');
  setDeck(shuffle(deck));
}

function toggleCardSelection(word: string,
  deck: CardState[]) {
  const idx = deck.findIndex(card => card.word === word);
  deck[idx].isSelected = !deck[idx].isSelected;
}

function handleDeselectAll(selectedCards: CardState[],
  deck: CardState[],
  setSelectedCards: (selection: CardState[]) => void,
  setMessage: (message: string) => void) {
  setMessage('');
  selectedCards.forEach(card => toggleCardSelection(card.word, deck));
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

function getCategory(name: string,
  remainingCategories: CategoryDetail[]): CategoryDetail {
  return remainingCategories.filter(cat => cat.name === name)[0];
}

function addCategory(category: CategoryDetail,
  foundCategories: CategoryDetail[],
  setFoundCategories: (categories: CategoryDetail[]) => void): void {
  setFoundCategories([...foundCategories, category]);
}

function removeCategory(currentCategory: CategoryDetail,
  remainingCategories: CategoryDetail[],
  setRemainingCategories: (categories: CategoryDetail[]) => void) {
  const filtered = remainingCategories.filter(cat => cat.name !== currentCategory.name);
  setRemainingCategories(filtered);
}

function removeCards(categoryName: string, deck: CardState[], setDeck: (deck: CardState[]) => void,
setSelectedCards: (cards: CardState[]) => void) {
  const filtered = deck.filter(card => card.category !== categoryName);

  setDeck(filtered);
  setSelectedCards([]);
}

const boardUtils = {
  createDeck,
  handleShuffle,
  handleDeselectAll,
  toggleCardSelection,
  getCategory,
  addCategory,
  removeCategory,
  removeCards,
};

export default boardUtils;