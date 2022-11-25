import styles from '../styles/SoundControl.module.css';
import { clickOutsideHandler } from '../utils/utils';
import { useRef } from 'react';

const SoundControl = ({ setSound }) => {
  const soundRef = useRef(null);

  function setSoundHandler() {
    setSound(false);
  }

  clickOutsideHandler(soundRef, setSoundHandler);

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
