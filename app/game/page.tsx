import Message from '@/app/ui/game/message';
const gameStatus = 'cardsNotSolved';

export default function Page() {
  return (
    <main>
      <Message status={gameStatus} />
      <p>TK Game board</p>
      <p>TK Game mistakes</p>
      <p>TK Game controller</p>
    </main>
  );
}