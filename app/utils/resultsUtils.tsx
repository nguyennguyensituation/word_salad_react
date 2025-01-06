import { PuzzleResult } from '@/app/lib/definitions';

export function puzzleDisplayText(puzzleType: string, result: boolean[]) {
  const numSolved = result.filter(res => res).length;
  const puzzleName = puzzleType === 'connections' ?
    'Categories' :
    puzzleType[0].toUpperCase() + puzzleType.slice(1) + 's';

  return `${numSolved} out of 4 ${puzzleName} solved`;
}

export function calculateScore(puzzleResults: PuzzleResult) {
  const MAX_SCORE = 120;
  const puzzleScore = (results: boolean[]) => results.filter(Boolean).length;
  let totalScore = 0;

  for (const puzz in puzzleResults) {
    totalScore += puzzleScore(puzzleResults[puzz as keyof PuzzleResult]);
  }

  return `${totalScore * 10} / ${MAX_SCORE} points`;
}
