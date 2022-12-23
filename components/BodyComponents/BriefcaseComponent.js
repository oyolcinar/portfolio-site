import styles from '../../styles/Briefcase.module.css';

const BriefcaseComponent = ({ briefCaseFiles, desktopPermanentItems }) => {
  return (
    <div className={styles.card}>
      <div className={styles.briefcaseBody}>
        {desktopPermanentItems}
        {briefCaseFiles}
      </div>
    </div>
  );
};

export default BriefcaseComponent;
