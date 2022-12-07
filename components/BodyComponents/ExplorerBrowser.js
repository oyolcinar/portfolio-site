import npStyles from '../../styles/Notepad.module.css';

const ExplorerBrowser = () => {
  return (
    <div className={npStyles.textarea}>
      <iframe
        className={npStyles.input}
        src='https://www.wikipedia.org/'
      ></iframe>
    </div>
  );
};

export default ExplorerBrowser;
