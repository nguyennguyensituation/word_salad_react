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
  setMessage: (message: string) => void): void {
  setMessage('');
  setDeck(shuffle(deck));
}

function updateSelection(card: CardState,
  cardAction: string,
  selectedCards: CardState[],
  setSelectedCards: (cards: CardState[]) => void): void {
  const selection = (cardAction === 'removeCard') ?
    selectedCards.filter(selected => selected.word !== card.word) :
    [...selectedCards, card];

  setSelectedCards(selection);
}

function toggleCardSelect(word: string,
  deck: CardState[]): void {
  const idx = deck.findIndex(card => card.word === word);
  deck[idx].isSelected = !deck[idx].isSelected;
}

function handleDeselectAll(selectedCards: CardState[],
  deck: CardState[],
  setSelectedCards: (selection: CardState[]) => void,
  setMessage: (message: string) => void): void {
  setMessage('');
  selectedCards.forEach(card => toggleCardSelect(card.word, deck));
  setSelectedCards([]);
}

export function selectCard(card: CardState,
  numSelectedCards: number,
  onSelection: (card: CardState, cardAction: string) => void): void {
  const {puzzlePlayed, isSelected} = card;
  let cardAction = '';

  if (!puzzlePlayed) {
    cardAction = 'playPuzzle';
  } else if (isSelected) {
    cardAction = 'removeCard';
  } else if (numSelectedCards < 4) {
    cardAction = 'addCard';
  }

  if (cardAction) onSelection(card, cardAction);
}

function getCat(name: string,
  remainingCategories: CategoryDetail[]): CategoryDetail {
  return remainingCategories.filter(cat => cat.name === name)[0];
}

function updateDeck(categoryName: string,
  deck: CardState[],
  setDeck: (deck: CardState[]) => void,
  setSelectedCards: (cards: CardState[]) => void): void {
  const filtered = deck.filter(card => card.category !== categoryName);

  setDeck(filtered);
  setSelectedCards([]);
}

function updateCats(category: CategoryDetail,
  foundCategories: CategoryDetail[],
  remainingCategories: CategoryDetail[],
  setFoundCategories: (categories: CategoryDetail[]) => void,
  setRemainingCategories: (categories: CategoryDetail[]) => void): void {
  const filtered = remainingCategories.filter(cat => {
    return cat.name !== category.name;
  });

  setFoundCategories([...foundCategories, category]);
  setRemainingCategories(filtered);
}

const boardUtils = {
  createDeck,
  handleShuffle,
  updateSelection,
  handleDeselectAll,
  toggleCardSelect,
  getCat,
  updateCats,
  updateDeck,
};

export default boardUtils;