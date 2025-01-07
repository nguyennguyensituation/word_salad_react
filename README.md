<a id="readme-top"></a>

![Logo](public/images/logo.png)

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#what-is-word-salad">What is Word Salad</a>
    </li>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li>
      <a href="#how-to-play">How to Play</a>
    </li>
    <li>
      <a href="#features">Features</a>
      <ul>
         <li>
          <a href="#overall">Overall</a>
        </li>
        <li>
          <a href="#wordle">Wordle</a>
        </li>
        <li>
          <a href="#crossword">Crossword</a>
        </li>
        <li>
          <a href="#connections">Connections</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#potential-roadmap">Potential Roadmap</a>
    </li>
    <li>
      <a href="#contact">Contact</a>
    </li>
    <li>
      <a href="#answer-key">Answer Key</a>
    </li>
  </ol>
</details>

## What is Word Salad?

**Word Salad** is a game for all the fans of **_The New York Times_ Crossword, Connections, and Wordle**, who have been clamoring to play all three games...all at the same time. Early, completely unsubstantiated data shows that **Word Salad** is 300% more fun than the originals.

Built with reusable React components, **Word Salad** features a responsive interface that easily transitions between different puzzle modes within the same session, providing real-time feedback and scoring. The application is fully responsive and designed to be intuitive and easy-to-play.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

* [![React][React.js]][React-url]
* [![Next][Next.js]][Next-url]
* [![TypeScript][TypeScript]][TypesScript-url]
* ![HTML5][HTML5]
* ![CSS][CSS]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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
Open [http://localhost:3000](http://localhost:3000) in your browser to play.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## How to Play

**1. The board contains 16 cards. Some of the cards have words displayed on them. The rest of the cards contain a puzzle that you'll need to solve to reveal the word.**

![Game board](public/images/starting_board.png)

---
**2. Select a card to open a puzzle. The puzzle will be either a Wordle or a crossword. Solve the puzzle to reveal the word.**

![Puzzles](public/images/puzzles.png)

---
**3. Once all the words have been revealed, you'll be able to play Connections.**

![Game board all puzzles solved](public/images/board_solved.png)

---
**4. Select a set of 4 cards that have something in common. If you select the correct set of cards, the category will be revealed.**

![Game board with cards selected](public/images/select_cards.png)

![Single category solved](public/images/single_category_solved.png)

---
**5. Continue selecting sets of 4 cards until you've found all the categories.**

![All categories solved](public/images/all_categories_solved.png)

---
**6. At the end of the game, you'll see a summary of your results for each puzzle and your final score.**

![All categories solved](public/images/results.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

### Overall
* Seamlessly transition between different puzzle modes: Connections, Wordle, Crossword
* Real-time feedback to user input:
  * After you solve a puzzle, the word will appear on the card in black text.
  * If you aren't able to solve the puzzle or you quit the puzzle without solving it, the word will appear on the card in red text.
  * Different animations play based on user interactions.
* Results summary shown at the end of the game:
  * Displays the number of Wordles and Crosswords solved and the number of Connections categories found
  * Calculates overall score

### Wordle
* Real-time feedback to user input:
  * When submitting a word, tile colors change to show how close the guess is to the correct word. The display logic takes into account letter position and duplicate letters.
  * You can only input valid alphabetical characters.
  * You can only submit valid words that are in the Wordle dictionary
  * You can't submit duplicate guesses.
  * The ability to input characters or submit a guess is disabled/enabled based on where you are in the game and your selections
* State management - The game keeps track of previous guesses for that specific puzzle.
* Binary search to efficiently confirm that the submitted word is in the 14,800+ word Wordle dictionary.

![Solved Wordle puzzle](public/images/wordle_solved.png)

### Crossword
* Real-time feedback to user input
  * You can only input valid alphabetical characters.
  * You can't submit duplicate guesses.
  * The ability to input characters or submit a guess is disabled/enabled based on where you are in the game and your selections
* State management - The game keeps track of previous guesses for that specific puzzle.

![Solved Crossword puzzle](public/images/xword_solved.png)

### Connections
**Solving puzzles**
* Real-time feedback to user input
  * You can't select any cards until you've played all the Wordle and crossword puzzles.
  * You can't select more than 4 cards at a time.
  * You can't submit duplicate guesses.
  * The game will tell you when you are 1 card away from solving a category.
  * Deselect and Submit buttons are enabled/disabled based on where you are in the game and your selections
* State management - The game keeps track of the sets of cards you have selected previously and the number of guesses made.
* Shuffle cards or deselect all previously selected cards.

![Cards revealed](public/images/cards_revealed.png)

![Game board with cards selected](public/images/select_cards.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Potential Roadmap

**General**
- [ ] Toggle display for instructions modal
- [ ] After the connections game has been played, the board flips over and turns into different puzzles:
- [ ] Option to create custom games
- [ ] More granular results (e.g. categories found for each Connections guess)
  
**Wordle**
- [ ] Hard mode - All successive guesses must contain previously guessed letters that were matches
- [ ] Add letter flip animation
  
**Crossword**
  - [ ] After each guess, show the letters that are correct
  - [ ] Option for Crossword hints (i.e. reveal up to 3 letters)
  - [ ] Decrement score for each hint used

**Connections**
  - [ ] Decrement score for each wrong Connections guess

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Tram Nguyen | [Portfolio](https://tram-nguyen.dev) | [Github](https://github.com/nguyennguyensituation/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/

[TypeScript]: https://img.shields.io/badge/TypeScript-20232A?style=for-the-badge&logo=typescript&logoColor=white&labelColor=3178C6&color=3178C6
[TypesScript-url]: https://www.typescriptlang.org/

[HTML5]: https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&labelColor=%23E34F26&color=%23E34F26

[CSS]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white&labelColor=%231572B6&color=%231572B6
