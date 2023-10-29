import { motion } from "framer-motion";
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
      <motion.div
        variants={popAnimation}
        initial="hidden"
        animate="visible"
        className={style.container}
      >
        <header>
          TIMER STOPPED
          <button className={style.close_button} onClick={cancel}>
            <ion-icon name="close"></ion-icon>
          </button>
        </header>
        <p>Thank you for stretching with OR-Stretch</p>
        <div className={style.cta}>
          <button className={style.surgical_button}>
            <span className={style.button_icon} onClick={cancel}></span>
            Surgical <br /> case over
          </button>
          <button className={style.finished_button}>
            <span className={style.finished_icon}></span>
            Finished <br /> for today
          </button>
          <button className={style.return_button} onClick={cancel}>
            <span className={style.return_icon}></span>
            return
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default TimerStoppedModal;
