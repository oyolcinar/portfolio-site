import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useElapsedTime } from 'use-elapsed-time';

import SoundControl from './SoundControl';
import Connection from './Connection';
import Start from './Start';
import Shutdown from './Shutdown';
import ProgramComponent from './ProgramComponent';
import NotepadText from './BodyComponents/NotepadText';
import TrayComponent from './TrayComponent';

import styles from '../styles/Navbar.module.css';

import speaker from '../public/icons/loudspeaker.png';
import offOff from '../public/icons/conn_pcs_off_off.png';
import onOff from '../public/icons/conn_pcs_on_off.png';
import offOn from '../public/icons/conn_pcs_off_on.png';
import onOn from '../public/icons/conn_pcs_on_on.png';
import windows from '../public/icons/windows.png';
import paintIcon from '../public/icons/paint.png';
import notepadIcon from '../public/icons/notepad.png';
import dialUp from '../public/icons/conn_dialup.png';
import explorerIcon from '../public/icons/explorer.png';
import briefcaseIcon from '../public/icons/briefcaseIcon.png';
import outlookIcon from '../public/icons/outlookIcon.png';

const Navbar = () => {
  const [isShutdown, setIsShutdown] = useState(false);
  const [isNotepad, setIsNotepad] = useState(false);
  const [sound, setSound] = useState(false);
  const [modem, setModem] = useState(false);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isPaint, setIsPaint] = useState(false);
  const [isExplorer, setIsExplorer] = useState(false);
  const [isBriefcase, setIsBriefcase] = useState(false);
  const [isOutlook, setIsOutlook] = useState(false);

  const [doubleClickModem, setDoubleClickModem] = useState(false);
  const [doubleClickNotepad, setDoubleClickNotepad] = useState(false);
  const [doubleClickShutdown, setDoubleClickShutdown] = useState(false);
  const [doubleClickPaint, setDoubleClickPaint] = useState(false);
  const [doubleClickExplorer, setDoubleClickExplorer] = useState(false);
  const [doubleClickBriefcase, setDoubleClickBriefcase] = useState(false);
  const [doubleClickOutlook, setDoubleClickOutlook] = useState(false);
  const [currentImage, setCurrentImage] = useState(offOff);
  const [isResizing, setIsResizing] = useState(false);

  const [notepadSize, setNotepadSize] = useState({ w: 400, h: 500 });
  const [paintSize, setPaintSize] = useState({ w: 400, h: 500 });
  const [explorerSize, setExplorerSize] = useState({ w: 400, h: 500 });
  const [briefcaseSize, setBriefcaseSize] = useState({ w: 400, h: 500 });
  const [outlookSize, setOutlookSize] = useState({ w: 400, h: 500 });
  const [draggableDisabled, setDraggableDisabled] = useState(false);

  const [notepadText, setNotepadText] = useState('');

  const [minimizeModem, setMinimizeModem] = useState(false);
  const [minimizeNotepad, setMinimizeNotepad] = useState(false);
  const [minimizePaint, setMinimizePaint] = useState(false);
  const [minimizeExplorer, setMinimizeExplorer] = useState(false);
  const [minimizeBriefcase, setMinimizeBriefcase] = useState(false);
  const [minimizeOutlook, setMinimizeOutlook] = useState(false);

  const [orderArray, setOrderArray] = useState([]);
  const [active, setActive] = useState('');

  const { elapsedTime } = useElapsedTime({ isPlaying: true });

  const startButtonRef = useRef(null);
  const soundControlRef = useRef(null);

  useEffect(() => {
    function random() {
      const modemImages = [offOff, onOff, offOn, onOn];
      const random = Math.floor(Math.random() * modemImages.length);
      return modemImages[random];
    }
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

  function resizeFrameModeHandler(e) {
    if (active === 'notepad') {
      resizeFrame(e, notepadSize, setNotepadSize);
    }
    if (active === 'paint') {
      resizeFrame(e, paintSize, setPaintSize);
    }
    if (active === 'explorer') {
      resizeFrame(e, explorerSize, setExplorerSize);
    }
    if (active === 'briefcase') {
      resizeFrame(e, briefcaseSize, setBriefcaseSize);
    }
    if (active === 'outlook') {
      resizeFrame(e, outlookSize, setOutlookSize);
    }
  }

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

  function textHandler(e) {
    setNotepadText(e.target.value);
  }

  function toggleMinimizeExplorer() {
    setMinimizeExplorer(true);
  }

  function toggleMinimizeNotepad() {
    setMinimizeNotepad(true);
  }

  function toggleMinimizePaint() {
    setMinimizePaint(true);
  }

  function toggleMinimizeBriefcase() {
    setMinimizeBriefcase(true);
  }

  function toggleMinimizeOutlook() {
    setMinimizeOutlook(true);
  }

  function toggleMinimize() {
    setMinimizeModem(true);
  }

  function toggleStart() {
    setIsStartOpen((prevState) => !prevState);
    setIsDocumentsOpen(false);
    setIsProgramsOpen(false);
  }

  function orderArrayHandler(name) {
    if (orderArray.includes(name)) {
      const filteredArray = orderArray.filter((item) => item !== name);
      setOrderArray(filteredArray);
    } else {
      setOrderArray((prevState) => [...prevState, name]);
    }
  }

  function indexOfOrderArrayElement(name) {
    return orderArray.indexOf(name) + 1;
  }

  const trayElements = orderArray.map((item) => {
    if (item === 'modem') {
      return (
        <div key={item}>
          {minimizeModem || modem ? (
            <TrayComponent
              setMinimize={setMinimizeModem}
              setDoubleClick={setDoubleClickModem}
              setActive={setActive}
              name={'modem'}
              title={'Connected to Internet Central'}
              icon={dialUp}
            />
          ) : (
            ''
          )}
        </div>
      );
    }

    if (item === 'notepad') {
      return (
        <div key={item}>
          {minimizeNotepad || isNotepad ? (
            <TrayComponent
              setMinimize={setMinimizeNotepad}
              setDoubleClick={setDoubleClickNotepad}
              setActive={setActive}
              name={'notepad'}
              title={'Notepad'}
              icon={notepadIcon}
            />
          ) : (
            ''
          )}
        </div>
      );
    }
    if (item === 'paint') {
      return (
        <div key={item}>
          {minimizePaint || isPaint ? (
            <TrayComponent
              setMinimize={setMinimizePaint}
              setDoubleClick={setDoubleClickPaint}
              setActive={setActive}
              name={'paint'}
              title={'Paint'}
              icon={paintIcon}
            />
          ) : (
            ''
          )}
        </div>
      );
    }
    if (item === 'explorer') {
      return (
        <div key={item}>
          {minimizeExplorer || isExplorer ? (
            <TrayComponent
              setMinimize={setMinimizeExplorer}
              setDoubleClick={setDoubleClickExplorer}
              setActive={setActive}
              name={'explorer'}
              title={'Explorer'}
              icon={explorerIcon}
            />
          ) : (
            ''
          )}
        </div>
      );
    }
    if (item === 'briefcase') {
      return (
        <div key={item}>
          {minimizeBriefcase || isBriefcase ? (
            <TrayComponent
              setMinimize={setMinimizeBriefcase}
              setDoubleClick={setDoubleClickBriefcase}
              setActive={setActive}
              name={'briefcase'}
              title={'Briefcase'}
              icon={briefcaseIcon}
            />
          ) : (
            ''
          )}
        </div>
      );
    }
    if (item === 'outlook') {
      return (
        <div key={item}>
          {minimizeOutlook || isOutlook ? (
            <TrayComponent
              setMinimize={setMinimizeOutlook}
              setDoubleClick={setDoubleClickOutlook}
              setActive={setActive}
              name={'outlook'}
              title={'Outlook'}
              icon={outlookIcon}
            />
          ) : (
            ''
          )}
        </div>
      );
    }
  });

  return (
    <div
      className={styles.container}
      onMouseMove={(e) => {
        resizeFrameModeHandler(e);
      }}
      onMouseUp={(e) => {
        stopResize(e);
      }}
    >
      <nav className={styles.navbar}>
        <ul className={styles.list}>
          <li className={styles.start}>
            <button
              className={styles.item}
              onClick={() => {
                toggleStart();
              }}
              ref={startButtonRef}
            >
              <Image src={windows} height={28} alt='' />
              <div className={styles.text}>Start</div>
            </button>
          </li>
          {trayElements}
        </ul>
        <div className={styles.taskbar}>
          <Image
            src={currentImage}
            alt=''
            height={24}
            className={styles.modem}
            onClick={() => {
              !modem ? orderArrayHandler('modem') : '';
              setActive('modem');
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
            ref={soundControlRef}
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
          orderArray={orderArray}
          orderArrayHandler={orderArrayHandler}
          indexOfOrderArrayElement={indexOfOrderArrayElement}
          active={active}
          setActive={setActive}
        />
      )}
      {sound && (
        <SoundControl setSound={setSound} soundControlRef={soundControlRef} />
      )}
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
          orderArrayHandler={orderArrayHandler}
          isNotepad={isNotepad}
          startButtonRef={startButtonRef}
          setActive={setActive}
          isPaint={isPaint}
          setIsPaint={setIsPaint}
          setMinimizePaint={setMinimizePaint}
          isExplorer={isExplorer}
          setIsExplorer={setIsExplorer}
          setMinimizeExplorer={setMinimizeExplorer}
          isBriefcase={isBriefcase}
          setIsBriefcase={setIsBriefcase}
          setMinimizeBriefcase={setMinimizeBriefcase}
          isOutlook={isOutlook}
          setIsOutlook={setIsOutlook}
          setMinimizeOutlook={setMinimizeOutlook}
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
        <ProgramComponent
          doubleClickProgram={doubleClickNotepad}
          setDoubleClickProgram={setDoubleClickNotepad}
          isProgram={isNotepad}
          setIsProgram={setIsNotepad}
          toggleMinimizeProgram={toggleMinimizeNotepad}
          minimizeProgram={minimizeNotepad}
          notepadText={notepadText}
          setNotepadText={setNotepadText}
          size={notepadSize}
          setSize={setNotepadSize}
          startResize={startResize}
          draggableDisabled={draggableDisabled}
          setIsResizing={setIsResizing}
          orderArray={orderArray}
          orderArrayHandler={orderArrayHandler}
          indexOfOrderArrayElement={indexOfOrderArrayElement}
          active={active}
          setActive={setActive}
          name={'notepad'}
          title={'Notepad'}
          programIcon={notepadIcon}
        >
          <NotepadText notepadText={notepadText} textHandler={textHandler} />
        </ProgramComponent>
      )}
      {isPaint && !minimizePaint && (
        <ProgramComponent
          doubleClickProgram={doubleClickPaint}
          setDoubleClickProgram={setDoubleClickPaint}
          isProgram={isPaint}
          setIsProgram={setIsPaint}
          toggleMinimizeProgram={toggleMinimizePaint}
          minimizeProgram={minimizePaint}
          size={paintSize}
          setSize={setPaintSize}
          startResize={startResize}
          draggableDisabled={draggableDisabled}
          setIsResizing={setIsResizing}
          orderArray={orderArray}
          orderArrayHandler={orderArrayHandler}
          indexOfOrderArrayElement={indexOfOrderArrayElement}
          active={active}
          setActive={setActive}
          name={'paint'}
          title={'MS Paint'}
          programIcon={paintIcon}
        />
      )}
      {isExplorer && !minimizeExplorer && (
        <ProgramComponent
          doubleClickProgram={doubleClickExplorer}
          setDoubleClickProgram={setDoubleClickExplorer}
          isProgram={isExplorer}
          setIsProgram={setIsExplorer}
          toggleMinimizeProgram={toggleMinimizeExplorer}
          minimizeProgram={minimizeExplorer}
          size={explorerSize}
          setSize={setExplorerSize}
          startResize={startResize}
          draggableDisabled={draggableDisabled}
          setIsResizing={setIsResizing}
          orderArray={orderArray}
          orderArrayHandler={orderArrayHandler}
          indexOfOrderArrayElement={indexOfOrderArrayElement}
          active={active}
          setActive={setActive}
          name={'explorer'}
          title={'Explorer'}
          programIcon={explorerIcon}
        />
      )}
      {isBriefcase && !minimizeBriefcase && (
        <ProgramComponent
          doubleClickProgram={doubleClickBriefcase}
          setDoubleClickProgram={setDoubleClickBriefcase}
          isProgram={isBriefcase}
          setIsProgram={setIsBriefcase}
          toggleMinimizeProgram={toggleMinimizeBriefcase}
          minimizeProgram={minimizeBriefcase}
          size={briefcaseSize}
          setSize={setBriefcaseSize}
          startResize={startResize}
          draggableDisabled={draggableDisabled}
          setIsResizing={setIsResizing}
          orderArray={orderArray}
          orderArrayHandler={orderArrayHandler}
          indexOfOrderArrayElement={indexOfOrderArrayElement}
          active={active}
          setActive={setActive}
          name={'briefcase'}
          title={'Briefcase'}
          programIcon={briefcaseIcon}
        />
      )}
      {isOutlook && !minimizeOutlook && (
        <ProgramComponent
          doubleClickProgram={doubleClickOutlook}
          setDoubleClickProgram={setDoubleClickOutlook}
          isProgram={isOutlook}
          setIsProgram={setIsOutlook}
          toggleMinimizeProgram={toggleMinimizeOutlook}
          minimizeProgram={minimizeOutlook}
          size={outlookSize}
          setSize={setOutlookSize}
          startResize={startResize}
          draggableDisabled={draggableDisabled}
          setIsResizing={setIsResizing}
          orderArray={orderArray}
          orderArrayHandler={orderArrayHandler}
          indexOfOrderArrayElement={indexOfOrderArrayElement}
          active={active}
          setActive={setActive}
          name={'outlook'}
          title={'Outlook'}
          programIcon={outlookIcon}
        />
      )}
    </div>
  );
};

export default Navbar;
