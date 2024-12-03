export default function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => 0.5 - Math.random());
}

export function filterArr<T, K extends keyof T>(
  arr: T[],
  key: K,
  value: string,
  match: boolean): T[] {
  return arr.filter(el => {
    return match ? el[key] === value : el[key] !== value;
  });
}