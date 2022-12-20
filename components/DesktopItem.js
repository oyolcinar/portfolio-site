import Draggable from 'react-draggable';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { useClickOutsideHandler } from '../utils/utils';

import styles from '../styles/Navbar.module.css';

const DesktopItem = ({
  shortcut,
  image,
  handleDoubleClick,
  handlerFunction,
  name,
  type,
  data,
  setTitle,
  setData,
  directory,
  setSelectedFile,
}) => {
  const [selected, setSelected] = useState(false);
  const desktopItemRef = useRef(null);

  function toggleSelected() {
    setSelected(false);
  }

  useClickOutsideHandler(desktopItemRef, toggleSelected);

  return (
    <Draggable bounds='parent'>
      <div
        ref={desktopItemRef}
        className={
          selected
            ? `${styles.selected} ${styles.desktopItems}`
            : `${styles.desktopItems}`
        }
        onClick={(e) => {
          setSelected(true);
          directory && name && type
            ? setSelectedFile({
                filename: name,
                filetype: type,
                directory: directory,
              })
            : '';
          setTitle ? setTitle(name) : '';
          setData ? setData(data) : '';
          handleDoubleClick(e, handlerFunction);
        }}
      >
        <Image
          src={image}
          height={30}
          alt=''
          className={selected ? styles.desktopItemImage : ''}
        />
        <Image src={shortcut} height={30} alt='' className={styles.shortcut} />
        <div
          className={
            selected
              ? `${styles.desktopItemNameSelected}`
              : `${styles.desktopItemName}`
          }
        >
          {name}
        </div>
      </div>
    </Draggable>
  );
};

export default DesktopItem;
