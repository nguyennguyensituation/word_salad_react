import styles from '@/app/components/Board.module.css';

function Card() {
  return (
    <article className={styles.card}>
      <p>TK Word</p>
    </article>
  );
}

export default function Board() {
  return (
    <article className={styles.board}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </article>
  );
}