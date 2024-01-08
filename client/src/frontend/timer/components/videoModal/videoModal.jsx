import style from "./videomodal.module.css";
import { motion } from "framer-motion";
function VideoModal({ cancel, url, type }) {
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
    <div className={style.VideoModalWrapper}>
      <div className={style.VideoModalWrapperOverlay} onClick={cancel}></div>
      <motion.div
        variants={popAnimation}
        initial="hidden"
        animate="visible"
        className={style.modal}
      >
        <h1>
          {type ? "Seated" : "Standing"}
          {"  "} Stretch
        </h1>
        <iframe
          allowFullScreen
          frameborder="0"
          src={url}
          allow="autoplay; fullscreen"
        ></iframe>

        <button onClick={cancel}> DONE STRETCHING</button>
      </motion.div>
    </div>
  );
}

export default VideoModal;
