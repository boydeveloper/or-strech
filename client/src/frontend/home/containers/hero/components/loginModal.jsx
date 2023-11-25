import { CancelIcon } from "../../../../utils/svg";
import style from "./loginmodal.module.css";
import { motion } from "framer-motion";

function LoginModal({ value, emailChange, submit, close, loading }) {
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
    <div className={style.modalWrapper}>
      <div className={style.modalOverlay} onClick={close}></div>
      <motion.form
        onSubmit={submit}
        className={style.modal}
        variants={popAnimation}
        initial="hidden"
        animate="visible"
      >
        <button onClick={close}>
          <CancelIcon />
        </button>
        <h1>Stretch Now</h1>
        <div className={style.input_container}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={value} onChange={emailChange} />
        </div>
        <div className={style.cta}>
          <button onClick={close}>Cancel</button>
          <button type="submit" disabled={loading}>
            {loading ? "loading..." : "Go"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}

export default LoginModal;
