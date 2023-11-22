import { motion } from "framer-motion";
import style from "./agreementModal.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CancelIcon } from "../../utils/svg";
function AgreementModal({ close, loading, submit }) {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate("");
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

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
    <div className={style.modalContainer}>
      <div className={style.agreementModalOverlay}></div>
      <motion.form
        onSubmit={submit}
        id="success"
        className={style.agreementModalContainer}
        variants={svgVariant}
        initial="hidden"
        animate="visible"
      >
        <button onClick={close} className={style.closeBtn}>
          <CancelIcon />
        </button>
        <h1>Data Usage Agreement</h1>
        <label className={style.checkbox}>
          <input
            type="checkbox"
            name="checkbox"
            className={style.inputCheckbox}
            checked={isChecked}
            onChange={toggleCheckbox}
          />
          <p>
            I agree to the usage of my information per the terms set forth in
            the
            {"   "}
            <a
              href="/privacy-policy"
              rel="noopener noreferrer"
              target="_blank"
              className={style.privacyPolicy}
            >
              Privacy Policy.
            </a>
          </p>
        </label>

        <div className={style.agreeMentCta}>
          <button onClick={close}>Cancel</button>
          <button type="submit" disabled={!isChecked}>
            {loading ? "Loading.." : "Continue"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}

export default AgreementModal;
