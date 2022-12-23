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
import downArrow from '../public/icons/downArrow.png';

const MenuComponent = ({
  setSaveMenu,
  setIsSaved,
  isSave,
  setOpenMenu,
  setIsDirectory,
  notepad,
  briefcase,
  paint,
  notepadText,
  saveHandler,
  setTitleData,
  briefCaseFiles,
  desktopFilesForMenu,
  desktopPermanentItems,
  checkFiles,
  fileId,
  overwriteHandler,
}) => {
  const [doubleClickSave, setDoubleClickSave] = useState(false);
  const [directory, setDirectory] = useState(false);
  const [selectFileType, setSelectFileType] = useState(false);
  const [selectedDirectory, setSelectedDirectory] = useState('desktop');
  const [fileName, setFileName] = useState('');
  const [selectedFileType, setSelectedFileType] = useState(
    notepad ? '.txt' : paint ? '.bmp' : 'all',
  );
  const [activeList, setActiveList] = useState([]);

  const all = 'All Documents (*)';
  const bitmap = 'Bitmap Files (*.bmp)';
  const text = 'Text Documents (*.txt)';
  const jpg = 'JPG Files (*.jpg)';
  const jpeg = 'JPEG Files (*.jpeg)';

  const saveMenuRef = useRef();

  useEffect(() => {
    const filtered = checkFiles(selectedFileType, selectedDirectory);
    setActiveList(filtered);
  }, [selectedFileType, selectedDirectory, checkFiles]);

  function toggleOpen() {
    openHandler();
    setTitleData();
    setOpenMenu(false);
  }

  function toggleSave() {
    saveHandler(
      fileName,
      selectedFileType,
      notepadText,
      selectedDirectory,
      notepad ? 'notepad' : 'paint',
    );
    setTitleData(fileName + selectedFileType);
    setSaveMenu(false);
  }

  function fileNameHandler(e) {
    setFileName(e.target.value);
  }

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
                <div className={styles.saveDirectorySelected}>
                  {selectedDirectory === 'desktop' ? (
                    <DesktopDirectory
                      setSelectedDirectory={setSelectedDirectory}
                      setDirectory={setDirectory}
                    />
                  ) : (
                    <BriefcaseDirectory
                      setSelectedDirectory={setSelectedDirectory}
                      setDirectory={setDirectory}
                    />
                  )}
                </div>
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
                    {selectedDirectory === 'desktop' ? (
                      <BriefcaseDirectory
                        setSelectedDirectory={setSelectedDirectory}
                        setDirectory={setDirectory}
                      />
                    ) : (
                      <DesktopDirectory
                        setSelectedDirectory={setSelectedDirectory}
                        setDirectory={setDirectory}
                      />
                    )}
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
            <div className={styles.saveBodyMiddle}>
              {selectedFileType === 'all' || '.txt'
                ? desktopPermanentItems
                : ''}
              {selectedFileType !== 'all' ? activeList : ''}
            </div>
            <div className={styles.saveBodyBottom}>
              <div className={styles.saveBodyBottomFields}>
                <div className={styles.saveBodyField}>
                  <div className={styles.saveBodyLabel}>
                    File <span className={styles.underline}>n</span>ame:
                  </div>
                  <input
                    type='text'
                    className={styles.saveBodyInput}
                    onChange={(e) => {
                      fileNameHandler(e);
                    }}
                  ></input>
                </div>
                <div className={styles.saveBodyField}>
                  <div className={styles.saveBodyLabel}>
                    {isSave ? 'Save as' : 'Files of'}{' '}
                    <span className={styles.underline}>t</span>ype:{' '}
                  </div>
                  <div className={styles.saveDirectoryField}>
                    <div
                      className={styles.saveDirectorySelected}
                      onClick={() => {
                        setSelectFileType((prevState) => !prevState);
                      }}
                    >
                      <div className={styles.selectedFileType}>
                        {selectedFileType === 'all'
                          ? all
                          : selectedFileType === '.txt'
                          ? text
                          : selectedFileType === '.bmp'
                          ? bitmap
                          : selectedFileType === '.jpg'
                          ? jpg
                          : jpeg}
                      </div>
                    </div>
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
                        className={
                          briefcase
                            ? `${styles.filetypeDropdown} ${styles.filetypeDropdownBriefcase}`
                            : notepad && isSave
                            ? `${styles.filetypeDropdown} ${styles.filetypeDropdownNotepadSave}`
                            : notepad && !isSave
                            ? `${styles.filetypeDropdown} ${styles.filetypeDropdownNotepadOpen}`
                            : `${styles.filetypeDropdown} ${styles.filetypeDropdownPaint}`
                        }
                      >
                        {!paint && selectedFileType !== '.txt' && (
                          <div
                            className={styles.selectedFileType}
                            onClick={() => {
                              setSelectedFileType('.txt');
                              setSelectFileType(false);
                            }}
                          >
                            {text}
                          </div>
                        )}
                        {!notepad && selectedFileType !== '.bmp' && (
                          <div
                            className={styles.selectedFileType}
                            onClick={() => {
                              setSelectedFileType('.bmp');
                              setSelectFileType(false);
                            }}
                          >
                            {bitmap}
                          </div>
                        )}
                        {!notepad && selectedFileType !== '.jpg' && (
                          <div
                            className={styles.selectedFileType}
                            onClick={() => {
                              setSelectedFileType('.jpg');
                              setSelectFileType(false);
                            }}
                          >
                            {jpg}
                          </div>
                        )}
                        {!notepad && selectedFileType !== '.jpeg' && (
                          <div
                            className={styles.selectedFileType}
                            onClick={() => {
                              setSelectedFileType('.jpeg');
                              setSelectFileType(false);
                            }}
                          >
                            {jpeg}
                          </div>
                        )}
                        {!isSave &&
                          !notepad &&
                          !paint &&
                          selectedFileType !== 'all' && (
                            <div
                              className={styles.selectedFileType}
                              onClick={() => {
                                setSelectedFileType('all');
                                setSelectFileType(false);
                              }}
                            >
                              {all}
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.saveBodyButtonCluster}>
                <button
                  className={`${styles.button} ${styles.sdButton} `}
                  onClick={() => {
                    isSave ? toggleSave() : toggleOpen();
                  }}
                >
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
