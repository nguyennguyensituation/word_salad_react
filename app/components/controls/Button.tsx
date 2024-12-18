import styles from '@/app/components/controls/Button.module.css';

export default function Button(props: {
  id: string,
  value: string,
  disabled?: boolean,
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void,
  isXWord?: boolean,
}) {
  return (
    <input
      id={props.id + "-btn"}
      type="button"
      value={props.value}
      disabled={props.disabled}
      onClick={props.onClick}
      className={`${styles.button} ${props.isXWord ? styles.xword : ''}`}
    />
  );
}