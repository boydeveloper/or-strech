import React, { useState } from "react";
import { motion } from "framer-motion";
import OTPInput from "react-otp-input";
import style from "./verifyotp.module.css";
import { CheckIcon } from "../../utils/svg";
function VerifyOtp() {
  // const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState("");
  const isCodeComplete = otp.length === 4;

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
    <div className={style.modalContainer}>
      <motion.div
        variants={popAnimation}
        initial="hidden"
        animate="visible"
        className={style.container}
      >
        <div className={style.container_icon}>
          <CheckIcon />
        </div>
        <div className={style.containerHeading}>
          <h1>Verify Otp</h1>
          <p>
            Verify otp code sent to your mail
            {/* <span>danielonazi116@gmail.com</span> */}
          </p>
        </div>

        <div>
          <div className={style.otpInputContainer}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              inputType="number"
              numInputs={4}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          <div className={style.container_cta}>
            <button type="button">Cancel</button>
            <button type="submit">Continue</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default VerifyOtp;
