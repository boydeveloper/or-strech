import { useState } from "react";
import styles from "./switch.module.css";

function Switch({ value, checked, onChange, key }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className={styles.switch} htmlFor={key}>
        <input
          id={key}
          type="checkbox"
          value={value}
          checked={checked}
          onChange={onChange}
          className={styles.switchInput}
          style={{ display: "none" }}
        />
        <div className={styles.sliderBox}>
          <span className={styles.slider}></span>
        </div>
      </label>
    </>
  );
}

export default Switch;
