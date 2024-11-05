import styles from '@/app/components/Controller.module.css';

function Button(props: {
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

export default function Controller() {
  return (
    <fieldset className={styles.controller}>
       <Button id="shuffle" value="Shuffle"/>
       <Button id="deselect" value="Deselect All"/>
       <Button id="submit" value="Submit" disabled={true}/>
    </fieldset>
  );
}
