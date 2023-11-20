import React from "react";
import style from "./button.module.css";
function Button({ textContent, click }) {
  return (
    <button onClick={click} type="button" className={style.button}>
      {textContent}
    </button>
  );
}

export default Button;
