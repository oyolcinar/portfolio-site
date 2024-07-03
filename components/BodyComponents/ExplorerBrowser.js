import Image from 'next/image';
import { useState, useEffect } from 'react';

import styles from '../../styles/Explorer.module.css';
import outStyles from '../../styles/Outlook.module.css';
import npStyles from '../../styles/Notepad.module.css';

import backArrow from '../../public/icons/backArrow.png';
import favorites from '../../public/icons/favoritesEXP.png';
import forwardArrow from '../../public/icons/forwardArrow.png';
import historyIcon from '../../public/icons/history.png';
import home from '../../public/icons/home.png';
import refresh from '../../public/icons/refresh.png';
import search from '../../public/icons/search.png';
import stop from '../../public/icons/stopEXP.png';
import goArrow from '../../public/icons/goArrow.png';

const ExplorerBrowser = ({ browserData, setBrowserData, triggerGo }) => {
  const [history, setHistory] = useState(['https://www.wikipedia.org/']);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(1);

  function toggleBack() {
    if (currentHistoryIndex < history.length) {
      setCurrentHistoryIndex((prevState) => prevState + 1);
      setBrowserData(history[history.length - (currentHistoryIndex + 1)]);
    }
  }

  function toggleForward() {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex((prevState) => prevState - 1);
      setBrowserData(history[history.length - (currentHistoryIndex - 1)]);
    }
  }

  function toggleBrowserData(e) {
    setBrowserData(e.target.value);
  }

  function toggleGo() {
    setHistory((prevState) => [...prevState, browserData]);
  }

  function toggleHome() {
    setCurrentHistoryIndex(history.length);
    setBrowserData(history[0]);
  }

  useEffect(() => {
    if (triggerGo) {
      toggleGo();
    }
  }, [triggerGo]);

  return (
    <div>
      <div className={styles.seperator}></div>
      <div className={styles.iconCluster}>
        <div
          className={styles.icon}
          onClick={() => {
            toggleBack();
          }}
        >
          <Image src={backArrow} alt='' height={24} />
          <div>Back</div>
        </div>
        <div
          className={styles.icon}
          onClick={() => {
            toggleForward();
          }}
        >
          <Image src={forwardArrow} alt='' height={24} />
          <div>Forward</div>
        </div>
        <div className={styles.verticalSeperator}></div>
        <div className={styles.icon}>
          <Image src={stop} alt='' height={24} />
          <div>Stop</div>
        </div>
        <div className={styles.icon}>
          <Image src={refresh} alt='' height={24} />
          <div>Refresh</div>
        </div>
        <div
          className={styles.icon}
          onClick={() => {
            toggleHome();
          }}
        >
          <Image src={home} alt='' height={24} />
          <div>Home</div>
        </div>
        <div className={styles.verticalSeperator}></div>
        <div className={styles.icon}>
          <Image src={search} alt='' height={24} />
          <div>Search</div>
        </div>
        <div className={styles.icon}>
          <Image src={favorites} alt='' height={24} />
          <div>Favorites</div>
        </div>
        <div className={styles.icon}>
          <Image src={historyIcon} alt='' height={24} />
          <div>History</div>
        </div>
        <div className={styles.verticalSeperator}></div>
      </div>
      <div className={styles.seperator}></div>
      <form className={styles.body}>
        <label className={outStyles.label} htmlFor='browser'>
          Address:
        </label>
        <input
          className={`${outStyles.input} ${outStyles.lastInput}`}
          type='text'
          name='browser'
          value={browserData}
          onChange={(e) => {
            toggleBrowserData(e);
          }}
        />
        <div
          className={styles.goArrow}
          onClick={() => {
            toggleGo();
          }}
        >
          <div className={styles.verticalSeperator}></div>
          <div className={styles.go}>
            <Image src={goArrow} height={24} alt='' />
            <div>Go</div>
          </div>
          <div className={styles.verticalSeperator}></div>
        </div>
        <div className={styles.links}>&gt;&gt;</div>
        <div className={styles.textarea}>
          <iframe
            className={npStyles.input}
            src={history[history.length - currentHistoryIndex]}
          ></iframe>
        </div>
      </form>
    </div>
  );
};

export default ExplorerBrowser;
