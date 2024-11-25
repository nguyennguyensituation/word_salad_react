import { GameData } from "@/app/lib/definitions";

const connectionsData: GameData[] = [
  {
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
  },
  {
    id: 2,
    categories: [
      {
        difficulty: 1,
        categoryName: "latin words",
        categoryWords: [
          { word: 'carpe', puzzleType: 'wordle'},
          { word: 'ergo' },
          { word: 'quid', puzzleType: 'crossword', crosswordClue: "A pound across the pond, perhaps" },
          { word: 'vox'},
        ]
      },
      {
        difficulty: 2,
        categoryName: "pack (away) for future use",
        categoryWords: [
          { word: 'squirrel', puzzleType: 'crossword', crosswordClue: "____ Nut Zippers" },
          { word: 'stash'},
          { word: 'store', puzzleType: 'wordle'},
          { word: 'stow'},
        ]
      },
      {
        difficulty: 3,
        categoryName: "_____ game",
        categoryWords: [
          { word: 'arcade', puzzleType: 'crossword', crosswordClue: "Where you might find Ms. Pac-Man"},
          { word: 'blame' },
          { word: 'numbers' },
          { word: 'squid', puzzleType: 'wordle' },
        ]
      },
      {
        difficulty: 4,
        categoryName: "adjectives for assets",
        categoryWords: [
          { word: 'fixed' },
          { word: 'frozen', puzzleType: 'crossword', crosswordClue: "Ice cold" },
          { word: 'liquid' },
          { word: 'toxic', puzzleType: 'wordle'},
        ]
      },
    ]
  },
  {
    id: 3,
    categories: [
      {
        difficulty: 1,
        categoryName: "highly skilled",
        categoryWords: [
          { word: 'ace', puzzleType: 'crossword', crosswordClue: "Part of a winning pair in blackjack"},
          { word: 'maestro'},
          { word: 'adept', puzzleType: 'wordle' },
          { word: 'hotshot'},
        ]
      },
      {
        difficulty: 2,
        categoryName: "kinds of cake",
        categoryWords: [
          { word: 'birthday' },
          { word: 'crumb', puzzleType: 'crossword', crosswordClue: "The soft part of bread"},
          { word: 'marble'},
          { word: 'pound', puzzleType: 'wordle'},
        ]
      },
      {
        difficulty: 3,
        categoryName: "tangible",
        categoryWords: [
          { word: 'concrete' },
          { word: 'material', puzzleType: 'crossword', crosswordClue: "Half of a moniker for Madonna"},
          { word: 'real' },
          { word: 'solid', puzzleType: 'wordle' },
        ]
      },
      {
        difficulty: 4,
        categoryName: "things you can throw in metaphors",
        categoryWords: [
          { word: 'curveball' },
          { word: 'party', puzzleType: 'wordle' },
          { word: 'tantrum' },
          { word: 'wrench', puzzleType: 'crossword', crosswordClue: "To pull or twist"},
        ]
      },
    ]
  },
  {
    id: 4,
    categories: [
      {
        difficulty: 1,
        categoryName: "get excited, with 'up'",
        categoryWords: [
          { word: 'fire', puzzleType: 'crossword', crosswordClue: "Earth wind and ____"},
          { word: 'hype'},
          { word: 'psych', puzzleType: 'wordle' },
          { word: 'amp'},
        ]
      },
      {
        difficulty: 2,
        categoryName: "kinds of shoes",
        categoryWords: [
          { word: 'pump' },
          { word: 'flat', puzzleType: 'crossword', crosswordClue: "A tire might get this"},
          { word: 'mule'},
          { word: 'slide', puzzleType: 'wordle'},
        ]
      },
      {
        difficulty: 3,
        categoryName: "legislative roles",
        categoryWords: [
          { word: 'speaker' },
          { word: 'whip', puzzleType: 'crossword', crosswordClue: "Part of a lion tamer's constume"},
          { word: 'leader' },
          { word: 'chair', puzzleType: 'wordle' },
        ]
      },
      {
        difficulty: 4,
        categoryName: "name homophones",
        categoryWords: [
          { word: 'mic' },
          { word: 'matte', puzzleType: 'wordle' },
          { word: 'dug' },
          { word: 'peat', puzzleType: 'crossword', crosswordClue: "Basketball suffix with 'three'"},
        ]
      },
    ]
  },
  {
    id: 5,
    categories: [
      {
        difficulty: 1,
        categoryName: "reside",
        categoryWords: [
          { word: 'stay', puzzleType: 'crossword', crosswordClue: "Lisa Loeb song"},
          { word: 'inhabit'},
          { word: 'dwell', puzzleType: 'wordle' },
          { word: 'live'},
        ]
      },
      {
        difficulty: 2,
        categoryName: "decrease",
        categoryWords: [
          { word: 'dwindle' },
          { word: 'drop', puzzleType: 'crossword', crosswordClue: "What you might do to a hot potato"},
          { word: 'decline'},
          { word: 'abate', puzzleType: 'wordle'},
        ]
      },
      {
        difficulty: 3,
        categoryName: "doofus",
        categoryWords: [
          { word: 'sap' },
          { word: 'dweeb', puzzleType: 'crossword', crosswordClue: "A nerdy type"},
          { word: 'turkey' },
          { word: 'clown', puzzleType: 'wordle' },
        ]
      },
      {
        difficulty: 4,
        categoryName: "member of a septet",
        categoryWords: [
          { word: 'sea' },
          { word: 'dwarf', puzzleType: 'wordle' },
          { word: 'sin' },
          { word: 'wonder', puzzleType: 'crossword', crosswordClue: "He just called to say, 'I love you'"},
        ]
      },
    ]
  },
  {
    id: 6,
    categories: [
      {
        difficulty: 1,
        categoryName: "vitality",
        categoryWords: [
          { word: 'life', puzzleType: 'crossword', crosswordClue: "Board game or cereal, perhaps"},
          { word: 'energy'},
          { word: 'juice', puzzleType: 'wordle' },
          { word: 'zip'},
        ]
      },
      {
        difficulty: 2,
        categoryName: "palindromes featuring 'e'",
        categoryWords: [
          { word: 'pep' },
          { word: 'tenet', puzzleType: 'crossword', crosswordClue: "Christopher Nolan movie"},
          { word: 'refer'},
          { word: 'level', puzzleType: 'wordle'},
        ]
      },
      {
        difficulty: 3,
        categoryName: "featured in 'jack and the beanstalk'",
        categoryWords: [
          { word: 'cow' },
          { word: 'giant', puzzleType: 'crossword', crosswordClue: "Enormous"},
          { word: 'jack' },
          { word: 'beans', puzzleType: 'wordle' },
        ]
      },
      {
        difficulty: 4,
        categoryName: "car models",
        categoryWords: [
          { word: 'volt' },
          { word: 'civic', puzzleType: 'wordle' },
          { word: 'focus' },
          { word: 'beetle', puzzleType: 'crossword', crosswordClue: "A ladybug is a type of this"},
        ]
      },
    ]
  },
];

export default connectionsData;
