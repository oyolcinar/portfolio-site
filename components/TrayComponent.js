import Image from 'next/image';
import cardStyles from '../styles/Minimize.module.css';

const TrayComponent = ({
  name,
  icon,
  setActive,
  setMinimize,
  setDoubleClick,
  title,
  titleData,
  titled,
}) => {
  return (
    <div
      className={cardStyles.card}
      onClick={() => {
        setActive(name);
        setMinimize(false);
        setDoubleClick((prevState) => !prevState);
      }}
    >
      <div className={cardStyles.header}>
        <div className={cardStyles.headerLeft}>
          <Image
            src={icon}
            alt=''
            height={20}
            className={cardStyles.headerModem}
          />
          {titled
            ? titleData
              ? `${titleData} - ${title}`
              : `Untitled - ${title}`
            : title}
        </div>
      </div>
    </div>
  );
};

export default TrayComponent;
