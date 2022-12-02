import Image from 'next/image';
import cardStyles from '../../styles/Minimize.module.css';
import dialUp from '../../public/icons/conn_dialup.png';

const ConnectionTray = ({
  setMinimizeModem,
  setDoubleClickModem,
  setActive,
}) => {
  return (
    <div
      className={cardStyles.card}
      onClick={() => {
        setActive('modem');
        setMinimizeModem(false);
        setDoubleClickModem((prevState) => !prevState);
      }}
    >
      <div className={cardStyles.header}>
        <div className={cardStyles.headerLeft}>
          <Image
            src={dialUp}
            alt=''
            height={20}
            className={cardStyles.headerModem}
          />
          Connected to Internet Central
        </div>
      </div>
    </div>
  );
};

export default ConnectionTray;
