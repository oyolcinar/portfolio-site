import styles from '../../styles/Explorer.module.css';
import outStyles from '../../styles/Outlook.module.css';
import npStyles from '../../styles/Notepad.module.css';

const ExplorerBrowser = () => {
  return (
    <div>
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
