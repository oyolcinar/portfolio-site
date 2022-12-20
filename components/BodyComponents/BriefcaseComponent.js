import styles from '../../styles/Briefcase.module.css';
import DirectoryFile from './DirectoryFile';

const BriefcaseComponent = ({
  handleDoubleClick,
  notepadHandler,
  paintHandler,
  setIsDirectory,
  setSelectedBriefcaseFile,
  briefCaseFiles,
  desktopPermanentItems,
  checkFiles,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.briefcaseBody}>
        {desktopPermanentItems}
        {briefCaseFiles}
      </div>
    </div>
  );
};

export default BriefcaseComponent;
