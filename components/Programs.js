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
  isPaint,
  setIsPaint,
  setMinimizePaint,
  isExplorer,
  setIsExplorer,
  setMinimizeExplorer,
  isBriefcase,
  setIsBriefcase,
  setMinimizeBriefcase,
  isOutlook,
  setIsOutlook,
  setMinimizeOutlook,
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
        <li
          className={styles.item}
          onClick={() => {
            !isBriefcase ? orderArrayHandler('briefcase') : '';
            setActive('briefcase');
            setIsProgramsOpen(false);
            setIsStartOpen(false);
            setIsBriefcase(true);
            setMinimizeBriefcase(false);
          }}
        >
          <div className={styles.cluster}>
            <Image src={briefcase} alt='' height={30} />
            <div>Briefcase</div>
          </div>
        </li>
        <li
          className={styles.item}
          onClick={() => {
            !isExplorer ? orderArrayHandler('explorer') : '';
            setActive('explorer');
            setIsProgramsOpen(false);
            setIsStartOpen(false);
            setIsExplorer(true);
            setMinimizeExplorer(false);
          }}
        >
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
        <li
          className={styles.item}
          onClick={() => {
            !isPaint ? orderArrayHandler('paint') : '';
            setActive('paint');
            setIsProgramsOpen(false);
            setIsStartOpen(false);
            setIsPaint(true);
            setMinimizePaint(false);
          }}
        >
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
        <li
          className={styles.item}
          onClick={() => {
            !isOutlook ? orderArrayHandler('outlook') : '';
            setActive('outlook');
            setIsProgramsOpen(false);
            setIsStartOpen(false);
            setIsOutlook(true);
            setMinimizeOutlook(false);
          }}
        >
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
