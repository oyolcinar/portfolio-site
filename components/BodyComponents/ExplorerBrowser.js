import npStyles from '../../styles/Notepad.module.css';

const ExplorerBrowser = () => {
  return (
    <div className={npStyles.textarea}>
      <iframe src='http://www.google.com'></iframe>
    </div>
  );
};

export default ExplorerBrowser;
