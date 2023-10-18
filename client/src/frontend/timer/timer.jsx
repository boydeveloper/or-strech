import { Link } from "react-router-dom";
import style from "./timer.module.css";
import { useState } from "react";
function Timer() {
  const name = localStorage.getItem("username");
  const [isActive, setIsActive] = useState(true);

  const toggleActive = () => {
    setIsActive(!isActive);
  };
  return (
    <div className={style.timerOverview}>
      <div className={style.timer__wrapper}>
        <div className={style.timer_panel}>
          <div
            className={isActive ? style.active_position : ""}
            onClick={toggleActive}
          >
            <ion-icon name="man"></ion-icon>
            <p>Standing</p>
          </div>
          <div
            className={!isActive ? style.active_position : ""}
            onClick={toggleActive}
          >
            <span class="material-symbols-outlined">
              airline_seat_recline_normal
            </span>
            <p>Seated</p>
          </div>
          <div>
            <h1>00</h1>
            <span>Set Reminder Interval</span>
            <div className={style.timer_switches}>
              <button>
                <ion-icon name="caret-up"></ion-icon>
              </button>
              <button>
                <ion-icon name="caret-down"></ion-icon>
              </button>
            </div>
          </div>
        </div>
        <div className={style.timer_box}>
          <div className={style.time}>
            <div className={style.minutes}>
              <h1>90</h1>
              <span>Minutes</span>
            </div>
            :
            <div className={style.seconds}>
              <h1>00</h1>
              <span>Seconds</span>
            </div>
          </div>
          <button>START!</button>
        </div>
        <div className={style.go_box}>
          <div>
            <h1>
              START <br /> STRETCHING <br />
              <span>NOW!</span>
            </h1>
          </div>
          <button>
            <span>GO!</span>
          </button>
        </div>

        <button className={style.pauseButton}>STOP/PAUSE</button>
      </div>
    </div>
  );
}

export default Timer;
