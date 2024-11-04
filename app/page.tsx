import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h2>TK home page</h2>
      <Link href="/game">Play Word Salad</Link>
    </main>
  );
}
