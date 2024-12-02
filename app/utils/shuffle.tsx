export default function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => 0.5 - Math.random());
}