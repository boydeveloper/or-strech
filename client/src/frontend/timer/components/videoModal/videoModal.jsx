import style from "./videomodal.module.css";
import { motion } from "framer-motion";
function VideoModal({ cancel, url }) {
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
  console.log(url);
  return (
    <div className={style.VideoModalWrapper}>
      <div className={style.VideoModalWrapperOverlay} onClick={cancel}></div>
      <motion.div
        variants={popAnimation}
        initial="hidden"
        animate="visible"
        className={style.modal}
      >
        <video src={url} autoPlay loop muted />
        <div>
          <div>
            <iframe
              id="kaltura_player"
              // type="text/javascript"
              src='https://cdnapisec.kaltura.com/p/1825021/embedPlaykitJs/uiconf_id/49798893?iframeembed=true&entry_id=1_z9epq21s&config[provider]={"widgetId":"1_kvdwirjz"}&config[playback]={"startTime":0}'
              allowfullscreen
              webkitallowfullscreen
              mozAllowFullScreen
              allow="autoplay *; fullscreen *; encrypted-media *"
              // sandbox="allow-downloads allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation"
              // title="OR Stretch Standing"
              // style="position:absolute;top:0;left:0;width:100%;height:100%;border:0"
            ></iframe>
          </div>
        </div>
        {/* <iframe
          src={
            "https://mssvideoupload.mayo.edu/media/OR+Stretch+Standing/1_z9epq21s"
          }
          frameborder="0"
          width={"800"}
          height={"705"}
        ></iframe> */}
        <button onClick={cancel}> DONE STRETCHING</button>
      </motion.div>
    </div>
  );
}

export default VideoModal;
