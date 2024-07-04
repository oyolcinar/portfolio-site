import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useElapsedTime } from 'use-elapsed-time';
import { nanoid } from 'nanoid';
import { isSmallScreen } from '../utils/screenSize';

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
import BriefcaseComponent from './BodyComponents/BriefcaseComponent';
import HelpComponent from './BodyComponents/HelpComponent';
import DesktopItem from './DesktopItem';
import DirectoryFile from './BodyComponents/DirectoryFile';
import StartDocumentFile from './StartDocumentFile';
import RecycleComponent from './BodyComponents/RecycleComponent';
import WorksComponent from './BodyComponents/WorksComponent';

import aboutText from '../utils/aboutText';

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
import helpIcon from '../public/icons/helpIcon.png';
import notepadFileIcon from '../public/icons/notepadFileIcon.png';
import paintFileIcon from '../public/icons/paintIcon.png';
import recycleIconEmpty from '../public/icons/recycleIconEmpty.png';
import recycleIconFull from '../public/icons/recycleIconFull.png';
import recycleFull from '../public/icons/recycleFull.png';
import recycleEmpty from '../public/icons/recycleEmpty.png';
import explorerPage from '../public/icons/html.png';
import directory from '../public/icons/directory.png';
import directoryIcon from '../public/icons/directoryIcon.png';

const Navbar = () => {
  const defaultSizes = {
    notepad: { w: 400, h: 500 },
    paint: { w: 800, h: 600 },
    explorer: { w: 800, h: 600 },
    briefcase: { w: 800, h: 600 },
    works: { w: 800, h: 600 },
    outlook: { w: 600, h: 400 },
    minesweeper: { w: 400, h: 500 },
    help: { w: 400, h: 350 },
    recycle: { w: 400, h: 300 },
  };

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
  const [isHelp, setIsHelp] = useState(false);
  const [isRecycleBin, setIsRecycleBin] = useState(false);
  const [isDirectory, setIsDirectory] = useState(false);
  const [isWorks, setIsWorks] = useState(false);

  const [doubleClickModem, setDoubleClickModem] = useState(false);
  const [doubleClickNotepad, setDoubleClickNotepad] = useState(false);
  const [doubleClickShutdown, setDoubleClickShutdown] = useState(false);
  const [doubleClickPaint, setDoubleClickPaint] = useState(false);
  const [doubleClickExplorer, setDoubleClickExplorer] = useState(false);
  const [doubleClickBriefcase, setDoubleClickBriefcase] = useState(false);
  const [doubleClickOutlook, setDoubleClickOutlook] = useState(false);
  const [doubleClickMinesweeper, setDoubleClickMinesweeper] = useState(false);
  const [doubleClickHelp, setDoubleClickHelp] = useState(false);
  const [doubleClickRecycleBin, setDoubleClickRecycleBin] = useState(false);
  const [doubleClickWorks, setDoubleClickWorks] = useState(false);
  const [currentImage, setCurrentImage] = useState(offOff);
  const [isResizing, setIsResizing] = useState(false);

  const [notepadSize, setNotepadSize] = useState(defaultSizes.notepad);
  const [paintSize, setPaintSize] = useState(defaultSizes.paint);
  const [explorerSize, setExplorerSize] = useState(defaultSizes.explorer);
  const [briefcaseSize, setBriefcaseSize] = useState(defaultSizes.briefcase);
  const [worksSize, setWorksSize] = useState(defaultSizes.works);
  const [outlookSize, setOutlookSize] = useState(defaultSizes.outlook);
  const [minesweeperSize, setMinesweeperSize] = useState(
    defaultSizes.minesweeper,
  );
  const [helpSize, setHelpSize] = useState(defaultSizes.help);
  const [recycleSize, setRecycleSize] = useState(defaultSizes.recycle);
  const [draggableDisabled, setDraggableDisabled] = useState(false);

  const [notepadText, setNotepadText] = useState('');
  const [subject, setSubject] = useState('');
  const [items, setItems] = useState([]);
  const [recycleItems, setRecycleItems] = useState([]);
  const [notepadTitle, setNotepadTitle] = useState('');
  const [paintTitle, setPaintTitle] = useState('');
  const [explorerTitle, setExplorerTitle] = useState('');
  const [saveNameSameNotepad, setSaveNameSameNotepad] = useState(false);
  const [saveNameSamePaint, setSaveNameSamePaint] = useState(false);
  const [browserData, setBrowserData] = useState('https://www.wikipedia.org/');
  const [fileId, setFileId] = useState('');
  const [triggerGo, setTriggerGo] = useState(false);

  const [minimizeModem, setMinimizeModem] = useState(false);
  const [minimizeNotepad, setMinimizeNotepad] = useState(false);
  const [minimizePaint, setMinimizePaint] = useState(false);
  const [minimizeExplorer, setMinimizeExplorer] = useState(false);
  const [minimizeBriefcase, setMinimizeBriefcase] = useState(false);
  const [minimizeOutlook, setMinimizeOutlook] = useState(false);
  const [minimizeHelp, setMinimizeHelp] = useState(false);
  const [minimizeMinesweeper, setMinimizeMinesweeper] = useState(false);
  const [minimizeRecycleBin, setMinimizeRecycleBin] = useState(false);
  const [minimizeWorks, setMinimizeWorks] = useState(false);

  const [orderArray, setOrderArray] = useState([]);
  const [active, setActive] = useState('');

  const updateSizes = () => {
    const factor = isSmallScreen() ? 0.6 : 1;
    const factorWidth = isSmallScreen() ? 0.4 : 1;
    setNotepadSize({
      w: defaultSizes.notepad.w * factor,
      h: defaultSizes.notepad.h * factor,
    });
    setPaintSize({
      w: defaultSizes.paint.w * factorWidth,
      h: defaultSizes.paint.h * factor,
    });
    setExplorerSize({
      w: defaultSizes.explorer.w * factorWidth,
      h: defaultSizes.explorer.h * factor,
    });
    setBriefcaseSize({
      w: defaultSizes.briefcase.w * factorWidth,
      h: defaultSizes.briefcase.h * factor,
    });
    setWorksSize({
      w: defaultSizes.works.w * factorWidth,
      h: defaultSizes.works.h * factor,
    });
    setOutlookSize({
      w: defaultSizes.outlook.w * factorWidth,
      h: defaultSizes.outlook.h * factor,
    });
    setMinesweeperSize({
      w: defaultSizes.minesweeper.w * factor,
      h: defaultSizes.minesweeper.h * factor,
    });
    setHelpSize({
      w: defaultSizes.help.w * factor,
      h: defaultSizes.help.h * factor,
    });
    setRecycleSize({
      w: defaultSizes.recycle.w * factorWidth,
      h: defaultSizes.recycle.h * factor,
    });
  };

  useEffect(() => {
    updateSizes();
    window.addEventListener('resize', updateSizes);

    return () => {
      window.removeEventListener('resize', updateSizes);
    };
  }, []);

  const { elapsedTime } = useElapsedTime({ isPlaying: true });

  const startButtonRef = useRef(null);
  const soundControlRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      setItems(items);
    }
  }, []);

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
    if (active === 'help') {
      resizeFrame(e, helpSize, setHelpSize);
    }
    if (active === 'recycle') {
      resizeFrame(e, recycleSize, setRecycleSize);
    }
    if (active === 'works') {
      resizeFrame(e, worksSize, setWorksSize);
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

  function saveHandler(filename, filetype, data, directory, program) {
    if (filetype === '.txt' && filename === 'Works') {
      setSaveNameSameNotepad(true);
      return;
    } else {
      const findFile = items.find((item) => {
        if (
          item.name === filename &&
          item.type === filetype &&
          item.directory === directory
        ) {
          setFileId(item.id);
          return item;
        }
      });

      if (!findFile) {
        const newFile = {
          id: nanoid(),
          name: filename,
          type: filetype,
          data: data,
          directory: directory,
          program: program,
        };
        program === 'notepad'
          ? setSaveNameSameNotepad(false)
          : setSaveNameSamePaint(false);
        setFileId(newFile.id);

        setItems([...items, newFile]);
      } else {
        if (program === 'notepad') {
          setSaveNameSameNotepad(true);
        } else {
          setSaveNameSamePaint(true);
        }
      }
    }
  }

  function deleteHandler() {
    if (!fileId) {
      return;
    } else {
      const recycledItems = items.filter((item) => {
        if (item.id === fileId) {
          return item;
        }
      });
      setRecycleItems([...recycledItems]);

      const newItems = items.filter((item) => {
        if (item.id !== fileId) {
          return item;
        }
      });
      setItems([...newItems]);
    }
  }

  function emptyBinHandler() {
    setRecycleItems([]);
  }

  function restoreHandler() {
    setItems((prevState) => [...prevState, ...recycleItems]);
    setRecycleItems([]);
  }

  function overwriteHandler() {
    const newItems = items.map((item) => {
      if (item.id === fileId) {
        return {
          ...item,
          data: notepadText,
        };
      }
    });
    setItems([...newItems]);
  }

  function openHandler() {
    if (fileId === 'aboutDesktop') {
      setNotepadTitle('About.txt');
      notepadHandler('aboutDesktop', aboutText, 'About.txt');
      return;
    }

    if (fileId === 'worksDesktop') {
      worksHandler();
      return;
    }

    const openFile = items.find((item) => {
      if (item.id === fileId) {
        return item;
      }
    });

    if (openFile.program === 'notepad') {
      setNotepadTitle(openFile.name);
      notepadHandler(openFile.id, openFile.data, openFile.title);
    } else {
      setPaintTitle(openFile.name);
      paintHandler(openFile.id);
    }
  }

  function newFileHandler() {
    if (active === 'notepad') {
      setNotepadTitle('');
      setNotepadText('');
    }
    if (active === 'paint') {
      setPaintTitle('');
    }
    if (active === 'explorer') {
      setBrowserData('https://www.wikipedia.org/');
    }
    if (active === 'outlook') {
      setSubject('');
    }
  }

  function briefcaseHandler() {
    !isBriefcase ? orderArrayHandler('briefcase') : '';
    setActive('briefcase');
    setIsProgramsOpen(false);
    setIsStartOpen(false);
    setIsBriefcase(true);
    setMinimizeBriefcase(false);
  }

  function worksHandler() {
    !isWorks ? orderArrayHandler('works') : '';
    setActive('works');
    setIsProgramsOpen(false);
    setIsStartOpen(false);
    setIsWorks(true);
    setMinimizeWorks(false);
  }

  function explorerHandler(title, url) {
    !isExplorer ? orderArrayHandler('explorer') : '';
    title ? setExplorerTitle(title) : setExplorerTitle('Internet Explorer');
    if (url) {
      setBrowserData(url);
      setTriggerGo(true);
    }
    setActive('explorer');
    setIsExplorer(true);
    setIsProgramsOpen(false);
    setIsStartOpen(false);
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

  function notepadHandler(id, data, title) {
    !isNotepad ? orderArrayHandler('notepad') : '';
    data ? setNotepadText(data) : '';
    title ? setNotepadTitle(title) : '';
    setFileId(id);
    setActive('notepad');
    setIsProgramsOpen(false);
    setIsStartOpen(false);
    setIsNotepad(true);
    setMinimizeNotepad(false);
  }

  function paintHandler(id) {
    !isPaint ? orderArrayHandler('paint') : '';
    setFileId(id);
    setActive('paint');
    setIsProgramsOpen(false);
    setIsStartOpen(false);
    setIsPaint(true);
    setMinimizePaint(false);
  }

  function minesweeperHandler() {
    !isMinesweeper ? orderArrayHandler('minesweeper') : '';
    setActive('minesweeper');
    setIsProgramsOpen(false);
    setIsStartOpen(false);
    setIsMinesweeper(true);
    setMinimizeMinesweeper(false);
  }

  function helpHandler() {
    !isHelp ? orderArrayHandler('help') : '';
    setActive('help');
    setIsProgramsOpen(false);
    setIsStartOpen(false);
    setIsHelp(true);
    setMinimizeHelp(false);
  }

  function recycleHandler() {
    !isRecycleBin ? orderArrayHandler('recycle') : '';
    setActive('recycle');
    setIsProgramsOpen(false);
    setIsStartOpen(false);
    setIsRecycleBin(true);
    setMinimizeRecycleBin(false);
  }

  // function handleDoubleClick(e, func, id, data, title) {
  //   if (e.detail === 2) {
  //     func(id, data, title);
  //   }
  // }

  function handleDoubleClick(e, func, id, data, title) {
    if (e.type === 'click' && e.detail === 2) {
      func(id, data, title);
    } else if (e.type === 'touchend' && e.detail === 0) {
      func(id, data, title);
    }
  }

  function handleDoubleClickLink(e, func) {
    if (e.detail === 2) {
      func(e);
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

  function toggleMinimizeHelp() {
    setMinimizeHelp(true);
  }

  function toggleMinimizeRecycle() {
    setMinimizeRecycleBin(true);
  }

  function toggleMinimizeWorks() {
    setMinimizeWorks(true);
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

  const desktopPermanentItems = [
    <DirectoryFile
      name={'About.txt'}
      image={notepadFileIcon}
      handleDoubleClick={handleDoubleClick}
      handlerFunction={notepadHandler}
      setIsDirectory={setIsDirectory}
      key={'aboutDesktop'}
      setTitle={setNotepadTitle}
      setData={setNotepadText}
      type={'.txt'}
      program={'notepad'}
      data={aboutText}
      id={'aboutDesktop'}
      directory={'desktop'}
      setFileId={setFileId}
    />,
    <DirectoryFile
      name={'Works'}
      image={directoryIcon}
      handleDoubleClick={handleDoubleClick}
      handlerFunction={worksHandler}
      setIsDirectory={setIsDirectory}
      key={'worksDesktop'}
      id={'worksDesktop'}
      type={true}
      directory={'desktop'}
      setFileId={setFileId}
    />,
  ];

  const worksPermanentItems = [
    <DesktopItem
      name={'SNOB'}
      worksFile={true}
      image={explorerPage}
      shortcut={shortcut}
      setTitle={setExplorerTitle}
      key={'snob'}
      id={'SNOB'}
      handleDoubleClick={handleDoubleClick}
      handlerFunction={() =>
        explorerHandler('SNOB', 'https://curious-squirrel-791794.netlify.app')
      }
    />,
    <DesktopItem
      name={'Baziszt'}
      worksFile={true}
      image={explorerPage}
      shortcut={shortcut}
      setTitle={setExplorerTitle}
      key={'snob'}
      id={'SNOB'}
      handleDoubleClick={handleDoubleClick}
      handlerFunction={() =>
        explorerHandler(
          'Baziszt',
          'https://jovial-starburst-545a45.netlify.app',
        )
      }
    />,
  ];

  const documentPermanentItems = [
    <StartDocumentFile
      name={'About.txt'}
      image={notepadFile}
      handlerFunction={notepadHandler}
      setIsDirectory={setIsDirectory}
      setFileId={setFileId}
      key={'aboutDesktop'}
      setTitle={setNotepadTitle}
      setData={setNotepadText}
      type={'.txt'}
      program={'notepad'}
      data={aboutText}
      id={'aboutDesktop'}
    />,
    <StartDocumentFile
      name={'Works'}
      image={directory}
      handlerFunction={worksHandler}
      setIsDirectory={setIsDirectory}
      setFileId={setFileId}
      key={'worksDesktop'}
      id={'worksDesktop'}
    />,
  ];

  function checkFiles(type, directory) {
    const files = items.map((item) => {
      if (item.type === type && item.directory === directory) {
        return (
          <DirectoryFile
            type={item.type}
            data={item.data}
            key={item.id}
            id={item.id}
            name={item.name + item.type}
            image={item.program === 'notepad' ? notepadFileIcon : paintFileIcon}
            handleDoubleClick={handleDoubleClick}
            handlerFunction={
              item.program === 'notepad' ? notepadHandler : paintHandler
            }
            setIsDirectory={setIsDirectory}
            setTitle={
              item.program === 'notepad' ? setNotepadTitle : setPaintTitle
            }
            setData={item.program === 'notepad' ? setNotepadText : ''}
            directory={item.directory}
            program={item.program}
            setFileId={setFileId}
          />
        );
      }
    });
    return files;
  }

  const briefCaseFiles = items.map((item) => {
    if (item.directory === 'briefcase') {
      return (
        <DirectoryFile
          type={item.type}
          data={item.data}
          key={item.id}
          id={item.id}
          name={item.name + item.type}
          image={item.program === 'notepad' ? notepadFileIcon : paintIcon}
          handleDoubleClick={handleDoubleClick}
          handlerFunction={
            item.program === 'notepad' ? notepadHandler : paintHandler
          }
          setIsDirectory={setIsDirectory}
          setTitle={
            item.program === 'notepad' ? setNotepadTitle : setPaintTitle
          }
          setData={item.program === 'notepad' ? setNotepadText : ''}
          directory={item.directory}
          setFileId={setFileId}
          program={item.program}
        />
      );
    }
  });

  const documentsFiles = items.map((item) => {
    if (item.directory === 'briefcase') {
      return (
        <StartDocumentFile
          type={item.type}
          data={item.data}
          key={item.id}
          id={item.id}
          name={item.name + item.type}
          image={item.program === 'notepad' ? notepadFile : paintIcon}
          handlerFunction={
            item.program === 'notepad' ? notepadHandler : paintHandler
          }
          setIsDirectory={setIsDirectory}
          setTitle={
            item.program === 'notepad' ? setNotepadTitle : setPaintTitle
          }
          setData={item.program === 'notepad' ? setNotepadText : ''}
          directory={item.directory}
          setFileId={setFileId}
          program={item.program}
        />
      );
    }
  });

  const desktopFilesForMenu = items.map((item) => {
    return (
      <DirectoryFile
        key={item.id}
        id={item.id}
        name={item.name + item.type}
        image={item.program === 'notepad' ? notepadFile : paintIcon}
        handleDoubleClick={handleDoubleClick}
        handlerFunction={
          item.program === 'notepad' ? notepadHandler : paintHandler
        }
        type={item.type}
        data={item.data}
        setTitle={item.program === 'notepad' ? setNotepadTitle : setPaintTitle}
        setIsDirectory={setIsDirectory}
        setData={item.program === 'notepad' ? setNotepadText : ''}
        directory={item.directory}
        setFileId={setFileId}
        program={item.program}
      />
    );
  });

  const recycleBinItems = recycleItems.map((item) => {
    return (
      <DirectoryFile
        key={item.id}
        id={item.id}
        name={item.name + item.type}
        image={item.program === 'notepad' ? notepadFile : paintIcon}
        handleDoubleClick={handleDoubleClick}
        handlerFunction={
          item.program === 'notepad' ? notepadHandler : paintHandler
        }
        type={item.type}
        data={item.data}
        setTitle={item.program === 'notepad' ? setNotepadTitle : setPaintTitle}
        setIsDirectory={setIsDirectory}
        setData={item.program === 'notepad' ? setNotepadText : ''}
        directory={item.directory}
        setFileId={setFileId}
        program={item.program}
      />
    );
  });

  const desktopFiles = items.map((item) => {
    if (item.directory === 'desktop') {
      return (
        <DesktopItem
          id={item.id}
          type={item.type}
          shortcut={shortcut}
          name={item.name + item.type}
          image={item.program === 'notepad' ? notepadFile : paintIcon}
          handleDoubleClick={handleDoubleClick}
          handlerFunction={
            item.program === 'notepad' ? notepadHandler : paintHandler
          }
          setTitle={
            item.program === 'notepad' ? setNotepadTitle : setPaintTitle
          }
          setData={item.program === 'notepad' ? setNotepadText : ''}
          data={item.data}
          key={item.id}
          directory={item.directory}
          setFileId={setFileId}
          program={item.program}
        />
      );
    }
  });

  const trayElements = orderArray.map((item) => {
    if (item === 'modem') {
      return (
        <div key={item}>
          {minimizeModem || modem ? (
            <TrayComponent
              minimize={minimizeModem}
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
              minimize={minimizeNotepad}
              setMinimize={setMinimizeNotepad}
              setDoubleClick={setDoubleClickNotepad}
              setActive={setActive}
              active={active}
              name={'notepad'}
              title={'Notepad'}
              icon={notepadIcon}
              titled={true}
              titleData={notepadTitle}
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
              minimize={minimizePaint}
              setMinimize={setMinimizePaint}
              setDoubleClick={setDoubleClickPaint}
              setActive={setActive}
              active={active}
              name={'paint'}
              title={'MS Paint'}
              icon={paintIcon}
              titled={true}
              titleData={paintTitle}
            />
          ) : (
            ''
          )}
        </div>
      );
    }
    if (item === 'help') {
      return (
        <div key={item}>
          {minimizeHelp || isHelp ? (
            <TrayComponent
              minimize={minimizeHelp}
              setMinimize={setMinimizeHelp}
              setDoubleClick={setDoubleClickHelp}
              setActive={setActive}
              active={active}
              name={'help'}
              title={'Help'}
              icon={helpIcon}
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
              minimize={minimizeExplorer}
              setMinimize={setMinimizeExplorer}
              setDoubleClick={setDoubleClickExplorer}
              setActive={setActive}
              active={active}
              name={'explorer'}
              title={explorerTitle}
              icon={
                explorerTitle === 'Internet Explorer'
                  ? explorerIcon
                  : explorerPage
              }
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
              minimize={minimizeBriefcase}
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
              minimize={minimizeOutlook}
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
              minimize={minimizeMinesweeper}
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
    if (item === 'recycle') {
      return (
        <div key={item}>
          {minimizeRecycleBin || isRecycleBin ? (
            <TrayComponent
              minimize={minimizeRecycleBin}
              setMinimize={setMinimizeRecycleBin}
              setDoubleClick={setDoubleClickRecycleBin}
              setActive={setActive}
              active={active}
              name={'recycle'}
              title={'Recycle Bin'}
              icon={recycleItems[0] ? recycleIconFull : recycleIconEmpty}
            />
          ) : (
            ''
          )}
        </div>
      );
    }
    if (item === 'works') {
      return (
        <div key={item}>
          {minimizeWorks || isWorks ? (
            <TrayComponent
              minimize={minimizeWorks}
              setMinimize={setMinimizeWorks}
              setDoubleClick={setDoubleClickWorks}
              setActive={setActive}
              active={active}
              name={'works'}
              title={'Works'}
              icon={directoryIcon}
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
        name={'Recycle Bin'}
        image={recycleItems[0] ? recycleFull : recycleEmpty}
        handleDoubleClick={handleDoubleClick}
        handlerFunction={recycleHandler}
      />
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
        name={'About.txt'}
        image={notepadFile}
        handleDoubleClick={handleDoubleClick}
        handlerFunction={notepadHandler}
        setTitle={setNotepadTitle}
        setData={setNotepadText}
        data={aboutText}
        key={'aboutDesktop'}
        id={'aboutDesktop'}
      />
      <DesktopItem
        shortcut={shortcut}
        name={'Works'}
        image={directory}
        handleDoubleClick={handleDoubleClick}
        handlerFunction={worksHandler}
      />
      <DesktopItem
        shortcut={shortcut}
        name={'LinkedIn'}
        image={explorerPage}
        key={'linkedIn'}
        id={'LinkedIn'}
        handleDoubleClick={handleDoubleClickLink}
        link={'http://www.linkedin.com/in/olgun-yolcinar'}
      />
      <DesktopItem
        shortcut={shortcut}
        name={'Github'}
        image={explorerPage}
        key={'github'}
        id={'Github'}
        handleDoubleClick={handleDoubleClickLink}
        link={'https://github.com/oyolcinar'}
      />
      <DesktopItem
        shortcut={shortcut}
        name={'Resume LAST(1).pdf'}
        image={explorerPage}
        setTitle={setExplorerTitle}
        id={'Resume LAST(1).pdf'}
        handleDoubleClick={handleDoubleClick}
        handlerFunction={() =>
          explorerHandler(
            'Resume LAST(1).pdf',
            'https://olgunyolcinar.com/Desktop/Resume LAST(1).pdf',
          )
        }
      />
      {desktopFiles}
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
          helpHandler={helpHandler}
          documentsFiles={documentsFiles}
          documentPermanentItems={documentPermanentItems}
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
          setText={setNotepadText}
          saveable={true}
          setItems={setItems}
          opennable={true}
          help={false}
          isDirectory={isDirectory}
          setIsDirectory={setIsDirectory}
          saveHandler={saveHandler}
          setProgramFileTitle={setNotepadTitle}
          titleData={notepadTitle}
          briefCaseFiles={briefCaseFiles}
          desktopFilesForMenu={desktopFilesForMenu}
          desktopPermanentItems={desktopPermanentItems}
          checkFiles={checkFiles}
          deleteHandler={deleteHandler}
          setFileId={setFileId}
          overwriteHandler={overwriteHandler}
          openHandler={openHandler}
          saveNameSameNotepad={saveNameSameNotepad}
          setSaveNameSameNotepad={setSaveNameSameNotepad}
          newFileHandler={newFileHandler}
          helpHandler={helpHandler}
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
          initialSize={{ w: 800, h: 600 }}
          saveable={true}
          setItems={setItems}
          opennable={true}
          help={false}
          isDirectory={isDirectory}
          setIsDirectory={setIsDirectory}
          saveHandler={saveHandler}
          setProgramFileTitle={setPaintTitle}
          titleData={paintTitle}
          briefCaseFiles={briefCaseFiles}
          desktopFilesForMenu={desktopFilesForMenu}
          checkFiles={checkFiles}
          deleteHandler={deleteHandler}
          setFileId={setFileId}
          overwriteHandler={overwriteHandler}
          openHandler={openHandler}
          newFileHandler={newFileHandler}
          helpHandler={helpHandler}
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
          title={explorerTitle}
          programIcon={
            explorerTitle === 'Internet Explorer' ? explorerIcon : explorerPage
          }
          initialSize={{ w: 800, h: 600 }}
          saveable={false}
          opennable={false}
          help={false}
          setBrowserData={setBrowserData}
          newFileHandler={newFileHandler}
          helpHandler={helpHandler}
        >
          <ExplorerBrowser
            browserData={browserData}
            setBrowserData={setBrowserData}
            triggerGo={triggerGo}
          />
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
          saveable={false}
          opennable={true}
          help={false}
          isDirectory={isDirectory}
          setIsDirectory={setIsDirectory}
          desktopPermanentItems={desktopPermanentItems}
          deleteHandler={deleteHandler}
          setFileId={setFileId}
          openHandler={openHandler}
          helpHandler={helpHandler}
        >
          <BriefcaseComponent
            briefCaseFiles={briefCaseFiles}
            desktopPermanentItems={desktopPermanentItems}
          />
        </ProgramComponent>
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
          saveable={false}
          opennable={false}
          help={false}
          newFileHandler={newFileHandler}
          helpHandler={helpHandler}
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
          saveable={false}
          opennable={false}
          help={false}
          helpHandler={helpHandler}
        />
      )}
      {isHelp && !minimizeHelp && (
        <ProgramComponent
          doubleClickProgram={doubleClickHelp}
          setDoubleClickProgram={setDoubleClickHelp}
          isProgram={isHelp}
          setIsProgram={setIsHelp}
          toggleMinimizeProgram={toggleMinimizeHelp}
          minimizeProgram={minimizeHelp}
          size={helpSize}
          setSize={setHelpSize}
          startResize={startResize}
          draggableDisabled={draggableDisabled}
          setIsResizing={setIsResizing}
          orderArray={orderArray}
          orderArrayHandler={orderArrayHandler}
          indexOfOrderArrayElement={indexOfOrderArrayElement}
          active={active}
          setActive={setActive}
          name={'help'}
          title={'Help'}
          programIcon={helpIcon}
          initialSize={{ w: 400, h: 350 }}
          saveable={false}
          opennable={false}
          help={true}
        >
          <HelpComponent />
        </ProgramComponent>
      )}
      {isRecycleBin && !minimizeRecycleBin && (
        <ProgramComponent
          doubleClickProgram={doubleClickRecycleBin}
          setDoubleClickProgram={setDoubleClickRecycleBin}
          isProgram={isRecycleBin}
          setIsProgram={setIsRecycleBin}
          toggleMinimizeProgram={toggleMinimizeRecycle}
          minimizeProgram={minimizeRecycleBin}
          size={recycleSize}
          setSize={setRecycleSize}
          startResize={startResize}
          draggableDisabled={draggableDisabled}
          setIsResizing={setIsResizing}
          orderArray={orderArray}
          orderArrayHandler={orderArrayHandler}
          indexOfOrderArrayElement={indexOfOrderArrayElement}
          active={active}
          setActive={setActive}
          name={'recycle'}
          title={'Recycle Bin'}
          programIcon={recycleItems[0] ? recycleIconFull : recycleIconEmpty}
          initialSize={{ w: 400, h: 300 }}
          saveable={false}
          opennable={false}
          help={false}
          emptyBinHandler={emptyBinHandler}
          restoreHandler={restoreHandler}
          helpHandler={helpHandler}
        >
          <RecycleComponent recycleBinItems={recycleBinItems} />
        </ProgramComponent>
      )}
      {isWorks && !minimizeWorks && (
        <ProgramComponent
          doubleClickProgram={doubleClickWorks}
          setDoubleClickProgram={setDoubleClickWorks}
          isProgram={isWorks}
          setIsProgram={setIsWorks}
          toggleMinimizeProgram={toggleMinimizeWorks}
          minimizeProgram={minimizeWorks}
          size={worksSize}
          setSize={setWorksSize}
          startResize={startResize}
          draggableDisabled={draggableDisabled}
          setIsResizing={setIsResizing}
          orderArray={orderArray}
          orderArrayHandler={orderArrayHandler}
          indexOfOrderArrayElement={indexOfOrderArrayElement}
          active={active}
          setActive={setActive}
          name={'works'}
          title={'Works'}
          programIcon={directory}
          initialSize={{ w: 800, h: 600 }}
          saveable={false}
          opennable={true}
          help={false}
          helpHandler={helpHandler}
        >
          <WorksComponent worksPermanentItems={worksPermanentItems} />
        </ProgramComponent>
      )}
    </div>
  );
};

export default Navbar;
