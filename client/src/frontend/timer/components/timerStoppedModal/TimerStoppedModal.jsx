import style from "./timerstoppedmodal.module.css";
function TimerStoppedModal({ cancel }) {
  const popAnimation = {
    hidden: {
      scale: 0.7,
    },
    visible: {
      scale: 1,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 150,
      },
    },
  };
  return (
    <div className={style.TimerStoppedModalWrapper}>
      <div
        className={style.TimerStoppedModalWrapperOverlay}
        onClick={cancel}
      ></div>
      <motion.div className={style.container}>
        <header>TIMER STOPPED</header>
        <p>Thank you for stretching with OR-Stretch</p>

        <button></button>
        <button></button>
        <button></button>
      </motion.div>
    </div>
  );
}

export default TimerStoppedModal;
