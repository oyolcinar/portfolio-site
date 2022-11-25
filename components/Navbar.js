import styles from '../styles/Navbar.module.css';
import cardStyles from '../styles/Minimize.module.css';
import speaker from '../public/icons/loudspeaker.png';
import offOff from '../public/icons/conn_pcs_off_off.png';
import onOff from '../public/icons/conn_pcs_on_off.png';
import offOn from '../public/icons/conn_pcs_off_on.png';
import onOn from '../public/icons/conn_pcs_on_on.png';
import windows from '../public/icons/windows.png';
import dialUp from '../public/icons/conn_dialup.png';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import SoundControl from './SoundControl';
import Connection from './Connection';
import { useElapsedTime } from 'use-elapsed-time';
import Start from './Start';
import Shutdown from './Shutdown';
import Notepad from './Notepad';
import notepadIcon from '../public/icons/notepadIcon.png';

const Navbar = () => {
  const [isShutdown, setIsShutdown] = useState(false);
  const [isNotepad, setIsNotepad] = useState(false);
  const [sound, setSound] = useState(false);
  const [modem, setModem] = useState(false);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);

  const [doubleClick, setDoubleClick] = useState(false);
  const [currentImage, setCurrentImage] = useState(offOff);

  const [minimizeModem, setMinimizeModem] = useState(false);
  const [minimizeNotepad, setMinimizeNotepad] = useState(false);

  const { elapsedTime } = useElapsedTime({ isPlaying: true });

  const navRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage(random());
    }, 1500);

    return () => clearInterval(intervalId);
  }, []);

  var today = new Date();
  var time =
    today.getHours() +
    ':' +
    ((today.getMinutes() < 10 ? '0' : '') + today.getMinutes());
  var date =
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

  const modemImages = [offOff, onOff, offOn, onOn];

  function random() {
    const random = Math.floor(Math.random() * modemImages.length);
    return modemImages[random];
  }

  function toggleMinimizeNotepad() {
    setMinimizeNotepad(true);
  }

  function toggleMinimize() {
    setMinimizeModem(true);
  }

  function toggleStart() {
    setIsStartOpen((prevState) => !prevState);
    setIsDocumentsOpen(false);
    setIsProgramsOpen(false);
  }

  function shutDownHandler() {
    !isShutdown
      ? setIsShutdown(true)
      : setDoubleClick((prevState) => !prevState);
  }

  return (
    <div className={styles.container}>
      <nav className={styles.navbar} ref={navRef}>
        <ul className={styles.list}>
          <li className={styles.start}>
            <button
              className={styles.item}
              onClick={() => {
                toggleStart();
              }}
            >
              <Image src={windows} height={28} alt='' />
              <div className={styles.text}>Start</div>
            </button>
          </li>
          {minimizeModem || modem ? (
            <div
              className={cardStyles.card}
              onClick={() => {
                setMinimizeModem(false);
                setDoubleClick((prevState) => !prevState);
              }}
            >
              <div className={cardStyles.header}>
                <div className={cardStyles.headerLeft}>
                  <Image
                    src={dialUp}
                    alt=''
                    height={20}
                    className={cardStyles.headerModem}
                  />
                  Connected to Internet Central
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          {minimizeNotepad || isNotepad ? (
            <div
              className={cardStyles.card}
              onClick={() => {
                setMinimizeNotepad(false);
                setDoubleClick((prevState) => !prevState);
              }}
            >
              <div className={cardStyles.header}>
                <div className={cardStyles.headerLeft}>
                  <Image
                    src={notepadIcon}
                    alt=''
                    height={20}
                    className={cardStyles.headerModem}
                  />
                  Notepad
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </ul>
        <div className={styles.taskbar}>
          <Image
            src={currentImage}
            alt=''
            height={24}
            className={styles.modem}
            onClick={() => {
              minimizeModem
                ? setMinimizeModem(false)
                : modem
                ? setDoubleClick((prevState) => !prevState)
                : setModem((prevState) => !prevState);
            }}
          />
          <Image
            src={speaker}
            alt=''
            height={24}
            className={styles.speaker}
            onClick={() => {
              setSound((prevState) => !prevState);
            }}
          />
          <div>{time}</div>
        </div>
      </nav>
      {modem && !minimizeModem && (
        <Connection
          toggleMinimize={toggleMinimize}
          modemState={modem}
          setModemState={setModem}
          doubleClick={doubleClick}
          setDoubleClick={setDoubleClick}
          elapsedTime={elapsedTime}
          setIsStartOpen={setIsStartOpen}
        />
      )}
      {sound && <SoundControl />}
      {isStartOpen && (
        <Start
          setIsStartOpen={setIsStartOpen}
          setIsShutdown={setIsShutdown}
          toggleMinimize={toggleMinimize}
          modem={modem}
          isDocumentsOpen={isDocumentsOpen}
          setIsDocumentsOpen={setIsDocumentsOpen}
          isProgramsOpen={isProgramsOpen}
          setIsProgramsOpen={setIsProgramsOpen}
          setIsNotepad={setIsNotepad}
          setMinimizeNotepad={setMinimizeNotepad}
        />
      )}
      {isShutdown && (
        <Shutdown
          setDoubleClick={setDoubleClick}
          doubleClick={doubleClick}
          isShutdown={isShutdown}
          setIsShutdown={setIsShutdown}
          setIsStartOpen={setIsStartOpen}
        />
      )}
      {isNotepad && !minimizeNotepad && (
        <Notepad
          doubleClick={doubleClick}
          setDoubleClick={setDoubleClick}
          isNotepad={isNotepad}
          setIsNotepad={setIsNotepad}
          toggleMinimizeNotepad={toggleMinimizeNotepad}
          minimizeNotepad={minimizeNotepad}
          navRef={navRef}
        />
      )}
    </div>
  );
};

export default Navbar;
