import styles from '../../styles/Briefcase.module.css';

const WorksComponent = ({ worksPermanentItems }) => {
  return (
    <div className={styles.card}>
      <div className={styles.briefcaseBody}>{worksPermanentItems}</div>
    </div>
  );
};

export default WorksComponent;
