import styles from '@/app/components/messages/Message.module.css';
import { GameStatus } from '../../lib/definitions';
import { GAME_STATUSES } from '@/app/lib/messages';

export default function Message(props: {
  status: GameStatus
}) {
  const messageContent: string = GAME_STATUSES[props.status];

  return (
    <section className={styles.message}>
      <p>{messageContent}</p>
    </section>
  );
}
