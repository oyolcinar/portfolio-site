import Image from 'next/image';
import styles from '../../styles/DirectorySelect.module.css';
import { useState } from 'react';

import desktopIcon from '../../public/icons/desktop.png';

const DesktopDirectory = ({ setSelectedDirectory, setDirectory }) => {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={
        selected ? `${styles.container} ${styles.selected}` : styles.container
      }
      onMouseEnter={() => {
        setSelected(true);
      }}
      onMouseLeave={() => {
        setSelected(false);
      }}
      onClick={() => {
        setSelectedDirectory('desktop');
        setDirectory((prevState) => !prevState);
      }}
    >
      <Image src={desktopIcon} alt='' height={18} />
      <div>Desktop</div>
    </div>
  );
};

export default DesktopDirectory;
