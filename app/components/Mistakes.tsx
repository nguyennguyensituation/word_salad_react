import styles from '@/app/components/Mistakes.module.css';

function Dot() {
  return <span className={styles.dot}></span>
}

export default function Mistakes() {
  return (
    <article className={styles.mistakes}>
      <p>Mistakes remaining:</p>
      <Dot />
      <Dot />
      <Dot />
      <Dot />
    </article>
  );
}