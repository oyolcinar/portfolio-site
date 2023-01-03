import styles from '../../styles/Briefcase.module.css';

const HelpComponent = () => {
  return (
    <div className={styles.help}>
      <div className={styles.helpText}>
        So, basically a Win98 clone. Feel free to play around, save, open etc.
        Some of the features are to be added as I go along. Sounds? Keyboard
        interactions? A winamp player? Screen saver feature? Who knows!
        <br />
        <br />
        Used draggable library for react. So the program tabs require double
        click to move around and you can resize them from the usual resize
        button from bottom right.
        <br />
        <br />
        Oh and feel free to open Outlook and send me a message.
        <br />
        <br />
        Cheers! Olgun.
      </div>
    </div>
  );
};

export default HelpComponent;
