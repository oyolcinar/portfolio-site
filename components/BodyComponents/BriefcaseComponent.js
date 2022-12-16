import styles from '../../styles/Briefcase.module.css';
import DirectoryFile from './DirectoryFile';

import notepadFileIcon from '../../public/icons/notepadFileIcon.png';

const BriefcaseComponent = ({
  handleDoubleClick,
  notepadHandler,
  paintHandler,
  setIsDirectory,
  setSelectedBriefcaseFile,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.briefcaseBody}>
        <DirectoryFile
          name={'CV.txt'}
          image={notepadFileIcon}
          handleDoubleClick={handleDoubleClick}
          handlerFunction={notepadHandler}
          setIsDirectory={setIsDirectory}
          setSelectedBriefcaseFile={setSelectedBriefcaseFile}
        />
        <DirectoryFile
          name={'Works.txt'}
          image={notepadFileIcon}
          handleDoubleClick={handleDoubleClick}
          handlerFunction={notepadHandler}
          setIsDirectory={setIsDirectory}
          setSelectedBriefcaseFile={setSelectedBriefcaseFile}
        />
      </div>
    </div>
  );
};

export default BriefcaseComponent;
