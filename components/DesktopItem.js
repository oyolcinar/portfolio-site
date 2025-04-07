import Draggable from 'react-draggable';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useClickOutsideHandler } from '../utils/utils';
import { isSmallScreen } from '../utils/screenSize';

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
  const [defaultPosition, setDefaultPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let position = { x: 0, y: 0 };
    if (crowdingItem === 1) {
      position = { x: 80, y: -426 };
    } else if (crowdingItem === 2) {
      position = { x: 80, y: -60 };
    } else if (crowdingItem === 3) {
      position = { x: 160, y: -134 };
    } else if (crowdingItem === 4) {
      position = { x: 240, y: -194 };
    } else if (crowdingItem === 5) {
      position = { x: 320, y: -254 };
    }
    setDefaultPosition(position);
  }, [crowdingItem]);

  function submitHandler(e) {
    e.preventDefault();
    window.open(link, '_blank');
  }

  function toggleSelected() {
    setSelected(false);
  }

  useClickOutsideHandler(desktopItemRef, toggleSelected);

  return (
    <Draggable bounds='parent' positionOffset={defaultPosition}>
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
