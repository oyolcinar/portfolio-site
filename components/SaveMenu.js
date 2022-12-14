import styles from '../styles/Card.module.css';
import Image from 'next/image';
import close from '../public/icons/close.png';
import briefcaseIcon from '../public/icons/briefcaseIcon.png';
import downArrow from '../public/icons/downArrow.png';
import { useRef, useEffect, useState } from 'react';
import { useClickOutsideHandler } from '../utils/utils';

const SaveMenu = ({ setSaveMenu, setIsSaved }) => {
  const [doubleClickSave, setDoubleClickSave] = useState(false);
  const [directory, setDirectory] = useState(false);
  const [selectFileType, setSelectFileType] = useState(false);

  const saveMenuRef = useRef();

  function saveDoubleClickHandler() {
    setDoubleClickSave(true);
  }

  useClickOutsideHandler(saveMenuRef, saveDoubleClickHandler);

  return (
    <div
      className={`${styles.container} ${styles.shutdown}`}
      ref={saveMenuRef}
      onClick={() => {
        setDoubleClickSave(false);
      }}
    >
      <div
        className={`${styles.card} ${styles.shutdown} ${styles.questionContainer}`}
      >
        <div
          className={
            !doubleClickSave
              ? styles.header
              : `${styles.header} ${styles.double}`
          }
        >
          <div className={`${styles.headerLeft} ${styles.headerShutdown}`}>
            Save As
          </div>
          <div className={styles.headerRight}>
            <div className={`${styles.close} ${styles.sdClose}`}>
              <Image
                alt=''
                src={close}
                height={23}
                onClick={() => {
                  setSaveMenu(false);
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.SaveBody}>
          <div className={styles.saveBodyTop}>
            <div>Save in: </div>
            <div className={styles.saveDirectoryField}>
              <div className={styles.saveDirectorySelected}></div>
              <div
                className={styles.saveDirectoryButton}
                onClick={() => {
                  setDirectory((prevState) => !prevState);
                }}
              >
                <Image src={downArrow} alt='' height={12} />
              </div>
              {directory && (
                <div className={styles.saveDirectoryDropdown}></div>
              )}
            </div>
          </div>
          <div className={styles.saveBodyMiddle}></div>
          <div className={styles.saveBodyBottom}>
            <div className={styles.saveBodyBottomFields}>
              <div className={styles.saveBodyField}>
                <div>
                  <span className={styles.underline}>F</span>ile name:
                </div>
                <input type='text' className={styles.saveBodyInput}></input>
              </div>
              <div className={styles.saveBodyField}>
                <div>
                  Save as <span className={styles.underline}>t</span>ype:{' '}
                </div>
                <div className={styles.saveDirectoryField}>
                  <div
                    className={styles.saveDirectoryButton}
                    onClick={() => {
                      setSelectFileType((prevState) => !prevState);
                    }}
                  >
                    <Image src={downArrow} alt='' height={12} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.saveBodyButtonCluster}>
              <button className={`${styles.button} ${styles.sdButton} `}>
                <span className={styles.underline}>S</span>ave
              </button>
              <button
                className={`${styles.button} ${styles.sdButton} `}
                onClick={() => {
                  setSaveMenu(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveMenu;
