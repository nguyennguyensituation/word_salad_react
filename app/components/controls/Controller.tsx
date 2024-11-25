import styles from '@/app/components/controls/Controller.module.css';
import Button from '@/app/components/controls/Button';
import { ClickHandler } from '@/app/lib/definitions';

export default function Controller(props: { disableSubmit: boolean,
  disableDeselect: boolean,
  gamePlayed: boolean,
  handleShuffle: ClickHandler,
  handleDeselectAll: ClickHandler,
  submitCards: ClickHandler,
  playAgain: ClickHandler,
}) {

  return (
    <fieldset className={styles.controller}>
      {!props.gamePlayed && 
        <>
          <Button id="shuffle-btn" value="Shuffle" onClick={props.handleShuffle}/>
          <Button id="deselect-btn" value="Deselect All" onClick={props.handleDeselectAll} disabled={props.disableDeselect}/>
          <Button id="submit-btn" value="Submit" onClick={props.submitCards} disabled={props.disableSubmit}/>
        </>
      }

      {props.gamePlayed && <Button id="play-again-btn" value="Play Again" onClick={props.playAgain}/>}
      
    </fieldset>
  );
}
