import Image from 'next/image';
import styles from '../../styles/DirectorySelect.module.css';

import briefcaseIcon from '../../public/icons/briefcaseIcon.png';

const BriefcaseDirectory = () => {
  return (
    <div className={styles.container}>
      <Image src={briefcaseIcon} alt='' height={18} />
      <div>Briefcase</div>
    </div>
  );
};

export default BriefcaseDirectory;
