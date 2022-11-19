import Image from 'next/image';
import notepadIcon from '../public/icons/notepadIcon.png';
import styles from '../styles/Card.module.css';
import minimize from '../public/icons/minimize.png';
import maximize from '../public/icons/maximize.png';
import close from '../public/icons/close.png';

const Notepad = ({
  doubleClick,
  setDoubleClick,
  isNotepad,
  setIsNotepad,
  toggleMinimizeNotepad,
}) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.card}
        onClick={() => {
          setDoubleClick((prevState) => !prevState);
        }}
      >
        <div
          className={
            !doubleClick ? styles.header : `${styles.header} ${styles.double}`
          }
        >
          <div className={styles.headerLeft}>
            <Image
              src={notepadIcon}
              alt=''
              height={20}
              className={styles.headerModem}
            />
            Notepad
          </div>
          <div className={styles.headerRight}>
            <div>
              <Image
                alt=''
                src={minimize}
                height={20}
                onClick={() => {
                  toggleMinimizeNotepad();
                }}
              />
              <Image
                alt=''
                src={maximize}
                height={20}
                className={styles.maximize}
              />
            </div>
            <div className={styles.close}>
              <Image
                alt=''
                src={close}
                height={21}
                onClick={() => {
                  setIsNotepad(false);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notepad;
