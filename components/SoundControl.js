import styles from '../styles/SoundControl.module.css';
import { useRef } from 'react';
import { useClickOutsideHandler } from '../utils/utils';

const SoundControl = ({ setSound, soundControlRef }) => {
  const soundRef = useRef(null);

  function setSoundHandler() {
    setSound(false);
  }

  useClickOutsideHandler(soundRef, setSoundHandler);

  return (
    <div className={styles.container} ref={soundRef}>
      <div className={styles.header}>Volume</div>
      <div className={styles.body}>
        <div className={styles.triangle}></div>
        <input
          type='range'
          className={styles.input}
          min='0'
          max='100'
          defaultValue='50'
        />
      </div>
      <div>
        <label className={styles.label}>
          <span className={styles.underline}>M</span>ute
          <input type='checkbox' className={styles.checkbox} />
          <span className={styles.checkmark}></span>
        </label>
      </div>
    </div>
  );
};

export default SoundControl;
