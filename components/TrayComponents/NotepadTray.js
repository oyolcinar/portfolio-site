import Image from 'next/image';
import cardStyles from '../../styles/Minimize.module.css';
import notepadIcon from '../../public/icons/notepad.png';

const NotepadTray = ({ setMinimizeNotepad, setDoubleClickNotepad }) => {
  return (
    <div
      className={cardStyles.card}
      onClick={() => {
        setMinimizeNotepad(false);
        setDoubleClickNotepad((prevState) => !prevState);
      }}
    >
      <div className={cardStyles.header}>
        <div className={cardStyles.headerLeft}>
          <Image
            src={notepadIcon}
            alt=''
            height={20}
            className={cardStyles.headerModem}
          />
          Notepad
        </div>
      </div>
    </div>
  );
};

export default NotepadTray;
