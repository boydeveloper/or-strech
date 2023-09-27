import style from "./agreementModal.module.css";

function AgreementModal() {
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
      <motion.div
        id="success"
        className={style.successModalContainer}
        variants={svgVariant}
        initial="hidden"
        animate="visible"
      >
        <div>
          <div>
            <h1>Data Usage Agreement</h1>
            <label className={style.checkbox_container}>
              <input type="checkbox" className={style.checkbox_input} />
              <span className={style.checkbox_checkmark}></span>
              <span className={style.checkbox_label}>
                I agree to the usage of my information per the terms set forth
                in the Privacy Policy.
              </span>
            </label>
            <div>
              <button>Cancel</button>
              <button>Continue</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AgreementModal;
