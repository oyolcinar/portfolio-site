import briefcase from '../public/icons/briefcase.png';
import explorer from '../public/icons/explorer.png';
import minesweeper from '../public/icons/minesweeper.png';
import notepad from '../public/icons/notepad.png';
import outlook from '../public/icons/outlook.png';
import paint from '../public/icons/paint.png';
import styles from '../styles/Start.module.css';
import Image from 'next/image';

const Programs = ({ setIsStartOpen, setIsProgramsOpen, setIsNotepad }) => {
  return (
    <div
      className={`${styles.container} ${styles.programsContainer}`}
      onMouseEnter={() => {
        setIsProgramsOpen(true);
      }}
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
        <li
          className={styles.item}
          onClick={() => {
            setIsProgramsOpen(false);
            setIsStartOpen(false);
            setIsNotepad(true);
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
        <li className={styles.item}>
          <div className={styles.cluster}>
            <Image src={paint} alt='' height={30} />
            <div>MS Paint</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Programs;
