import Image from 'next/image';
import styles from '../../styles/Outlook.module.css';
import npStyles from '../../styles/Notepad.module.css';
import { useState, useRef } from 'react';

import envelopeOpenBig from '../../public/icons/envelopeOpen.png';
import envelopeOpenIcon from '../../public/icons/envelope_open_sheet-1.png';
import printerIcon from '../../public/icons/printer-1.png';
import searchIcon from '../../public/icons/search_file.png';
import userIcon from '../../public/icons/users-1.png';
import helpIcon from '../../public/icons/helpIcon.png';

const OutlookComponent = ({ subject, setSubject }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [buttonMessage, setButtonMessage] = useState('Send');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (email.length <= 0) {
      tempErrors['email'] = true;
      isValid = false;
    }
    if (subject.length <= 0) {
      tempErrors['subject'] = true;
      isValid = false;
    }
    if (message.length <= 0) {
      tempErrors['message'] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log('errors', errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValidForm = handleValidation();

    if (isValidForm) {
      const res = await fetch('/api/sendMail', {
        body: JSON.stringify({
          email: email,
          subject: subject,
          message: message,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const { error } = await res.json();
      if (error) {
        setShowSuccessMessage(false);
        setShowFailureMessage(true);
        return;
      }
      setShowSuccessMessage(true);
      setButtonMessage('Sent!');
      setShowFailureMessage(false);
    }
  };

  const handleFocus = (ref) => {
    if (ref && ref.current) {
      ref.current.click();
    }
  };

  return (
    <div>
      <div className={styles.seperator}></div>
      <div className={styles.buttonCluster}>
        <div className={styles.cluster}>
          <div className={styles.button} onClick={handleSubmit}>
            <Image src={envelopeOpenIcon} alt='' height={20} />
          </div>
        </div>
        <div className={styles.vertSeperator}></div>
        <div className={styles.cluster}>
          <div className={styles.button}>
            <Image src={printerIcon} alt='' height={20} />
          </div>
          <div className={styles.button}>
            <Image src={searchIcon} alt='' height={20} />
          </div>
        </div>
        <div className={styles.vertSeperator}></div>
        <div className={styles.cluster}>
          <div className={styles.button}>
            <Image src={userIcon} alt='' height={20} />
          </div>
          <div className={styles.button}>
            <Image src={helpIcon} alt='' height={20} />
          </div>
        </div>
      </div>
      <div className={styles.seperator}></div>
      <form className={styles.body} onSubmit={handleSubmit}>
        <button
          className={
            buttonMessage === 'Sent!' ? styles.successfulSubmit : styles.submit
          }
        >
          <Image src={envelopeOpenBig} alt='' height={40} />
          {buttonMessage}
        </button>
        <label htmlFor='to' className={styles.label}>
          To:
        </label>
        <input
          type='email'
          name='to'
          value='oyolcinar@gmail.com'
          className={styles.input}
          readOnly
        />
        <br />
        <label htmlFor='email' className={styles.label}>
          From:
        </label>
        <input
          type='email'
          value={email}
          ref={emailRef}
          onTouchEnd={() => handleFocus(emailRef)}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name='email'
          className={styles.input}
        />
        <br />
        <label htmlFor='subject' className={styles.label}>
          Subject:
        </label>
        <input
          type='text'
          name='subject'
          value={subject}
          ref={subjectRef}
          onTouchEnd={() => handleFocus(subjectRef)}
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          className={`${styles.input} ${styles.lastInput}`}
        />
        <div className={styles.textarea}>
          <textarea
            name='message'
            value={message}
            ref={messageRef}
            onTouchEnd={() => handleFocus(messageRef)}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className={npStyles.input}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default OutlookComponent;
