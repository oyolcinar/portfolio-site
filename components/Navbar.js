import styles from '../styles/Navbar.module.css';
import speaker from '../public/icons/loudspeaker.png';
import offOff from '../public/icons/conn_pcs_off_off.png';
import onOff from '../public/icons/conn_pcs_on_off.png';
import offOn from '../public/icons/conn_pcs_off_on.png';
import onOn from '../public/icons/conn_pcs_on_on.png';
import windows from '../public/icons/windows.png';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import SoundControl from './SoundControl';
import Connection from './Connection';
import { useElapsedTime } from 'use-elapsed-time';
import Start from './Start';
import Shutdown from './Shutdown';
import Notepad from './Notepad';
import ConnectionTray from './TrayComponents/ConnectionTray';
import NotepadTray from './TrayComponents/NotepadTray';

const Navbar = () => {
  const [isShutdown, setIsShutdown] = useState(false);
  const [isNotepad, setIsNotepad] = useState(false);
  const [sound, setSound] = useState(false);
  const [modem, setModem] = useState(false);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);

  const [doubleClickModem, setDoubleClickModem] = useState(false);
  const [doubleClickNotepad, setDoubleClickNotepad] = useState(false);
  const [doubleClickShutdown, setDoubleClickShutdown] = useState(false);
  const [currentImage, setCurrentImage] = useState(offOff);
  const [isStartClicked, setIsStartClicked] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const [notepadSize, setNotepadSize] = useState({ w: 400, h: 500 });
  const [draggableDisabled, setDraggableDisabled] = useState(false);

  const [notepadText, setNotepadText] = useState('');

  const [minimizeModem, setMinimizeModem] = useState(false);
  const [minimizeNotepad, setMinimizeNotepad] = useState(false);

  const { elapsedTime } = useElapsedTime({ isPlaying: true });

  const navRef = useRef(null);

  useEffect(() => {
    function random() {
      const random = Math.floor(Math.random() * modemImages.length);
      return modemImages[random];
    }
    const intervalId = setInterval(() => {
      setCurrentImage(random());
    }, 1500);

    return () => clearInterval(intervalId);
  });

  var today = new Date();
  var time =
    today.getHours() +
    ':' +
    ((today.getMinutes() < 10 ? '0' : '') + today.getMinutes());
  var date =
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

  const modemImages = [offOff, onOff, offOn, onOn];

  const [drag, setDrag] = useState({
    active: false,
    x: '',
    y: '',
  });

  const startResize = (e) => {
    setDraggableDisabled(true);

    setDrag({
      active: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const resizeFrame = (e, size, setSize) => {
    setDraggableDisabled(true);

    const { active, x, y } = drag;
    if (active) {
      const xDiff = Math.abs(x - e.clientX);
      const yDiff = Math.abs(y - e.clientY);
      const newW = x > e.clientX ? size.w - xDiff : size.w + xDiff;
      const newH = y > e.clientY ? size.h - yDiff : size.h + yDiff;

      setDrag({ ...drag, x: e.clientX, y: e.clientY });

      if (newH < 150) {
        setSize({ w: newW, h: 150 });
      } else if (newW < 270) {
        setSize({ w: 270, h: newH });
      } else if (newH < 150 && newW < 270) {
        setSize({ w: 270, h: 150 });
      } else {
        setSize({ w: newW, h: newH });
      }
    }
  };

  const stopResize = (e) => {
    setDrag({ ...drag, active: false });
    setIsResizing(false);
    setDraggableDisabled(false);
  };

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
      : setDoubleClickShutdown((prevState) => !prevState);
  }

  return (
    <div
      className={styles.container}
      onMouseMove={(e) => {
        resizeFrame(e, notepadSize, setNotepadSize);
      }}
      onMouseUp={(e) => {
        stopResize(e);
      }}
    >
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
            <ConnectionTray
              setMinimizeModem={setMinimizeModem}
              setDoubleClickModem={setDoubleClickModem}
            />
          ) : (
            ''
          )}
          {minimizeNotepad || isNotepad ? (
            <NotepadTray
              setMinimizeNotepad={setMinimizeNotepad}
              setDoubleClickNotepad={setDoubleClickNotepad}
            />
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
                ? setDoubleClickModem((prevState) => !prevState)
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
          doubleClickModem={doubleClickModem}
          setDoubleClickModem={setDoubleClickModem}
          elapsedTime={elapsedTime}
          setIsStartOpen={setIsStartOpen}
        />
      )}
      {sound && <SoundControl setSound={setSound} />}
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
          startResize={startResize}
          isStartOpen={isStartOpen}
        />
      )}
      {isShutdown && (
        <Shutdown
          setDoubleClickShutdown={setDoubleClickShutdown}
          doubleClickShutdown={doubleClickShutdown}
          isShutdown={isShutdown}
          setIsShutdown={setIsShutdown}
          setIsStartOpen={setIsStartOpen}
        />
      )}
      {isNotepad && !minimizeNotepad && (
        <Notepad
          doubleClickNotepad={doubleClickNotepad}
          setDoubleClickNotepad={setDoubleClickNotepad}
          isNotepad={isNotepad}
          setIsNotepad={setIsNotepad}
          toggleMinimizeNotepad={toggleMinimizeNotepad}
          minimizeNotepad={minimizeNotepad}
          notepadText={notepadText}
          setNotepadText={setNotepadText}
          size={notepadSize}
          setSize={setNotepadSize}
          startResize={startResize}
          draggableDisabled={draggableDisabled}
          setIsResizing={setIsResizing}
        />
      )}
    </div>
  );
};

export default Navbar;
