import React, { useEffect, useState } from "react";
import style from "./timer.module.css";
import Header from "../components/header/header";
import alarmSound from "./sounds/alarm_old_20171122.mp3";
import VideoModal from "./components/videoModal/videoModal";
function Timer() {
  const [isActive, setIsActive] = useState(true);
  const [modal, setModal] = useState("");
  const toggleInterval = () => {
    setIsActive(!isActive);
  };
  const [isTimerActive, setIsTimerActive] = useState(false);

  const toggleActive = () => {
    setIsTimerActive(!isTimerActive);
  };
  const [isTimerExpired, setIsTimerExpired] = useState(false);

  const activeClass = isTimerActive ? style.active : "";
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [intervalTime, setIntervalTime] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const increaseTime = () => {
    if (minutes < 120) {
      if (!isRunning) {
        setMinutes(minutes + 15);
      }
      console.log("hiii");
      setIntervalTime(intervalTime + 15);
    }
  };

  const reset = () => {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(intervalTime);
  };
  const decreaseTime = () => {
    if (minutes > 30) {
      if (!isRunning) {
        setMinutes(minutes - 15);
      }
      setIntervalTime(intervalTime - 15);
    }
  };
  const playTimerExpiredSound = () => {
    const audio = new Audio(alarmSound);
    audio.play();
  };
  useEffect(() => {
    let interval;
    if (isRunning && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            setIsTimerExpired(true);

            console.log("hiii");
            setIsRunning(false);
            playTimerExpiredSound();
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (minutes === 0 && seconds === 0) {
      setIsRunning(false);
      playTimerExpiredSound();
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, minutes, seconds]);

  return (
    <div className={style.timer__overview}>
      <Header />
      <div className={style.timer__wrapper}>
        <div className={style.timer}>
          <div className={style.reminder_interval}>
            <div className={style.reminder_buttons}>
              <button
                disabled={minutes === 120 || intervalTime === 120}
                className={style.reminder_button_up}
                onClick={increaseTime}
              ></button>
              <button
                disabled={minutes === 0 || intervalTime === 30}
                onClick={decreaseTime}
                className={style.reminder_button_down}
              ></button>
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
              <div className={style.reminder}>
                888
                <div className={style.interval_value}>{intervalTime}</div>
              </div>
            </div>
            <p className={style.interval_text}>Set reminder interval</p>
          </div>
          <div className={style.timer_display}>
            <div className={style.timer_box}>
              <div className={style.time}>
                <div className={style.minutes}>
                  888
                  <div className={style.min}>
                    {minutes < 10 ? `0${minutes}` : minutes}
                  </div>
                  <span>Minutes</span>
                </div>
                <div className={style.dots}>:</div>
                <div className={style.seconds}>
                  88
                  <div className={style.sec}>
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </div>
                  <span>Seconds</span>
                </div>
              </div>
            </div>
            <div
              className={`${style.timer_options} ${activeClass}`}
              onClick={toggleActive}
            >
              <div className={style.counting_img}></div>
              <button className={style.reset_button} onClick={reset}>
                Reset
              </button>
              <button
                className={style.start_button}
                onClick={startTimer}
              ></button>
            </div>
          </div>
        </div>
        <div className={style.start_watching}>
          <h1 className={style.start_message}>
            Start <br />
            stretching <br />
            <span>Now!</span>
          </h1>
          <button
            className={style.go_button}
            onClick={() => setModal("video")}
          ></button>
        </div>
        <button className={style.stop_btn}>STOP/PAUSE</button>
      </div>

      {modal === "video" && (
        <VideoModal
          url={
            isActive
              ? "https://player.vimeo.com/video/129791454?color=3967c1&portrait=0&title=0&autoplay=1&badge=0&byline=0&api=1&player_id=stretchvimeoplayer"
              : "https://player.vimeo.com/video/129791455?color=3967c1&portrait=0&title=0&autoplay=1&badge=0&byline=0&api=1&player_id=stretchvimeoplayer"
          }
          cancel={() => setModal("")}
        />
      )}
    </div>
  );
}

export default Timer;
