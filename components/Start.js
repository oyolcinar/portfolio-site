import shutdown from '../public/icons/shutdown.png';
import key from '../public/icons/key.png';
import help from '../public/icons/help.png';
import programs from '../public/icons/programs.png';
import documents from '../public/icons/documents.png';
import Image from 'next/image';
import styles from '../styles/Start.module.css';
import { RiArrowRightSFill } from 'react-icons/ri';

const Start = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner}></div>
      <ul className={styles.list}>
        <li className={`${styles.item} ${styles.firstTwo}`}>
          <div className={styles.cluster}>
            <Image src={programs} alt='' height={30} />
            <div>Programs</div>
          </div>
          <RiArrowRightSFill className={styles.arrow} />
        </li>
        <li className={`${styles.item} ${styles.firstTwo}`}>
          <div className={styles.cluster}>
            <Image src={documents} alt='' height={30} />
            <div>Documents</div>
          </div>
          <RiArrowRightSFill className={styles.arrow} />
        </li>
        <li className={styles.item}>
          <Image src={help} alt='' height={30} className={styles.helpImage} />
          <div className={styles.help}>Help</div>
        </li>
        <li className={styles.seperator}></li>
        <li className={styles.item}>
          <Image src={key} alt='' height={45} />
          Login
        </li>
        <li className={`${styles.item} ${styles.shutdown}`}>
          <Image src={shutdown} alt='' height={45} />
          Turn Off Computer
        </li>
      </ul>
    </div>
  );
};

export default Start;
