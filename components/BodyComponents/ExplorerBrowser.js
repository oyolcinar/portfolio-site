import Image from 'next/image';

import styles from '../../styles/Explorer.module.css';
import outStyles from '../../styles/Outlook.module.css';
import npStyles from '../../styles/Notepad.module.css';

import backArrow from '../../public/icons/backArrow.png';
import favorites from '../../public/icons/favoritesEXP.png';
import forwardArrow from '../../public/icons/forwardArrow.png';
import history from '../../public/icons/history.png';
import home from '../../public/icons/home.png';
import refresh from '../../public/icons/refresh.png';
import search from '../../public/icons/search.png';
import stop from '../../public/icons/stopEXP.png';
import goArrow from '../../public/icons/goArrow.png';

const ExplorerBrowser = () => {
  return (
    <div>
      <div className={styles.seperator}></div>
      <div className={styles.iconCluster}>
        <div className={styles.icon}>
          <Image src={backArrow} alt='' height={24} />
          <div>Back</div>
        </div>
        <div className={styles.icon}>
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
        <div className={styles.icon}>
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
          <Image src={history} alt='' height={24} />
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
        />
        <div className={styles.goArrow}>
          <div className={styles.verticalSeperator}></div>
          <div className={styles.go}>
            <Image src={goArrow} height={24} alt='' />
            <div>Go</div>
          </div>
          <div className={styles.verticalSeperator}></div>
        </div>
        <div className={styles.links}>&gt;&gt;</div>
        <div className={npStyles.textarea}>
          <iframe
            className={npStyles.input}
            src='https://www.wikipedia.org/'
          ></iframe>
        </div>
      </form>
    </div>
  );
};

export default ExplorerBrowser;
