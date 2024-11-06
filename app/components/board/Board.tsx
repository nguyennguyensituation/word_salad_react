import styles from '@/app/components/board/Board.module.css';
import Card from '@/app/components/board/Card';

export default function Board() {
  return (
    <article className={styles.board}>
      <Card /><Card /><Card /><Card />
      <Card /><Card /><Card /><Card />
      <Card /><Card /><Card /><Card />
      <Card /><Card /><Card /><Card />
    </article>
  );
}