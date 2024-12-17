import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Link href="/game" id="play">Play Word Salad</Link>
    </main>
  );
}
