import Message from '@/app/components/Message';
import Board from '@/app/components/Board';
import Mistakes from '@/app/components/Mistakes';
import Controller from '@/app/components/Controller';

const gameStatus = 'cardsNotSolved';
const remainingMistakes = 4;

export default function Page() {
  return (
    <main>
      <Message status={gameStatus} />
      <Board />
      <Mistakes />
      <Controller />
    </main>
  );
}