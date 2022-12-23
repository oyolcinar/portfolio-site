import Image from 'next/image';
import styles from '../styles/Start.module.css';

const StartDocumentFile = ({
  image,
  handlerFunction,
  name,
  type,
  data,
  setTitle,
  setData,
  directory,
  setFileId,
  id,
}) => {
  return (
    <li
      className={styles.item}
      onClick={() => {
        directory && name && type ? setFileId(id) : '';
        setTitle ? setTitle(name) : '';
        setData ? setData(data) : '';
        handlerFunction(id);
      }}
    >
      <div className={styles.cluster}>
        <Image src={image} alt='' height={30} />
        <div>{name}</div>
      </div>
    </li>
  );
};

export default StartDocumentFile;
