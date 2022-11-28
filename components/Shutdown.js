import styles from '../styles/Card.module.css';
import shutdownStyles from '../styles/Shutdown.module.css';
import Image from 'next/image';
import shutdownImage from '../public/icons/shutdown.png';
import close from '../public/icons/close.png';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { clickOutsideHandler } from '../utils/utils';

const Shutdown = ({
  setDoubleClickShutdown,
  doubleClickShutdown,
  isShutdown,
  setIsShutdown,
  setIsStartOpen,
}) => {
  const [redirect, setRedirect] = useState('http://www.google.com');
  const router = useRouter();
  const shutdownRef = useRef();

  function submitHandler(e) {
    e.preventDefault();
    setIsShutdown(false);
    router.push(redirect);
  }

  function shutdownDoubleClickHandler() {
    setDoubleClickShutdown(true);
  }

  clickOutsideHandler(shutdownRef, shutdownDoubleClickHandler);

  return (
    <div className={`${styles.container} ${styles.shutdown}`} ref={shutdownRef}>
      <div
        className={`${styles.card} ${styles.shutdown}`}
        onClick={() => {
          setDoubleClickShutdown(false);
        }}
      >
        <div
          className={
            !doubleClickShutdown
              ? styles.header
              : `${styles.header} ${styles.double}`
          }
        >
          <div className={`${styles.headerLeft} ${styles.headerShutdown}`}>
            Shut Down Windows
          </div>
          <div className={styles.headerRight}>
            <div className={`${styles.close} ${styles.sdClose}`}>
              <Image
                alt=''
                src={close}
                height={21}
                onClick={() => {
                  setIsShutdown(false);
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={`${styles.bodyLeft} ${styles.sdBodyLeft}`}>
            <Image src={shutdownImage} alt='' height={45} />
          </div>
          <div className={styles.bodyRight}>
            <div>What do you want the computer to do?</div>
            <form className={styles.form}>
              <input
                type='radio'
                id='choice1'
                name='shutdown'
                value='shutdown'
                className={styles.radio}
                onClick={() => {
                  setRedirect('http://www.google.com');
                }}
                defaultChecked='checked'
              />
              <label for='choice1'>
                <span className={styles.underline}>S</span>hut down
              </label>
              <br />
              <input
                type='radio'
                id='choice2'
                name='shutdown'
                value='Restart'
                className={styles.radio}
                onClick={() => {
                  setRedirect('/');
                }}
              />
              <label for='choice2'>
                <span className={styles.underline}>R</span>estart
              </label>
              <br />
              <input
                type='radio'
                id='choice3'
                name='shutdown'
                value='MSDOS'
                className={styles.radio}
                onClick={() => {
                  setRedirect('https://github.com/oyolcinar/portfolio-site');
                }}
              />
              <label for='choice3'>
                Restart in <span className={styles.underline}>M</span>S-DOS mode
              </label>
              <br />
              <div className={styles.formButtons}>
                <input
                  type='submit'
                  value='OK'
                  className={`${styles.button} ${styles.sdButton} `}
                  onClick={(e) => {
                    submitHandler(e);
                  }}
                />
                <button
                  className={`${styles.button} ${styles.sdButton} `}
                  onClick={() => {
                    setIsShutdown(false);
                  }}
                >
                  Cancel
                </button>
                <button className={`${styles.button} ${styles.sdButton} `}>
                  <span className={styles.underline}>H</span>elp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shutdown;
