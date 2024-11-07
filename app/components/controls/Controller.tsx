import styles from '@/app/components/controls/Controller.module.css';
import Button from '@/app/components/controls/Button';

export default function Controller(props: {
  disableSubmit: boolean,
}) {
  return (
    <fieldset className={styles.controller}>
      <Button id="shuffle-btn" value="Shuffle"/>
      <Button id="deselect-btn" value="Deselect All"/>
      <Button id="submit-btn" value="Submit" disabled={props.disableSubmit}/>
    </fieldset>
  );
}
