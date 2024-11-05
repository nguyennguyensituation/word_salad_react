import styles from '@/app/components/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <span>w</span>
        <span className="violet">O</span>
        <span className="green">r</span>
        <span>d&nbsp;</span>
        <span className="blue">s</span>
        <span>A</span>
        <span className="violet">L</span>
        <span className="yellow">a</span>
        <span className="green">D</span>
      </h1>
      <p>The New York Times Connections, Crossword, and Wordle...all at the same time!</p>
    </header>
  );
}
