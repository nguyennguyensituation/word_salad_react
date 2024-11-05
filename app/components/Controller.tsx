import styles from '@/app/components/Controller.module.css';
import Button from '@/app/components/Button';

export default function Controller() {
  return (
    <fieldset className={styles.controller}>
       <Button id="shuffle-btn" value="Shuffle"/>
       <Button id="deselect-btn" value="Deselect All"/>
       <Button id="submit-btn" value="Submit" disabled={true}/>
    </fieldset>
  );
}
