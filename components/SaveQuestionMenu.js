import styles from '../styles/Card.module.css';
import Image from 'next/image';
import close from '../public/icons/close.png';
import questionIcon from '../public/icons/question.png';
import { useRef, useEffect } from 'react';
import { useClickOutsideHandler } from '../utils/utils';

const SaveQuestionMenu = ({
  doubleClickSavemenu,
  setDoubleClickSavemenu,
  setSaveQuestion,
  setIsSaved,
  toggleClose,
  titleData,
  title,
}) => {
  useEffect(() => {
    toggleClose();
  }, [setIsSaved, toggleClose]);

  const saveRef = useRef();

  function saveDoubleClickHandler() {
    setDoubleClickSavemenu(true);
  }

  useClickOutsideHandler(saveRef, saveDoubleClickHandler);

  return (
    <div className={`${styles.container} ${styles.shutdown}`} ref={saveRef}>
      <div
        className={`${styles.card} ${styles.shutdown} ${styles.questionContainer}`}
      >
        <div
          className={
            !doubleClickSavemenu
              ? styles.header
              : `${styles.header} ${styles.double}`
          }
        >
          <div className={`${styles.headerLeft} ${styles.headerShutdown}`}>
            {title}
          </div>
          <div className={styles.headerRight}>
            <div className={`${styles.close} ${styles.sdClose}`}>
              <Image
                alt=''
                src={close}
                height={23}
                onClick={() => {
                  setSaveQuestion(false);
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={`${styles.bodyLeft} ${styles.sdBodyLeft}`}>
            <Image src={questionIcon} alt='' height={45} />
          </div>
          <div className={styles.bodyRight}>
            <div>
              Do you want to save changes to &quot;
              {titleData ? titleData : 'Untitled'}&quot;?
            </div>
          </div>
        </div>
        <div className={styles.buttonCluster}>
          <button className={`${styles.button} ${styles.sdButton} `}>
            <span className={styles.underline}>Y</span>es
          </button>
          <button
            className={`${styles.button} ${styles.sdButton} `}
            onClick={() => {
              setIsSaved(true);
            }}
          >
            N<span className={styles.underline}>o</span>
          </button>
          <button
            className={`${styles.button} ${styles.sdButton} `}
            onClick={() => {
              setSaveQuestion(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveQuestionMenu;