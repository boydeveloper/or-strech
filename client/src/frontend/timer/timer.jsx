import { Link } from "react-router-dom";
import style from "./timer.module.css";
function Timer() {
  const name = localStorage.getItem("username");
  return (
    <div className={style.timerOverview}>
      <div className={style.timer__wrapper}>
        <div className={style.timer_panel}>
          <div>
            <ion-icon name="man"></ion-icon>
            <p>Standing</p>
          </div>
          <div>
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
          <button></button>
        </div>
        <div className={style.go_box}>
          <div>
            <h1>
              START <br /> STRETCHING <br />
              <span>NOW!</span>
            </h1>
          </div>
          <button>
            <span></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
