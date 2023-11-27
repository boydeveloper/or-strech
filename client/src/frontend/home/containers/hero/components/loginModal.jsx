import { useState } from "react";
import { CancelIcon } from "../../../../utils/svg";
import style from "./loginmodal.module.css";
import { motion } from "framer-motion";

function LoginModal({
  value,
  onChange,
  onSubmit,
  onClose,
  loading,
  emailError,
}) {
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
        onSubmit={onSubmit}
        className={style.modal}
        variants={popAnimation}
        initial="hidden"
        animate="visible"
      >
        <button type="button" onClick={onClose}>
          <CancelIcon />
        </button>
        <h1>Stretch Now</h1>
        <div className={style.input_container}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            required
            value={value}
            onChange={onChange}
          />

          {emailError && <p className={style.errorText}>{emailError}</p>}
        </div>
        <div className={style.cta}>
          <button onClick={onClose}>Cancel</button>
          <button type="submit" disabled={loading}>
            {loading ? "loading..." : "Go"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}

export default LoginModal;
