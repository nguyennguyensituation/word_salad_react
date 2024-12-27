import { PuzzleResult } from '@/app/lib/definitions';

export function puzzleDisplayText(puzzleType: string, result: boolean[]) {
  const numSolved = result.filter(res => res).length;
  const puzzleName = puzzleType === 'connections' ?
    'Categories' :
    puzzleType[0].toUpperCase() + puzzleType.slice(1) + 's';

  return `${numSolved} out of 4 ${puzzleName} solved`;
}

export function calculateScore(puzzleResult: PuzzleResult) {
  const MAX_SCORE = 120;
  let score = 0;

  for (const puzzle in puzzleResult) {
    puzzleResult[puzzle as keyof PuzzleResult].forEach(result => {
      if (!result) {
        score += 10;
      }
    });
  }

  return `${score} / ${MAX_SCORE} points`;
}
