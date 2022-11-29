import Image from 'next/image';
import notepadIcon from '../public/icons/notepadIcon.png';
import styles from '../styles/Card.module.css';
import npStyles from '../styles/Notepad.module.css';
import minimize from '../public/icons/minimize.png';
import maximize from '../public/icons/maximize.png';
import close from '../public/icons/close.png';
import { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { clickOutsideHandler } from '../utils/utils';

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
  dragDisabled,
  setDragDisabled,
}) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [isFile, setIsFile] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isHelp, setIsHelp] = useState(false);
  const [inputText, setInputText] = useState('');

  const notepadRef = useRef(null);
  const fileRef = useRef(null);
  const editRef = useRef(null);
  const searchRef = useRef(null);
  const helpRef = useRef(null);

  clickOutsideHandler(notepadRef, minimizeHandler);
  clickOutsideHandler(fileRef);
  clickOutsideHandler(editRef);
  clickOutsideHandler(searchRef);
  clickOutsideHandler(helpRef);

  function minimizeHandler() {
    setDoubleClickNotepad(true);
  }

  function maximizeHandler() {
    setFullScreen((prevState) => !prevState);
  }

  function textHandler(e) {
    setNotepadText(e.target.value);
  }

  return (
    <Draggable bounds='parent' disabled={dragDisabled}>
      <div
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
            Notepad
          </div>
          <div className={styles.headerRight}>
            <div>
              <Image
                alt=''
                src={minimize}
                height={20}
                onClick={() => {
                  toggleMinimizeNotepad();
                }}
              />
              <Image
                alt=''
                src={maximize}
                height={20}
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
                height={21}
                onClick={() => {
                  setNotepadText('');
                  setIsNotepad(false);
                  setSize({ w: 400, h: 500 });
                }}
              />
            </div>
          </div>
        </div>
        <ul className={styles.menu}>
          <li ref={fileRef}>
            <span className={styles.underline}>F</span>ile
          </li>
          <li ref={editRef}>
            <span className={styles.underline}>E</span>dit
          </li>
          <li ref={searchRef}>
            <span className={styles.underline}>S</span>earch
          </li>
          <li ref={helpRef}>
            <span className={styles.underline}>H</span>elp
          </li>
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
            startResize(e), setDragDisabled(true);
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
