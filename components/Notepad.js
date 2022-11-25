import Image from 'next/image';
import notepadIcon from '../public/icons/notepadIcon.png';
import styles from '../styles/Card.module.css';
import minimize from '../public/icons/minimize.png';
import maximize from '../public/icons/maximize.png';
import close from '../public/icons/close.png';
import { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { clickOutsideHandler } from '../utils/utils';

const Notepad = ({
  doubleClick,
  setDoubleClick,
  isNotepad,
  setIsNotepad,
  toggleMinimizeNotepad,
  minimizeNotepad,
  navRef,
}) => {
  const [size, resize] = useState({ x: 400, y: 500 });
  const [isFile, setIsFile] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isHelp, setIsHelp] = useState(false);

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
    setDoubleClick((prevState) => !prevState);
  }

  return (
    <Draggable bounds='parent'>
      <div
        className='card'
        onClick={() => {
          setDoubleClick((prevState) => !prevState);
        }}
        ref={notepadRef}
      >
        <style jsx>{`
          .card {
            position: absolute;
            left: calc(50% - 200px);
            top: calc(50% - 250px);
            width: ${size.x}px;
            height: ${size.y}px;
            z-index: 2;
            border-top: 2px solid white;
            border-left: 2px solid white;
            border-right: 2px solid #393939;
            border-bottom: 2px solid #393939;
            border-radius: 0;
            background: #c0c0c0;
          }
        `}</style>
        <div
          className={
            !doubleClick ? styles.header : `${styles.header} ${styles.double}`
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
              />
            </div>
            <div className={styles.close}>
              <Image
                alt=''
                src={close}
                height={21}
                onClick={() => {
                  setIsNotepad(false);
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
      </div>
    </Draggable>
  );
};

export default Notepad;
