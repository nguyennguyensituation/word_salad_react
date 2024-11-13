export function isLetter(input: string) {
  return !!(input.length === 1 && input.match(/[a-zA-Z]/));
}

export function isWinner(word: string, letters: string[]) {
  return word === letters.join('');
}

export function getCrosswordMove(input: string, letters: string[], word: string) {
  const allCellsFilled = letters.join('').length === word.length;

  if (isLetter(input) && !allCellsFilled) {
    return 'addLetter';
  } else if (input === 'Backspace') {
    return 'deleteLetter';
  } else if (input === 'Enter' && allCellsFilled) {
    return 'checkGuess';
  }
}

export function getCrosswordCell(move: string, letters: string[], word: string) {
  const firstEmptyIdx = letters.findIndex(char => char === '');
  const lastIdx = word.length - 1;
  let cell = firstEmptyIdx >= 0 ? firstEmptyIdx : lastIdx;

  if (move === 'deleteLetter') {
    return (cell === 0 || letters[cell] !== '') ? cell : cell - 1;
  }
  return cell;
}

export function updateCrosswordCell(move: string, 
  input: string,
  letters: string[],
  word: string,
  setLetters: (newLetters: string[]) => void) {
  const activeCell = getCrosswordCell(move, letters, word);
  const lettersCopy = [...letters];
  if( move === 'deleteLetter') {input = '';}
  lettersCopy[activeCell] = input;
  setLetters(lettersCopy);
}