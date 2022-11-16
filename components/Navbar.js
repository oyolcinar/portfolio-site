import styles from '../styles/Navbar.module.css';
import cardStyles from '../styles/Minimize.module.css';
import speaker from '../public/icons/loudspeaker.png';
import offOff from '../public/icons/conn_pcs_off_off.png';
import onOff from '../public/icons/conn_pcs_on_off.png';
import offOn from '../public/icons/conn_pcs_off_on.png';
import onOn from '../public/icons/conn_pcs_on_on.png';
import windows from '../public/icons/windows.png';
import dialUp from '../public/icons/conn_dialup.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SoundControl from './SoundControl';
import Connection from './Connection';
import { useElapsedTime } from 'use-elapsed-time';

const Navbar = () => {
  const [currentImage, setCurrentImage] = useState(offOff);
  const [sound, setSound] = useState(false);
  const [modem, setModem] = useState(false);
  const [minimizeModem, setMinimizeModem] = useState(false);
  const [doubleClick, setDoubleClick] = useState(false);
  const { elapsedTime } = useElapsedTime({ isPlaying: true });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage(random());
    }, 1500);

    return () => clearInterval(intervalId);
  }, []);

  function toggleMinimize() {
    setMinimizeModem(true);
  }

  var today = new Date();
  var time =
    today.getHours() +
    ':' +
    ((today.getMinutes() < 10 ? '0' : '') + today.getMinutes());
  var date =
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

  var display = date + ' ' + time;

  const modemImages = [offOff, onOff, offOn, onOn];

  function random() {
    const random = Math.floor(Math.random() * modemImages.length);
    return modemImages[random];
  }

  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.list}>
          <li className={styles.start}>
            <button className={styles.item}>
              <Image src={windows} height={28} alt='' />
              <div className={styles.text}>Start</div>
            </button>
          </li>
          {minimizeModem && (
            <div
              className={cardStyles.card}
              onClick={() => {
                setMinimizeModem(false);
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
          )}
        </ul>
        <div className={styles.taskbar}>
          <Image
            src={currentImage}
            alt=''
            height={24}
            className={styles.modem}
            onClick={() => {
              minimizeModem
                ? setMinimizeModem(false)
                : modem
                ? setDoubleClick((prevState) => !prevState)
                : setModem((prevState) => !prevState);
            }}
          />
          <Image
            src={speaker}
            alt=''
            height={24}
            className={styles.speaker}
            onClick={() => {
              setSound((prevState) => !prevState);
            }}
          />
          <div>{time}</div>
        </div>
      </nav>
      {modem && !minimizeModem && (
        <Connection
          toggleMinimize={toggleMinimize}
          modemState={modem}
          setModemState={setModem}
          doubleClick={doubleClick}
          elapsedTime={elapsedTime}
        />
      )}
      {sound && <SoundControl />}
    </>
  );
};

export default Navbar;
