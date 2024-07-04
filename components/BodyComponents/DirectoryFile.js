import Image from 'next/image';
import styles from '../../styles/DirectoryFile.module.css';
import { useState, useRef, useEffect } from 'react';
import { useClickOutsideHandler } from '../../utils/utils';

const DirectoryFile = ({
  image,
  name,
  handlerFunction,
  handleDoubleClick,
  setIsDirectory,
  type,
  data,
  setData,
  setTitle,
  directory,
  setFileId,
  id,
}) => {
  const [selected, setSelected] = useState(false);
  const directoryFileRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsDirectory(false);
    }, 1500);

    return () => clearInterval(intervalId);
  }, [setIsDirectory]);

  function toggleSelected() {
    setSelected(false);
  }

  useClickOutsideHandler(directoryFileRef, toggleSelected);

  return (
    <div
      className={styles.container}
      ref={directoryFileRef}
      onClick={(e) => {
        setIsDirectory(true);
        directory && name && type ? setFileId(id) : '';
        setSelected(true);
        handleDoubleClick(e, handlerFunction, id, data, name);
      }}
      onTouchEnd={(e) => {
        setIsDirectory(true);
        directory && name && type ? setFileId(id) : '';
        setSelected(true);
        handleDoubleClick(e, handlerFunction, id, data, name);
      }}
    >
      <Image
        src={image}
        alt=''
        height={18}
        className={selected ? styles.image : ''}
      />
      <div className={selected ? styles.selected : styles.text}>{name}</div>
    </div>
  );
};

export default DirectoryFile;
