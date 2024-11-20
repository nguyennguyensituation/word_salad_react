import styles from '@/app/components/board/Categories.module.css';
import { CategoryDetail } from '@/app/lib/definitions';

function Category(props: {name: string,
  difficulty: number,
  words: string[]
}) {
  const difficultyClass = "difficulty" + props.difficulty;
  return (
    <div className={`${styles.category} ${styles[difficultyClass]}`}>
      <p>{props.name}</p>
      <p>{props.words.join(', ')}</p>
    </div>
  );
}

export default function Categories(props: {categories: CategoryDetail[]}) {
  return (
    <>
      <article className={styles.categories}>
        {props.categories.map((cat, idx) => {
          return <Category
            name={cat.name}
            difficulty={cat.difficulty}
            words={cat.words}
            key={idx}/>;
        }) }
      </article>
    </>
  );
}