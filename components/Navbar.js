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
import ExplorerBrowser from './BodyComponents/ExplorerBrowser';
import PaintComponent from './BodyComponents/PaintComponent';
import OutlookComponent from './BodyComponents/OutlookComponent';
import DesktopItem from './DesktopItem';

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
import minesweeperIcon from '../public/icons/minesweeper.png';
import briefcase from '../public/icons/briefcase.png';
import shortcut from '../public/icons/shortcut.png';
import explorer from '../public/icons/explorer.png';
import outlook from '../public/icons/outlook.png';
import notepadFile from '../public/icons/notepadFile.png';

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
  const [isMinesweeper, setIsMinesweeper] = useState(false);

  const [doubleClickModem, setDoubleClickModem] = useState(false);
  const [doubleClickNotepad, setDoubleClickNotepad] = useState(false);
  const [doubleClickShutdown, setDoubleClickShutdown] = useState(false);
  const [doubleClickPaint, setDoubleClickPaint] = useState(false);
  const [doubleClickExplorer, setDoubleClickExplorer] = useState(false);
  const [doubleClickBriefcase, setDoubleClickBriefcase] = useState(false);
  const [doubleClickOutlook, setDoubleClickOutlook] = useState(false);
  const [doubleClickMinesweeper, setDoubleClickMinesweeper] = useState(false);
  const [currentImage, setCurrentImage] = useState(offOff);
  const [isResizing, setIsResizing] = useState(false);

  const [notepadSize, setNotepadSize] = useState({ w: 400, h: 500 });
  const [paintSize, setPaintSize] = useState({ w: 600, h: 800 });
  const [explorerSize, setExplorerSize] = useState({ w: 800, h: 600 });
  const [briefcaseSize, setBriefcaseSize] = useState({ w: 800, h: 600 });
  const [outlookSize, setOutlookSize] = useState({ w: 600, h: 400 });
  const [minesweeperSize, setMinesweeperSize] = useState({ w: 400, h: 500 });
  const [draggableDisabled, setDraggableDisabled] = useState(false);

  const [notepadText, setNotepadText] = useState('');
  const [subject, setSubject] = useState('');

  const [minimizeModem, setMinimizeModem] = useState(false);
  const [minimizeNotepad, setMinimizeNotepad] = useState(false);
  const [minimizePaint, setMinimizePaint] = useState(false);
  const [minimizeExplorer, setMinimizeExplorer] = useState(false);
  const [minimizeBriefcase, setMinimizeBriefcase] = useState(false);
  const [minimizeOutlook, setMinimizeOutlook] = useState(false);
  const [minimizeMinesweeper, setMinimizeMinesweeper] = useState(false);

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
    if (active === 'minesweeper') {
      resizeFrame(e, minesweeperSize, setMinesweeperSize);
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

      if (newH < 300) {
        setSize({ w: newW, h: 300 });
      } else if (newW < 300) {
        setSize({ w: 300, h: newH });
      } else if (newH < 300 && newW < 300) {
        setSize({ w: 300, h: 300 });
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

  function briefcaseHandler() {
    !isBriefcase ? orderArrayHandler('briefcase') : '';
    setActive('briefcase');
    setIsProgramsOpen(false);
    setIsStartOpen(false);
    setIsBriefcase(true);
    setMinimizeBriefcase(false);
  }

  function explorerHandler() {
    !isExplorer ? orderArrayHandler('explorer') : '';
    setActive('explorer');
    setIsProgramsOpen(false);
    setIsStartOpen(false);
    setIsExplorer(true);
    setMinimizeExplorer(false);
  }

  function outlookHandler() {
    !isOutlook ? orderArrayHandler('outlook') : '';
    setActive('outlook');
    setIsProgramsOpen(false);
    setIsStartOpen(false);
    setIsOutlook(true);
    setMinimizeOutlook(false);
  }

  function notepadHandler() {
    !isNotepad ? orderArrayHandler('notepad') : '';
    setActive('notepad');
    setIsProgramsOpen(false);
    setIsStartOpen(false);
    setIsNotepad(true);
    setMinimizeNotepad(false);
  }

  function paintHandler() {
    !isNotepad ? orderArrayHandler('paint') : '';
    setActive('paint');
    setIsProgramsOpen(false);
    setIsStartOpen(false);
    setIsPaint(true);
    setMinimizePaint(false);
  }

  function minesweeperHandler() {
    !isNotepad ? orderArrayHandler('minesweeper') : '';
    setActive('minesweeper');
    setIsProgramsOpen(false);
    setIsStartOpen(false);
    setIsMinesweeper(true);
    setMinimizeMinesweeper(false);
  }

  function handleDoubleClick(e, func) {
    if (e.detail === 2) {
      func();
    }
  }

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

  function toggleMinimizeMinesweeper() {
    setMinimizeMinesweeper(true);
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
              active={active}
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
              active={active}
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
              active={active}
              name={'paint'}
              title={'MS Paint'}
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
              active={active}
              name={'explorer'}
              title={'Internet Explorer'}
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
              active={active}
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
              active={active}
              name={'outlook'}
              title={'Outlook'}
              icon={outlookIcon}
              titled={true}
              titleData={subject}
            />
          ) : (
            ''
          )}
        </div>
      );
    }
    if (item === 'minesweeper') {
      return (
        <div key={item}>
          {minimizeMinesweeper || isMinesweeper ? (
            <TrayComponent
              setMinimize={setMinimizeMinesweeper}
              setDoubleClick={setDoubleClickMinesweeper}
              setActive={setActive}
              active={active}
              name={'minesweeper'}
              title={'Minesweeper'}
              icon={minesweeperIcon}
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
      <DesktopItem
        shortcut={shortcut}
        name={'Briefcase'}
        image={briefcase}
        handleDoubleClick={handleDoubleClick}
        handlerFunction={briefcaseHandler}
      />
      <DesktopItem
        shortcut={shortcut}
        name={'Internet Explorer'}
        image={explorer}
        handleDoubleClick={handleDoubleClick}
        handlerFunction={explorerHandler}
      />
      <DesktopItem
        shortcut={shortcut}
        name={'Outlook'}
        image={outlook}
        handleDoubleClick={handleDoubleClick}
        handlerFunction={outlookHandler}
      />
      <DesktopItem
        shortcut={shortcut}
        name={'CV.txt'}
        image={notepadFile}
        handleDoubleClick={handleDoubleClick}
        handlerFunction={notepadHandler}
      />
      <DesktopItem
        shortcut={shortcut}
        name={'Works.txt'}
        image={notepadFile}
        handleDoubleClick={handleDoubleClick}
        handlerFunction={notepadHandler}
      />
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
          startResize={startResize}
          isStartOpen={isStartOpen}
          orderArrayHandler={orderArrayHandler}
          notepadHandler={notepadHandler}
          startButtonRef={startButtonRef}
          setActive={setActive}
          paintHandler={paintHandler}
          explorerHandler={explorerHandler}
          briefcaseHandler={briefcaseHandler}
          outlookHandler={outlookHandler}
          minesweeperHandler={minesweeperHandler}
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
          titled={true}
          programIcon={notepadIcon}
          initialSize={{ w: 400, h: 500 }}
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
          titled={true}
          programIcon={paintIcon}
          initialSize={{ w: 600, h: 800 }}
        >
          <PaintComponent size={paintSize} />
        </ProgramComponent>
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
          title={'Internet Explorer'}
          programIcon={explorerIcon}
          initialSize={{ w: 800, h: 600 }}
        >
          <ExplorerBrowser />
        </ProgramComponent>
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
          initialSize={{ w: 800, h: 600 }}
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
          titled={true}
          programIcon={outlookIcon}
          initialSize={{ w: 600, h: 400 }}
          titleData={subject}
        >
          <OutlookComponent subject={subject} setSubject={setSubject} />
        </ProgramComponent>
      )}
      {isMinesweeper && !minimizeMinesweeper && (
        <ProgramComponent
          doubleClickProgram={doubleClickMinesweeper}
          setDoubleClickProgram={setDoubleClickMinesweeper}
          isProgram={isMinesweeper}
          setIsProgram={setIsMinesweeper}
          toggleMinimizeProgram={toggleMinimizeMinesweeper}
          minimizeProgram={minimizeMinesweeper}
          size={minesweeperSize}
          setSize={setMinesweeperSize}
          startResize={startResize}
          draggableDisabled={draggableDisabled}
          setIsResizing={setIsResizing}
          orderArray={orderArray}
          orderArrayHandler={orderArrayHandler}
          indexOfOrderArrayElement={indexOfOrderArrayElement}
          active={active}
          setActive={setActive}
          name={'minesweeper'}
          title={'Minesweeper'}
          programIcon={minesweeperIcon}
          initialSize={{ w: 400, h: 500 }}
        />
      )}
    </div>
  );
};

export default Navbar;
