import styles from '@/app/components/Mistakes.module.css';

function Dot() {
  return <span className={styles.dot}></span>
}

export default function Mistakes(props: {
  remainingMistakes: number,
}) {
  const dots = [];

  for (let i = 0; i < props.remainingMistakes; i++) {
    dots.push(<Dot key={i}/>)
  }

  return (
    <article className={styles.mistakes}>
      <p>Mistakes remaining:</p>
      {dots}
    </article>
  );
}