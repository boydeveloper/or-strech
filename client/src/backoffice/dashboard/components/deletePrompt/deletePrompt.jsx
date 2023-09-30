import style from "./deleteprompt.module.css";
import { motion } from "framer-motion";
function DeletePrompt({ cancel, proceed, text }) {
  const svgVariant = {
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
    <div className={style.promptWrapper}>
      <div className={style.promptOverlay}></div>
      <motion.div
        variants={svgVariant}
        initial="hidden"
        animate="visible"
        className={style.promptContainer}
      >
        <h1>Are you sure?</h1>
        <p>This action will delete the {text} permanently</p>
        <div className={style.promptCta}>
          <button onClick={cancel}>No</button>
          <button onClick={proceed}>Yes</button>
        </div>
      </motion.div>
    </div>
  );
}

export default DeletePrompt;
