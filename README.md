![Logo](public/images/logo.png)

# Word Salad

**Word Salad** is a game for fans of _The New York Times_ Crossword, Connections, who have been clamoring to play all three games...simultaneously.

Built with reusable React components, it features a responsive interface that easily transitions between puzzle modes within the same session, and real-time feedback and scoring. The application is fully responsive and designed to be intuitive and easy to play.

Early, completely unsubstantiated data shows that **Word Salad** is 300% more fun than the originals.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to play.

## Built with

* React
* Next.js
* TypeScript
* HTML
* CSS
* React Hooks (useState, useEffect)

## How to Play

To win Word Salad, first solve all the puzzles on the cards to reveal the words. Then, find the connections between the words and group them into 4 sets of 4 words.

**1. The board contains 16 cards. Some of the cards already have words. Some of the cards contain a puzzle that you'll need to solve to reveal the word.**

![Game board](public/images/starting_board.png)

**2. Click on a blank card to open a puzzle. The puzzle will be either a Wordle or a crossword. Solve the puzzle to reveal the word.**

![Puzzles](public/images/puzzles.png)

**3. After all the words have been revealed, you can play Connections. Select a set of four cards that have something in common.**

![Game board all puzzles solved](public/images/board_solved.png)

**4. If you select the correct group of cards, the category will be revealed.**

![Game board with cards selected](public/images/select_cards.png)

![Single category solved](public/images/single_category_solved.png)


**5. Continue selecting groups of four cards until you've found all the categories.**

![All categories solved](public/images/all_categories_solved.png)

## Features

### Overall
* Seamlessly transition between different puzzle modes: Connections, Wordle, and the Crossword

### Wordle
* Real-time feedback to user input
  * When you submit a word, tile colors change to show how close you are to guessing the correct word. The game takes into account letter position and checks for duplicate letters.
  * You can only input valid letter characters
  * Animations
* State management - The game keeps track of previous guesses.
* Binary search to confirm that the submitted word is in the 14,800+ word Wordle dictionary.

![Solved Wordle puzzle](public/images/wordle_solved.png)

---

### Crossword
* Real-time feedback to user input
  * You can only input valid letter characters
  * Animations
  * Submit button is enabled/disabled according to user actions.
* State management - The game keeps track of previous words guessed and the number of guesses made.

![Solved Wordle puzzle](public/images/xword_solved.png)

---

### Connections
**Solving puzzles**
* Real-time feedback to user input
  * After you successfully solve a puzzle, the word will appear on the card in black text.
  * If you are unable to solve the puzzle or you quit the puzzle early, the word will appear on the card in red text.
  * Deselect and Submit buttons are enabled/disabled according to user actions.
  * You cannot select more than four cards at a time.
  * The game will tell you when you are one card away from completing a category.
  * Animations
* State management - The game keeps track of the sets of cards you have selected previously and the number of guesses made.
* Shuffle cards or deselect all previously selected cards.

![Cards revealed](public/images/cards_revealed.png)

![Game board with cards selected](public/images/select_cards.png)

---
## Potential Roadmap

- [ ] Game summary that shows number of Wordles, Crosswords, and Connections solved
- [ ] Wordle features
  - [ ] Hard mode - All successive guesses must contain previously guessed letters that were matches
- [ ] Crossword features
  - [ ] After each guess, show the letters that are correct
  - [ ] Give the option for Crossword hints
- [ ] After the connections game has been played, the board flips over and turns into different puzzles:
  - [ ] Sudoku
  - [ ] Spelling Bee
  - [ ] Strands
- [ ] Option to create custom games

## Answer Key

```
CORE: [HEART (wordle), CRUX (crossword clue: "Gist"), ESSENCE, SUBSTANCE]

COMPLICATED: [MESSY (wordle), BAROQUE (crossword clue: "Music style popularized by Bach"), COMPLEX, ELABORATE]

SYMBOLS USED IN MAKING LISTS: [ARROW (wordle), BULLET (crossword clue: "Muggsy Bogues or Manute Bol, once), CHECKBOX, HYPHEN]

WHAT 'CROSS' MIGHT MEAN: [ANGRY (wordle), CRUCIFIX (crossword clue: "One of those 'T' necklaces, maybe"), BETRAY, HYBRID]
```
```
LATIN WORDS: [CARPE (wordle), QUID (crossword clue: "A pound across the pond, perhaps"), ERGO, VOX]

PACK (AWAY) FOR FUTURE USE: [STORE (wordle), SQUIRREL (crossword clue: "________ Nut Zippers"), STASH, STOW]

________ GAME: [SQUID (wordle), ARCADE (crossword clue: "where you might find Ms. Pac-Man"), BLAME, NUMBERS]

ADJECTIVES FOR ASSETS: [TOXIC (wordle), FROZEN (crossword clue: "Ice cold"), FIXED, LIQUID]
```
```
HIGHLY SKILLED: [ADEPT (wordle), ACE (crossword clue: "Part of a winning pair in blackjack"), MAESTRO, HOTSHOT]

KINDS OF CAKE: [POUND (wordle), CRUMB (crossword clue: "The soft part of bread"), MARBLE, BIRTHDAY]

TANGIBLE: [SOLID (wordle), MATERIAL (crossword clue: "Half of a moniker for Madonna"), CONCRETE, REAL]

THINGS YOU CAN THROW IN METAPHORS: [PARTY (wordle), WRENCH (crossword clue: "To pull or twist"), CURVEBALL, TANTRUM]
```

```
GET EXCITED, WITH "UP": [PSYCH (wordle), FIRE (crossword clue: "Earth Wind and ____"), HYPE, AMP]

KINDS OF SHOES: [SLIDE (wordle), FLAT (crossword clue: "A tire might get this"), PUMP, MULE]

LEGISLATIVE ROLES: [CHAIR (wordle), WHIP (crossword clue: "Part of a lion tamer's costume"), SPEAKER, LEADER]

NAME HOMOPHONES: [MATTE (wordle), PEAT (crossword clue: "Basketball suffix with 'three'"), MIC, DUG]
```

```
RESIDE: [DWELL (wordle), STAY (crossword clue: "Lisa Loeb song"), INHABIT, LIVE]

DECREASE: [ABATE (wordle), DROP (crossword clue: "What you might do to a hot potato"), DWINDLE, DECLINE]

DOOFUS: [CLOWN (wordle), DWEEB (crossword clue: "A nerdy type"), SAP, TURKEY]

MEMBER OF A SEPTET: [DWARF (wordle), WONDER (crossword clue: "He just called to say, 'I love you'"), SEA, SIN]
```

```
VITALITY: [JUICE (wordle), LIFE (crossword clue: "Board game or cereal, perhaps"), ENERGY, ZIP]

PALINDROMES FEATURING “E”:: [LEVEL (wordle), TENET (crossword clue: "Christopher Nolan movie"), PEP, REFER]

FEATURED IN “JACK AND THE BEANSTALK”: [BEANS (wordle), GIANT (crossword clue: "Enormous"), COW, JACK]

CAR MODELS: [CIVIC (wordle), BEETLE (crossword clue: "A ladybug is a type of this"), VOLT, FOCUS]
```
