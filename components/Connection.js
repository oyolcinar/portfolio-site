import styles from '../styles/Card.module.css';
import Image from 'next/image';
import modem from '../public/icons/conn_dialup.png';
import minimize from '../public/icons/minimize.png';
import maximize from '../public/icons/maximize.png';
import close from '../public/icons/close.png';
import { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { useClickOutsideHandler } from '../utils/utils';

const Connection = ({
  toggleMinimize,
  setModemState,
  doubleClickModem,
  setDoubleClickModem,
  elapsedTime,
  orderArray,
  orderArrayHandler,
  indexOfOrderArrayElement,
  active,
  setActive,
}) => {
  const [currentSpeed, setCurrentSpeed] = useState(20000);
  const connectionRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSpeed(generateRandomNumber(20000, 36000));
    }, 1500);

    return () => clearInterval(intervalId);
  }, []);

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function formatDuration(seconds) {
    return new Date(seconds * 1000).toISOString().substring(11, 11 + 8);
  }

  function doubleClickHandler() {
    setDoubleClickModem(true);
  }

  useClickOutsideHandler(connectionRef, doubleClickHandler);

  return (
    <Draggable bounds='parent' positionOffset={{ x: '-50%', y: '-50%' }}>
      <div
        className='card'
        onClick={() => {
          setDoubleClickModem(false);
          setActive('modem');
        }}
        ref={connectionRef}
      >
        <style jsx>{`
          .card {
            position: absolute;
            z-index: ${active === 'modem'
              ? orderArray.length + 1
              : indexOfOrderArrayElement('modem')};
            left: 50%;
            top: 50%;
            border-top: 2px solid white;
            border-left: 2px solid white;
            border-right: 2px solid #393939;
            border-bottom: 2px solid #393939;
            border-radius: 0;
            background: #c0c0c0;
            box-shadow: 3px 0 4px -2px #393939;
          }
        `}</style>
        <div
          className={
            !doubleClickModem
              ? styles.header
              : `${styles.header} ${styles.double}`
          }
        >
          <div className={styles.headerLeft}>
            <Image
              src={modem}
              alt=''
              height={20}
              className={styles.headerModem}
            />
            <div className={styles.title}>Connected to Internet Central</div>
          </div>
          <div className={styles.headerRight}>
            <div>
              <Image
                alt=''
                src={minimize}
                height={22}
                onClick={() => {
                  toggleMinimize();
                }}
                onTouchEnd={() => {
                  toggleMinimize();
                }}
              />
              <Image
                alt=''
                src={maximize}
                height={22}
                className={styles.maximize}
              />
            </div>
            <div className={styles.close}>
              <Image
                alt=''
                src={close}
                height={23}
                onClick={() => {
                  setActive('');
                  orderArrayHandler('modem');
                  setModemState(false);
                }}
                onTouchEnd={() => {
                  setActive('');
                  orderArrayHandler('modem');
                  setModemState(false);
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.bodyLeft}>
            <Image
              src={modem}
              alt=''
              height={40}
              className={styles.modemBody}
            />
            <div>
              <p className={styles.connection}>
                Connected at {(currentSpeed / 1000).toFixed(3)} bps
              </p>
              <p>Duration: {formatDuration(elapsedTime.toFixed(0))}</p>
            </div>
          </div>
          <div className={styles.buttonsBody}>
            <button className={styles.button}>
              Dis<span className={styles.underline}>c</span>onnect
            </button>
            <button className={styles.button}>
              Show <span className={styles.underline}>D</span>etails
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Connection;
