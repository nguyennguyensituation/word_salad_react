import shuffle from "@/app/helpers/shuffle";
import { GameData, DeckData, CategoryDetail } from '../lib/definitions';


function playAgain(gameIdx: number,
  setGameIdx: (idx: number) => void): void {
  setGameIdx(gameIdx + 1);
}

function getCategories(gameData: GameData): CategoryDetail[] {
  return gameData.categories.map(cat => {
    return {
      difficulty: cat.difficulty,
      name: cat.categoryName,
      words: cat.categoryWords.map(card => card.word)
    };
  });
}

function parseGameData(data: GameData): DeckData {
  const deck = data.categories.map(category => {
    return category.categoryWords.map(wordArr => {
      wordArr.category = category.categoryName;
      return wordArr;
    });
  }).flat();

  return shuffle(deck);
}

const gameUtils = {
  playAgain,
  getCategories,
  parseGameData,
};

export default gameUtils;