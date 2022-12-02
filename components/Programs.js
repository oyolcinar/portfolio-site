import briefcase from '../public/icons/briefcase.png';
import explorer from '../public/icons/explorer.png';
import minesweeper from '../public/icons/minesweeper.png';
import notepad from '../public/icons/notepad.png';
import outlook from '../public/icons/outlook.png';
import paint from '../public/icons/paint.png';
import styles from '../styles/Start.module.css';
import Image from 'next/image';
import { useClickOutsideHandler } from '../utils/utils';
import { useRef } from 'react';

const Programs = ({
  setIsStartOpen,
  setIsProgramsOpen,
  setIsNotepad,
  setMinimizeNotepad,
  orderArrayHandler,
  isNotepad,
  setActive,
}) => {
  const programsRef = useRef(null);

  useClickOutsideHandler(programsRef, programsOutsideClickHandler);

  function programsOutsideClickHandler() {
    setIsStartOpen(false);
  }

  return (
    <div
      className={`${styles.container} ${styles.programsContainer}`}
      onMouseEnter={() => {
        setIsProgramsOpen(true);
      }}
      ref={programsRef}
    >
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.cluster}>
            <Image src={briefcase} alt='' height={30} />
            <div>Briefcase</div>
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.cluster}>
            <Image src={explorer} alt='' height={30} />
            <div>Internet Explorer</div>
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.cluster}>
            <Image src={minesweeper} alt='' height={30} />
            <div>Minesweeper</div>
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.cluster}>
            <Image src={paint} alt='' height={30} />
            <div>MS Paint</div>
          </div>
        </li>
        <li
          className={styles.item}
          onClick={() => {
            !isNotepad ? orderArrayHandler('notepad') : '';
            setActive('notepad');
            setIsProgramsOpen(false);
            setIsStartOpen(false);
            setIsNotepad(true);
            setMinimizeNotepad(false);
          }}
        >
          <div className={styles.cluster}>
            <Image src={notepad} alt='' height={30} />
            <div>Notepad</div>
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.cluster}>
            <Image src={outlook} alt='' height={30} />
            <div>Outlook</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Programs;
