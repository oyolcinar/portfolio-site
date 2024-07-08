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
  setFileId,
  id,
  link,
  worksFile,
  crowdingItem,
}) => {
  const [selected, setSelected] = useState(false);
  const desktopItemRef = useRef(null);

  function submitHandler(e) {
    e.preventDefault();
    window.open(link, '_blank');
  }

  function toggleSelected() {
    setSelected(false);
  }

  useClickOutsideHandler(desktopItemRef, toggleSelected);

  let defaultPosition = {};

  if (crowdingItem === 1) {
    defaultPosition = { x: 90, y: -426 };
  } else if (crowdingItem === 2) {
    defaultPosition = { x: 90, y: -426 };
  }

  return (
    <Draggable bounds='parent' defaultPosition={defaultPosition}>
      <div
        ref={desktopItemRef}
        className={
          selected
            ? `${styles.selected} ${styles.desktopItems}`
            : worksFile
            ? `${styles.desktopItemsWorks}`
            : `${styles.desktopItems}`
        }
        onClick={(e) => {
          setSelected(true);
          directory && name && type ? setFileId(id) : '';
          setTitle ? setTitle(name) : '';
          setData ? setData(data) : '';
          !link
            ? handleDoubleClick(e, handlerFunction, id)
            : handleDoubleClick(e, submitHandler);
        }}
        onTouchStart={(e) => {
          setSelected(true);
          directory && name && type ? setFileId(id) : '';
          setTitle ? setTitle(name) : '';
          setData ? setData(data) : '';
          !link
            ? handleDoubleClick(e, handlerFunction, id)
            : handleDoubleClick(e, submitHandler);
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
