import { motion } from "framer-motion";
import style from "./timerstoppedmodal.module.css";
import { trigEodSurvey } from "../../../../Apis/surveys/surveyService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Close } from "../../../utils/svg";
function TimerStoppedModal({ cancel, stopTimer, resume }) {
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
  const navigate = useNavigate();
  const userJSON = sessionStorage.getItem("strecher");
  const user = JSON.parse(userJSON);
  const handleEndofDay = async () => {
    navigate("/thankyou");
    // try {
    //   const trig = await trigEodSurvey(user?.email);
    //   console.log(trig);
    //   if (trig?.isSuccess === true) {
    //     toast.success("End of day triggered");
    //     navigate("/");
    //   }
    // } catch (error) {
    //   toast.error(error.response.data.message);
    // }
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
            <Close />
          </button>
        </header>
        <p>Thank you for stretching with OR-Stretch</p>
        <div className={style.cta}>
          <button className={style.surgical_button} onClick={stopTimer}>
            <span className={style.button_icon} onClick={cancel}></span>
            Surgical <br /> case over
          </button>
          <button onClick={handleEndofDay} className={style.finished_button}>
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
