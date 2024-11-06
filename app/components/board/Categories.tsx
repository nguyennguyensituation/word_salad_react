import styles from '@/app/components/board/Categories.module.css';

function Category(props: {
  difficulty: string
}) {
  const id = "difficulty-" + props.difficulty;

  return (
    <div className={styles.category} id={styles[id]}>
      <p>TK Category Name</p>
      <p>TK Words</p>
    </div>
  );
}

export default function Categories() {
  return (
    <article className={styles.categories}>
      <Category difficulty="1" />
      <Category difficulty="2" />
      <Category difficulty="3" />
      <Category difficulty="4" />
    </article>
  );
}