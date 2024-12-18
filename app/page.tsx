import Link from 'next/link';
import Button from '@/app/components/controls/Button';

export default function Home() {
  return (
    <main>
      <Link href="/game" id="play">
        <Button id="play-game" value="Play Word Salad" isPrimary={true}/>
      </Link>
    </main>
  );
}
