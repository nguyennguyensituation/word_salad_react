import styles from '@/app/components/controls/Controller.module.css';
import Button from '@/app/components/controls/Button';
import { ClickHandler } from '@/app/lib/definitions';

export default function Controller(props: { checkCardMode:boolean,
  disableDeselect: boolean,
  disableSubmit: boolean,
  gamePlayed: boolean,
  handleShuffle: ClickHandler,
  handleDeselectAll: ClickHandler,
  submitCards: ClickHandler,
  playAgain: ClickHandler,
  setHideResult: (hide: boolean) => void,
}) {
  return (
    <fieldset className={styles.controller}>
      {!props.gamePlayed && <>
        <Button id="shuffle-btn" value="Shuffle" onClick={props.handleShuffle} disabled={props.checkCardMode}/>
        <Button id="deselect-btn" value="Deselect All" onClick={props.handleDeselectAll} disabled={props.checkCardMode || props.disableDeselect}/>
        <Button id="submit-btn" value="Submit" onClick={props.submitCards} disabled={props.checkCardMode || props.disableSubmit} isPrimary={true}/>
      </>}
      {props.gamePlayed && <Button id="play-again-btn" value="Play Again" onClick={props.playAgain} isPrimary={true}/>}
      {props.gamePlayed && <Button id="results-btn" value="Show Results" onClick={() => props.setHideResult(false) } isPrimary={false}/>}
    </fieldset>
  );
}
