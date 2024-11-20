import styles from '@/app/components/controls/Controller.module.css';
import Button from '@/app/components/controls/Button';
import { ClickHandler } from '@/app/lib/definitions';

export default function Controller(props: { disableSubmit: boolean,
  handleShuffle: ClickHandler,
  handleDeselectAll: ClickHandler,
  submitCards: ClickHandler,
}) {

  return (
    <fieldset className={styles.controller}>
      <Button id="shuffle-btn" value="Shuffle" onClick={props.handleShuffle}/>
      <Button id="deselect-btn" value="Deselect All" onClick={props.handleDeselectAll}/>
      <Button id="submit-btn" value="Submit" onClick={props.submitCards} disabled={props.disableSubmit}/>
    </fieldset>
  );
}
