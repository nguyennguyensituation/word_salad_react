import styles from '@/app/components/controls/Button.module.css';

export default function Button(props: {
  id: string,
  value: string,
  disabled?: boolean,
}) {
  return (
    <input
      id={props.id + "-btn"}
      type="button"
      value={props.value}
      disabled={props.disabled}
      className={styles.button}
    />
  );
}