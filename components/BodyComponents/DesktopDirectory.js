import Image from 'next/image';
import styles from '../../styles/DirectorySelect.module.css';

import desktopIcon from '../../public/icons/desktop.png';

const DesktopDirectory = () => {
  return (
    <div className={styles.container}>
      <Image src={desktopIcon} alt='' height={18} />
      <div>Desktop</div>
    </div>
  );
};

export default DesktopDirectory;
