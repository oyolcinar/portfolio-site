import styles from '../styles/Card.module.css';
import Image from 'next/image';
import close from '../public/icons/close.png';
import questionIcon from '../public/icons/question.png';
import { useRef, useEffect, useState } from 'react';
import { useClickOutsideHandler } from '../utils/utils';

const SaveQuestionMenu = ({
  setSaveQuestion,
  setIsSaved,
  toggleClose,
  titleData,
  title,
  setSaveMenu,
  fileId,
  saveHandler,
  notepad,
  paint,
  overwriteHandler,
  saveNameSameNotepad,
  setSaveNameSameNotepad,
  isNewFile,
  setIsNewFile,
  newFileHandler,
}) => {
  const [doubleClickSavemenu, setDoubleClickSavemenu] = useState(false);

  useEffect(() => {
    toggleClose();
  }, [setIsSaved, toggleClose]);

  const saveRef = useRef();

  function saveDoubleClickHandler() {
    setDoubleClickSavemenu(true);
  }

  useClickOutsideHandler(saveRef, saveDoubleClickHandler);

  return (
    <div
      className={`${styles.container} ${styles.shutdown}`}
      ref={saveRef}
      onClick={() => {
        setDoubleClickSavemenu(false);
      }}
    >
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
              {!saveNameSameNotepad
                ? `Do you want to save changes to '${
                    titleData ? titleData : 'Untitled'
                  }'?`
                : `'${titleData}' already exists. Do you want to overwrite '${titleData}'?`}
            </div>
          </div>
        </div>
        <div className={styles.buttonCluster}>
          <button
            className={`${styles.button} ${styles.sdButton} `}
            onClick={() => {
              titleData ? overwriteHandler(fileId) : setSaveMenu(true);
              setSaveQuestion(false);
              setSaveNameSameNotepad ? setSaveNameSameNotepad(false) : '';
              isNewFile ? newFileHandler() : '';
              setIsNewFile(false);
            }}
          >
            <span className={styles.underline}>Y</span>es
          </button>
          <button
            className={`${styles.button} ${styles.sdButton} `}
            onClick={() => {
              isNewFile ? setSaveQuestion(false) : '';
              isNewFile ? newFileHandler() : setIsSaved(true);
              setIsNewFile(false);
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
