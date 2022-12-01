import styles from '../styles/SoundControl.module.css';
import { useRef, useEffect } from 'react';

const SoundControl = ({ setSound, soundControlRef }) => {
  const soundRef = useRef(null);

  function setSoundHandler() {
    setSound(false);
  }

  function useClickOutsideHandler(ref, ref2, func) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (ref2.current && !ref2.current.contains(event.target)) {
            if (func) {
              func();
            }
          }
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, ref2, func]);
  }

  useClickOutsideHandler(soundRef, soundControlRef, setSoundHandler);

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
