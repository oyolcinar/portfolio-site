import { useRef } from 'react';
import { useClickOutsideHandler } from '../utils/utils';
import styles from '../styles/Start.module.css';

const StartDocuments = ({
  setIsStartOpen,
  setIsDocumentsOpen,
  documentsFiles,
  documentPermanentItems,
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
        {documentPermanentItems}
        {documentsFiles}
      </ul>
    </div>
  );
};

export default StartDocuments;
