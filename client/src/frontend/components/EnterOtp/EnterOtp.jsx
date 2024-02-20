import React, { useState } from "react";
import { motion } from "framer-motion";
import OTPInput from "react-otp-input";
import style from "./enterotp.module.css";
import { CheckIcon, MailIcon } from "../../utils/svg";
function EnterOtp({ email, close, loading, handleVerifyOtp }) {
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
          <MailIcon />
        </div>
        <div className={style.containerHeading}>
          <h1>Please check your email.</h1>
          <p>
            We've sent a code to{"  "}
            <span>{email}</span>
          </p>
        </div>

        <div>
          <div className={style.otpInputContainer}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              inputType="number"
              numInputs={6}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          <div className={style.container_cta}>
            <button onClick={close} type="button">
              Cancel
            </button>
            <button onClick={() => handleVerifyOtp(email, otp)} type="submit">
              {loading ? "loading..." : "Continue"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default EnterOtp;
