import Image from 'next/image';
import styles from '../../styles/DirectorySelect.module.css';
import { useState } from 'react';

import briefcaseIcon from '../../public/icons/briefcaseIcon.png';

const BriefcaseDirectory = ({ setSelectedDirectory, setDirectory }) => {
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
        setSelectedDirectory('briefcase');
        setDirectory((prevState) => !prevState);
      }}
    >
      <Image src={briefcaseIcon} alt='' height={18} />
      <div>Briefcase</div>
    </div>
  );
};

export default BriefcaseDirectory;
