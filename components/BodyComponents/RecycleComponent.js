import styles from '../../styles/Briefcase.module.css';

const RecycleComponent = ({ recycleBinItems }) => {
  return (
    <div className={styles.card}>
      <div className={styles.briefcaseBody}>{recycleBinItems}</div>
    </div>
  );
};

export default RecycleComponent;
