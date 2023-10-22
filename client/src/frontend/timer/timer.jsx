import React, { useState } from "react";
import style from "./timer.module.css";

function Timer() {
  const [isActive, setIsActive] = useState(true);

  const toggleInterval = () => {
    setIsActive(!isActive);
  };
  const [isTimerActive, setIsTimerActive] = useState(false);

  const toggleActive = () => {
    setIsTimerActive(!isTimerActive);
  };

  const activeClass = isTimerActive ? style.active : "";
  return (
    <div className={style.timer__overview}>
      <div className={style.timer__wrapper}>
        <div className={style.timer}>
          <div className={style.reminder_interval}>
            <div className={style.reminder_buttons}>
              <button className={style.reminder_button_up}></button>
              <button className={style.reminder_button_down}></button>
            </div>
            <div
              className={
                isActive ? `${style.standing} ${style.active}` : style.standing
              }
              onClick={toggleInterval}
            >
              standing
            </div>
            <div
              className={
                !isActive ? `${style.seated} ${style.active}` : style.seated
              }
              onClick={toggleInterval}
            >
              seated
            </div>
            <div className={style.reminder_display}>
              888
              <div className={style.interval_value}>90</div>
            </div>
            <p className={style.interval_text}>Set reminder interval</p>
          </div>
          <div className={style.timer_display}>
            <div className={style.timer_box}>
              <div className={style.time}>
                <div className={style.minutes}>
                  888
                  <div className={style.min}>90</div>
                  <span>Minutes</span>
                </div>
                <div className={style.dots}>:</div>
                <div className={style.seconds}>
                  88
                  <div className={style.sec}>00</div>
                  <span>Seconds</span>
                </div>
              </div>
            </div>
            <div
              className={`${style.timer_options} ${activeClass}`}
              onClick={toggleActive}
            >
              <div className={style.counting_img}></div>
              <button className={style.reset_button}>Reset</button>
              <button className={style.start_button}></button>
            </div>
          </div>
        </div>
        <div className={style.start_watching}>
          <h1 className={style.start_message}>
            Start <br />
            stretching <br />
            <span>Now!</span>
          </h1>
          <button className={style.go_button}></button>
        </div>
        <button className={style.stop_btn}>STOP/PAUSE</button>
      </div>
    </div>
  );
}

export default Timer;
