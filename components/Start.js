import shutdown from '../public/icons/shutdown.png';
import key from '../public/icons/key.png';
import help from '../public/icons/help.png';
import programs from '../public/icons/programs.png';
import documents from '../public/icons/documents.png';
import Image from 'next/image';
import styles from '../styles/Start.module.css';
import { RiArrowRightSFill } from 'react-icons/ri';
import { useRef, useEffect } from 'react';
import StartDocuments from './StartDocuments';
import Programs from './Programs';

const Start = ({
  setIsStartOpen,
  setIsShutdown,
  toggleMinimize,
  modem,
  isDocumentsOpen,
  setIsDocumentsOpen,
  isProgramsOpen,
  setIsProgramsOpen,
  setIsNotepad,
  setMinimizeNotepad,
  orderArrayHandler,
  isNotepad,
  startButtonRef,
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
  const startRef = useRef(null);

  function useClickOutsideHandler(ref, ref2, func) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (!isProgramsOpen && !isDocumentsOpen) {
          if (ref2.current && !ref2.current.contains(event.target)) {
            if (ref.current && !ref.current.contains(event.target)) {
              if (func) {
                func();
              }
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

  function toggleDocuments() {
    setIsProgramsOpen(false);
    setIsDocumentsOpen(true);
  }

  function togglePrograms() {
    setIsProgramsOpen(true);
  }

  function toggleShutdown() {
    setIsShutdown((prevState) => !prevState);
  }

  function outsideStartClickHandler() {
    setIsStartOpen(false);
  }

  useClickOutsideHandler(startRef, startButtonRef, outsideStartClickHandler);

  return (
    <>
      <div className={styles.container} ref={startRef}>
        <div className={styles.banner}>
          <div className={styles.bannerText}>Olgun Yolcinar | Web Dev</div>
        </div>
        <ul className={styles.list}>
          <li
            className={`${styles.item} ${styles.firstTwo}`}
            onMouseEnter={() => {
              togglePrograms();
            }}
            onMouseLeave={() => {
              setIsProgramsOpen(false);
            }}
          >
            <div className={styles.programsCluster}>
              <Image
                src={programs}
                alt=''
                height={38}
                className={styles.programsIcon}
              />
              <div>Programs</div>
            </div>
            <RiArrowRightSFill className={styles.arrow} />
          </li>
          <li
            className={`${styles.item} ${styles.firstTwo}`}
            onMouseEnter={() => {
              toggleDocuments();
            }}
            onMouseLeave={() => {
              setIsDocumentsOpen(false);
            }}
          >
            <div className={styles.cluster}>
              <Image src={documents} alt='' height={30} />
              <div>Documents</div>
            </div>
            <RiArrowRightSFill className={styles.arrow} />
          </li>
          <li className={styles.item}>
            <Image src={help} alt='' height={30} className={styles.helpImage} />
            <div className={styles.help}>Help</div>
          </li>
          <li className={styles.seperator}></li>
          <li className={styles.item}>
            <Image src={key} alt='' height={45} />
            Login...
          </li>
          <li
            className={`${styles.item} ${styles.shutdown}`}
            onClick={() => {
              setIsStartOpen(false);
              setIsShutdown(true);
              if (modem) toggleMinimize(false);
            }}
          >
            <Image src={shutdown} alt='' height={45} />
            Turn Off Computer...
          </li>
        </ul>
      </div>
      {isDocumentsOpen && !isProgramsOpen && (
        <StartDocuments
          setIsStartOpen={setIsStartOpen}
          setIsDocumentsOpen={setIsDocumentsOpen}
          orderArrayHandler={orderArrayHandler}
        />
      )}
      {isProgramsOpen && (
        <Programs
          setIsStartOpen={setIsStartOpen}
          setIsProgramsOpen={setIsProgramsOpen}
          setIsNotepad={setIsNotepad}
          setMinimizeNotepad={setMinimizeNotepad}
          orderArrayHandler={orderArrayHandler}
          isNotepad={isNotepad}
          setActive={setActive}
          isPaint={isPaint}
          setIsPaint={setIsPaint}
          setMinimizePaint={setMinimizePaint}
          isExplorer={isExplorer}
          setIsExplorer={setIsExplorer}
          setMinimizeExplorer={setMinimizeExplorer}
          isBriefcase={isBriefcase}
          setIsBriefcase={setIsBriefcase}
          setMinimizeBriefcase={setMinimizeBriefcase}
          isOutlook={isOutlook}
          setIsOutlook={setIsOutlook}
          setMinimizeOutlook={setMinimizeOutlook}
        />
      )}
    </>
  );
};

export default Start;
