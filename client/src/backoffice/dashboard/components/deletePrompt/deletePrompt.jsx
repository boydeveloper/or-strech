import style from "./deleteprompt.module.css";

function DeletePrompt({ cancel, proceed }) {
  return (
    <div className={style.promptWrapper}>
      <div className={style.promptOverlay}></div>
      <div className={style.promptContainer}>
        <h1>Are you sure?</h1>
        <p>This action will delete the user permanently</p>
        <div className={style.promptCta}>
          <button onClick={cancel}>No</button>
          <button onClick={proceed}>Yes</button>
        </div>
      </div>
    </div>
  );
}

export default DeletePrompt;
