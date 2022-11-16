import styles from '../styles/SoundControl.module.css';

const SoundControl = () => {
  return (
    <div className={styles.container}>
      <div>
        <div></div>
        <input type='range' />
      </div>
    </div>
  );
};

export default SoundControl;
