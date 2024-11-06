import styles from '@/app/components/board/Mistakes.module.css';

function Dot() {
  return <span className={styles.dot}></span>;
}

export default function Mistakes(props: {
  remainingMistakes: number,
}) {
  const dots = [];

  for (let id = 0; id < props.remainingMistakes; id++) {
    dots.push(<Dot key={id}/>);
  }

  return (
    <article className={styles.mistakes}>
      <p>Mistakes remaining:</p>
      {dots}
    </article>
  );
}