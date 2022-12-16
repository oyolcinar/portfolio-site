import { useRef, useEffect, useState } from 'react';
import { useClickOutsideHandler } from '../utils/utils';
import Draggable from 'react-draggable';

import DesktopDirectory from './BodyComponents/DesktopDirectory';
import BriefcaseDirectory from './BodyComponents/BriefcaseDirectory';

import styles from '../styles/Card.module.css';

import Image from 'next/image';
import desktopIcon from '../public/icons/desktop.png';
import favorites from '../public/icons/directoryFavorites.png';
import close from '../public/icons/close.png';
import briefcaseIcon from '../public/icons/briefcaseIcon.png';
import downArrow from '../public/icons/downArrow.png';

const MenuComponent = ({
  setSaveMenu,
  setIsSaved,
  isSave,
  setOpenMenu,
  setIsDirectory,
}) => {
  const [doubleClickSave, setDoubleClickSave] = useState(false);
  const [directory, setDirectory] = useState(false);
  const [selectFileType, setSelectFileType] = useState(false);

  const saveMenuRef = useRef();

  function saveDoubleClickHandler() {
    setDoubleClickSave(true);
  }

  useClickOutsideHandler(saveMenuRef, saveDoubleClickHandler);

  return (
    <Draggable>
      <div
        className={`${styles.container} ${styles.shutdown}`}
        ref={saveMenuRef}
        onClick={() => {
          setDoubleClickSave(false);
        }}
      >
        <div
          className={`${styles.card} ${styles.shutdown} ${styles.saveMenuContainer}`}
        >
          <div
            className={
              !doubleClickSave
                ? styles.header
                : `${styles.header} ${styles.double}`
            }
          >
            <div className={`${styles.headerLeft} ${styles.headerShutdown}`}>
              {isSave ? 'Save As' : 'Open'}
            </div>
            <div className={styles.headerRight}>
              <div className={`${styles.close} ${styles.sdClose}`}>
                <Image
                  alt=''
                  src={close}
                  height={23}
                  onClick={() => {
                    isSave ? setSaveMenu(false) : setOpenMenu(false);
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.SaveBody}>
            <div className={styles.saveBodyTop}>
              <div className={styles.saveBodyLabel}>
                {isSave ? 'Save' : 'Look'}{' '}
                <span className={styles.underline}>i</span>n:{' '}
              </div>
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
                  <div className={styles.saveDirectoryDropdown}>
                    <DesktopDirectory />
                    <BriefcaseDirectory />
                  </div>
                )}
              </div>
              <div className={styles.saveBodyTopButtonCluster}>
                <div className={styles.saveBodyTopButtons}>
                  <Image src={favorites} height={18} alt='' />
                </div>
                <div className={styles.saveBodyTopButtons}>
                  <Image src={desktopIcon} height={18} alt='' />
                </div>
              </div>
            </div>
            <div className={styles.saveBodyMiddle}></div>
            <div className={styles.saveBodyBottom}>
              <div className={styles.saveBodyBottomFields}>
                <div className={styles.saveBodyField}>
                  <div className={styles.saveBodyLabel}>
                    File <span className={styles.underline}>n</span>ame:
                  </div>
                  <input type='text' className={styles.saveBodyInput}></input>
                </div>
                <div className={styles.saveBodyField}>
                  <div className={styles.saveBodyLabel}>
                    {isSave ? 'Save as' : 'Files of'}{' '}
                    <span className={styles.underline}>t</span>ype:{' '}
                  </div>
                  <div className={styles.saveDirectoryField}>
                    <div className={styles.saveDirectorySelected}></div>
                    <div
                      className={styles.saveDirectoryButton}
                      onClick={() => {
                        setSelectFileType((prevState) => !prevState);
                      }}
                    >
                      <Image src={downArrow} alt='' height={12} />
                    </div>
                    {selectFileType && (
                      <div
                        className={`${styles.saveDirectoryDropdown} ${styles.filetypeDropdown}`}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.saveBodyButtonCluster}>
                <button className={`${styles.button} ${styles.sdButton} `}>
                  <span className={styles.underline}>{isSave ? 'S' : 'O'}</span>
                  {isSave ? 'ave' : 'pen'}
                </button>
                <button
                  className={`${styles.button} ${styles.sdButton} `}
                  onClick={() => {
                    isSave ? setSaveMenu(false) : setOpenMenu(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default MenuComponent;
