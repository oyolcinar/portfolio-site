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
  setSelectedFile,
  program,
}) => {
  return (
    <li
      className={styles.item}
      onClick={() => {
        directory && name && type
          ? setSelectedFile({
              filename: name,
              filetype: type,
              directory: directory,
              data: data,
              program: program,
            })
          : '';
        setTitle ? setTitle(name) : '';
        setData ? setData(data) : '';
        handlerFunction();
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
