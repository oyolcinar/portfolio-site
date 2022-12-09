import Draggable from 'react-draggable';
import Image from 'next/image';

import styles from '../styles/Navbar.module.css';

const DesktopItem = ({
  shortcut,
  image,
  handleDoubleClick,
  handlerFunction,
  name,
}) => {
  return (
    <Draggable bounds='parent'>
      <div
        className={styles.desktopItems}
        onClick={(e) => {
          handleDoubleClick(e, handlerFunction);
        }}
      >
        <Image src={image} height={30} alt='' />
        <Image src={shortcut} height={30} alt='' className={styles.shortcut} />
        {name}
      </div>
    </Draggable>
  );
};

export default DesktopItem;
