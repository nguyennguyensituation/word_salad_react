import styles from '@/app/components/controls/Controller.module.css';
import Button from '@/app/components/controls/Button';
import { ClickHandler } from '@/app/lib/definitions';

export default function Controller(props: {
  disableSubmit: boolean,
  handleShuffle: ClickHandler,
  handleDeselect: ClickHandler,
}) {

  return (
    <fieldset className={styles.controller}>
      <Button id="shuffle-btn" value="Shuffle" onClick={props.handleShuffle}/>
      <Button id="deselect-btn" value="Deselect All" onClick={props.handleDeselect}/>
      <Button id="submit-btn" value="Submit" disabled={props.disableSubmit}/>
    </fieldset>
  );
}
