import notepadImage from '../public/icons/notepadFile.png';
import styles from '../styles/Start.module.css';
import Image from 'next/image';
import { useRef } from 'react';
import { useClickOutsideHandler } from '../utils/utils';

const StartDocuments = ({
  setIsStartOpen,
  setIsDocumentsOpen,
  orderArrayHandler,
}) => {
  const documentsRef = useRef(null);

  function documentsOutsideClickHandler() {
    setIsStartOpen(false);
  }

  useClickOutsideHandler(documentsRef, documentsOutsideClickHandler);

  return (
    <div
      className={`${styles.container} ${styles.documentsContainer}`}
      onMouseEnter={() => {
        setIsDocumentsOpen(true);
      }}
      ref={documentsRef}
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
