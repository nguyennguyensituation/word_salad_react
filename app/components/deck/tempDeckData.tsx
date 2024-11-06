// TODO: Delete after database is set up
import { DeckData } from "@/app/lib/definitions";

export const tempDeckData: DeckData = {
  id: 1,
  categories: [
    {
      difficulty: 1,
      categoryName: "core",
      categoryWords: [
        { word: 'crux', puzzleType: 'crossword', crosswordClue: "Gist"},
        { word: 'essence'},
        { word: 'heart', puzzleType: 'wordle' },
        { word: 'substance'},
      ]
    },
    {
      difficulty: 2,
      categoryName: "complicated",
      categoryWords: [
        { word: 'baroque', puzzleType: 'crossword', crosswordClue: "Music style popularized by Bach" },
        { word: 'complex'},
        { word: 'elaborate'},
        { word: 'messy', puzzleType: 'wordle'},
      ]
    },
    {
      difficulty: 3,
      categoryName: "symbols used in making lists",
      categoryWords: [
        { word: 'arrow', puzzleType: 'wordle'},
        { word: 'bullet', puzzleType: 'crossword', crosswordClue: "Muggsy Bogues or Manute Bol, once" },
        { word: 'checkbox' },
        { word: 'hyphen' },
      ]
    },
    {
      difficulty: 4,
      categoryName: "what 'cross' might mean",
      categoryWords: [
        { word: 'angry', puzzleType: 'wordle'},
        { word: 'betray'},
        { word: 'crucifix', puzzleType: 'crossword', crosswordClue: "One of those 'T' necklaces, maybe" },
        { word: 'hybrid'},
      ]
    },
  ]
}
