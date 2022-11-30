import Image from 'next/image';
import notepadIcon from '../public/icons/notepadIcon.png';
import styles from '../styles/Card.module.css';
import npStyles from '../styles/Notepad.module.css';
import minimize from '../public/icons/minimize.png';
import maximize from '../public/icons/maximize.png';
import close from '../public/icons/close.png';
import { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { useClickOutsideHandler } from '../utils/utils';

const Notepad = ({
  doubleClickNotepad,
  setDoubleClickNotepad,
  setIsNotepad,
  toggleMinimizeNotepad,
  notepadText,
  setNotepadText,
  size,
  setSize,
  startResize,
  draggableDisabled,
  setIsResizing,
}) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [isFile, setIsFile] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isHelp, setIsHelp] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [inputText, setInputText] = useState('');

  const notepadRef = useRef(null);
  const fileRef = useRef(null);
  const editRef = useRef(null);
  const searchRef = useRef(null);
  const helpRef = useRef(null);
  const menuRef = useRef(null);

  useClickOutsideHandler(notepadRef, minimizeHandler);
  useClickOutsideHandler(menuRef, toggleMenuClickOutside);

  function minimizeHandler() {
    setIsClicked(false);
    setDoubleClickNotepad(true);
  }

  function maximizeHandler() {
    setFullScreen((prevState) => !prevState);
  }

  function textHandler(e) {
    setNotepadText(e.target.value);
  }

  function toggleMenuClickOutside() {
    setIsClicked(false);
    setIsFile(false);
    setIsEdit(false);
    setIsSearch(false);
    setIsHelp(false);
  }

  function toggleFile() {
    setIsFile(true);
    setIsEdit(false);
    setIsSearch(false);
    setIsHelp(false);
  }

  function toggleEdit() {
    setIsEdit(true);
    setIsFile(false);
    setIsSearch(false);
    setIsHelp(false);
  }

  function toggleSearch() {
    setIsSearch(true);
    setIsEdit(false);
    setIsFile(false);
    setIsHelp(false);
  }

  function toggleHelp() {
    setIsHelp(true);
    setIsEdit(false);
    setIsSearch(false);
    setIsFile(false);
  }

  return (
    <Draggable bounds='parent' disabled={draggableDisabled}>
      <div
        ref={notepadRef}
        className={!fullScreen ? 'card' : styles.fullScreen}
        onClick={() => {
          setDoubleClickNotepad(false);
        }}
      >
        <style jsx>{`
          .card {
            position: absolute;
            left: calc(50% - 200px);
            top: calc(50% - 250px);
            width: ${size.w}px;
            height: ${size.h}px;
            z-index: 2;
            border-top: 2px solid white;
            border-left: 2px solid white;
            border-right: 2px solid #393939;
            border-bottom: 2px solid #393939;
            border-radius: 0;
            background-color: #c0c0c0;
          }
        `}</style>
        <div
          className={
            !doubleClickNotepad
              ? styles.header
              : `${styles.header} ${styles.double}`
          }
        >
          <div className={styles.headerLeft}>
            <Image
              src={notepadIcon}
              alt=''
              height={20}
              className={styles.headerModem}
            />
            <div className={styles.title}>Untitled - Notepad</div>
          </div>
          <div className={styles.headerRight}>
            <div>
              <Image
                alt=''
                src={minimize}
                height={22}
                onClick={() => {
                  toggleMinimizeNotepad();
                }}
              />
              <Image
                alt=''
                src={maximize}
                height={22}
                className={styles.maximize}
                onClick={() => {
                  maximizeHandler();
                }}
              />
            </div>
            <div className={styles.close}>
              <Image
                alt=''
                src={close}
                height={23}
                onClick={() => {
                  setNotepadText('');
                  setIsNotepad(false);
                  setSize({ w: 400, h: 500 });
                }}
              />
            </div>
          </div>
        </div>
        <ul className={styles.menu} ref={menuRef}>
          <li
            onClick={() => {
              setIsClicked((prevState) => !prevState);
              toggleFile();
            }}
            onMouseEnter={() => {
              isClicked ? toggleFile() : '';
            }}
          >
            <span className={styles.underline}>F</span>ile
          </li>
          {isFile && isClicked && (
            <ul
              className={`${styles.menuDropdown} ${styles.fileMenu}`}
              ref={fileRef}
            >
              <li className={styles.menuItem}>
                <div className={styles.menuItemCluster}>
                  <span className={styles.underline}>O</span>pen
                </div>
              </li>
              <li className={styles.seperator}></li>
              <li className={styles.menuItem}>
                <div className={styles.menuItemCluster}>
                  <span className={styles.underline}>N</span>ew
                </div>
              </li>
              <li className={styles.menuItem}>
                <div className={styles.menuItemCluster}>
                  <span className={styles.underline}>S</span>ave
                </div>
              </li>
              <li className={styles.menuItem}>
                <div className={styles.menuItemCluster}>
                  <span className={styles.underline}>D</span>elete
                </div>
              </li>
              <li className={styles.seperator}></li>
              <li className={styles.menuItem}>
                <div className={styles.menuItemCluster}>
                  <span className={styles.underline}>C</span>lose
                </div>
              </li>
            </ul>
          )}
          <li
            onClick={() => {
              setIsClicked((prevState) => !prevState);
              toggleEdit();
            }}
            onMouseEnter={() => {
              isClicked ? toggleEdit() : '';
            }}
          >
            <span className={styles.underline}>E</span>dit
          </li>
          {isEdit && isClicked && (
            <ul
              className={`${styles.menuDropdown} ${styles.editMenu}`}
              ref={editRef}
            >
              <li className={styles.menuItem}>
                <div className={styles.menuItemCluster}>
                  <span className={styles.underline}>U</span>ndo
                </div>
              </li>
              <li className={styles.seperator}></li>
              <li className={styles.menuItem}>
                <div className={styles.menuItemCluster}>
                  Cu<span className={styles.underline}>t</span>
                </div>
              </li>
              <li className={styles.menuItem}>
                <div className={styles.menuItemCluster}>
                  <span className={styles.underline}>C</span>opy
                </div>
              </li>
              <li className={styles.menuItem}>
                <div className={styles.menuItemCluster}>
                  <span className={styles.underline}>P</span>aste
                </div>
              </li>
              <li className={styles.menuItem}>
                <div className={styles.menuItemCluster}>
                  Dele<span className={styles.underline}>t</span>e
                </div>
              </li>
              <li className={styles.seperator}></li>
              <li className={styles.menuItem}>
                <div className={styles.menuItemCluster}>
                  Select <span className={styles.underline}>A</span>ll
                </div>
              </li>
            </ul>
          )}
          <li
            onClick={() => {
              setIsClicked((prevState) => !prevState);
              toggleSearch();
            }}
            onMouseEnter={() => {
              isClicked ? toggleSearch() : '';
            }}
          >
            <span className={styles.underline}>S</span>earch
          </li>
          {isSearch && isClicked && (
            <ul
              className={`${styles.menuDropdown} ${styles.searchMenu}`}
              ref={searchRef}
            >
              <li className={styles.menuItem}>
                <div className={styles.menuItemCluster}>
                  <span className={styles.underline}>U</span>ndo
                </div>
              </li>
            </ul>
          )}
          <li
            onClick={() => {
              setIsClicked((prevState) => !prevState);
              toggleHelp();
            }}
            onMouseEnter={() => {
              isClicked ? toggleHelp() : '';
            }}
          >
            <span className={styles.underline}>H</span>elp
          </li>
          {isHelp && isClicked && (
            <ul
              className={`${styles.menuDropdown} ${styles.helpMenu}`}
              ref={helpRef}
            >
              <li className={styles.menuItem}>
                <div className={styles.menuItemCluster}>
                  A<span className={styles.underline}>b</span>out
                </div>
              </li>
            </ul>
          )}
        </ul>
        <div className={npStyles.body}>
          <div className={npStyles.textarea}>
            <textarea
              className={npStyles.input}
              onChange={textHandler}
              value={notepadText}
            ></textarea>
          </div>
        </div>
        <div
          className={npStyles.resizeContainer}
          onMouseDown={(e) => {
            startResize(e);
            setIsResizing(true);
          }}
        >
          <div className={npStyles.large1}></div>
          <div className={npStyles.large2}></div>
          <div className={npStyles.large3}></div>
          <div className={npStyles.medium1}></div>
          <div className={npStyles.medium2}></div>
          <div className={npStyles.medium3}></div>
          <div className={npStyles.small1}></div>
          <div className={npStyles.small2}></div>
          <div className={npStyles.small3}></div>
        </div>
      </div>
    </Draggable>
  );
};

export default Notepad;
