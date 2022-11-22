import Image from 'next/image';
import notepadIcon from '../public/icons/notepadIcon.png';
import styles from '../styles/Card.module.css';
import minimize from '../public/icons/minimize.png';
import maximize from '../public/icons/maximize.png';
import close from '../public/icons/close.png';
import { useState } from 'react';

const Notepad = ({
  doubleClick,
  setDoubleClick,
  isNotepad,
  setIsNotepad,
  toggleMinimizeNotepad,
}) => {
  const [size, resize] = useState({ x: 800, y: 400 });

  return (
    <div className={styles.container}>
      <div
        className='card'
        onClick={() => {
          setDoubleClick((prevState) => !prevState);
        }}
      >
        <style jsx>{`
          .card {
            width: ${size.x}px;
            height: ${size.y}px;
            z-index: 2;
            border-top: 2px solid white;
            border-left: 2px solid white;
            border-right: 2px solid #393939;
            border-bottom: 2px solid #393939;
            border-radius: 0;
            background: #c0c0c0;
          }
        `}</style>
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
        <ul>
          <li>
            <span>F</span>ile
          </li>
          <li>
            <span>E</span>dit
          </li>
          <li>
            <span>S</span>earch
          </li>
          <li>
            <span>H</span>elp
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Notepad;
