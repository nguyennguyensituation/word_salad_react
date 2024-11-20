export const PUZZLE_INSTRUCTIONS = {
  crossword: "Try to guess the word in 4 tries.",
  wordle: "Try to guess the word in 6 tries.\nThe tile color will change to show how close you are to the word. Green means the letter is in the correct spot. Yellow means the word contains the letter but is in the wrong spot. Gray means the word doesn't contain that letter."
};

export const GAME_STATUSES = {
  cardsNotSolved: 'First, solve the puzzles on the blank cards to reveal the missing words...',
  cardsSolved: 'All the cards have been solved! Now, create four groups of four!',
  gameWon: 'You found all the categories! Great job!',
  gameLost: 'Better luck next time!',
};

export const BOARD_MESSAGES = {
  duplicateGuess: "Already guessed!",
  oneAway: "One away!",
};

export const PUZZLE_MESSAGES = {
  wordle: "You haven't finished solving this Wordle yet. Are you sure you want to quit this puzzle?",
  crossword: "You haven't finished solving this Crossword yet. Are you sure you want to quit this puzzle?",

  noMatch: "The correct word is ",
  duplicateGuess: "You already guessed that word!",
  invalidWordle: "That word is not in the Wordle dictionary.",
  crosswordMatch: "You solved this crossword!",
  wordleMatch: "You solved this Wordle!",
};
