import npStyles from '../../styles/Notepad.module.css';

const NotepadText = ({ notepadText, textHandler }) => {
  return (
    <div className={npStyles.textarea}>
      <textarea
        className={npStyles.input}
        onChange={textHandler}
        value={notepadText}
      ></textarea>
    </div>
  );
};

export default NotepadText;
