import notepadImage from '../public/icons/notepadFile.png';
import styles from '../styles/Start.module.css';
import Image from 'next/image';

const StartDocuments = ({ setIsStartOpen, setIsDocumentsOpen }) => {
  return (
    <div
      className={`${styles.container} ${styles.documentsContainer}`}
      onMouseEnter={() => {
        setIsDocumentsOpen(true);
      }}
    >
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.cluster}>
            <Image src={notepadImage} alt='' height={30} />
            <div>Works.txt</div>
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.cluster}>
            <Image src={notepadImage} alt='' height={30} />
            <div>CV.txt</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default StartDocuments;
