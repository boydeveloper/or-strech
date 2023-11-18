import { motion } from "framer-motion";
import style from "./agreementModal.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CancelIcon } from "../../utils/svg";
function AgreementModal({ close }) {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate("");
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  const agreed = () => {
    if (isChecked) {
      navigate("/stretch");
    }
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
      <motion.div
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
              target="__blank"
              href="https://www.mayo.edu/research/labs/human-factors-engineering/or-stretch/or-stretch-privacy-policy"
              className={style.privacyPolicy}
            >
              Privacy Policy.
            </a>
          </p>
        </label>

        <div className={style.agreeMentCta}>
          <button onClick={close}>Cancel</button>
          <button onClick={agreed} disabled={!isChecked}>
            Continue
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default AgreementModal;
