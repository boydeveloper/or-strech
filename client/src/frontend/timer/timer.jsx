import React, { useEffect, useState } from "react";
import style from "./timer.module.css";
import Header from "../components/header/header";
import alarmSound from "./sounds/alarm_old_20171122.mp3";
import VideoModal from "./components/videoModal/videoModal";
import TimerStoppedModal from "./components/timerStoppedModal/TimerStoppedModal";
import { createEvent } from "../../Apis/event/eventService";
import { getVideoLinks } from "../../Apis/video/videoService";

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
  const [snoozeClicked, setSnoozeClicked] = useState(false);
  const [intervalTime, setIntervalTime] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [links, setLinks] = useState(null);
  const token = sessionStorage.getItem("stretcher_token");
  const userJSON = sessionStorage.getItem("strecher");
  const user = JSON.parse(userJSON);
  const startTimer = async () => {
    await createEvent(
      {
        userId: user?.id,
        event_type: "PRESSED_START",
        notes: "i hit the start button",
      },
      token
    );
    setIsRunning(true);
    setIsTimerActive(true);
  };

  const stopTimer = async () => {
    setIsRunning(false);
    await createEvent({
      userId: user?.id,
      event_type: "PRESSED_STOP",
      notes: "i hit the stop button",
    });
  };

  const handlePause = () => {
    setModal("pause/stop");
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

  const reset = async () => {
    setIsRunning(false);
    setIsTimerActive(false);
    setSeconds(0);
    setMinutes(intervalTime);
    await createEvent({
      userId: user?.id,
      event_type: "RESET",
      notes: "i hit the reset button",
    });
  };

  const [toggleClass, setToggleClass] = useState(true);

  const reminders = [5, 10, 15, 20, 25, 30, 35, 40, 45];

  const [selectedReminder, setSelectedReminder] = useState(reminders[0]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const decreaseTime = () => {
    if (minutes > 30) {
      if (!isRunning) {
        setMinutes(minutes - 15);
      }
      setIntervalTime(intervalTime - 15);
    }
  };

  let audio;

  const playTimerExpiredSound = async () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    } else {
      audio = new Audio(alarmSound);
      await createEvent({
        userId: user?.id,
        event_type: "FIRED_ALARM",
        notes: "fired alarm",
      });
    }
  };
  const getLinks = async () => {
    const links = await getVideoLinks(user?.token);
    console.log(links);
    if (links?.isSuccess === true) {
      setLinks(links?.links);
    }
  };
  const seatedVideo = links?.find(
    (video) => video?.name?.toLowerCase() === "seated"
  );
  const standingVideo = links?.find(
    (video) => video?.name?.toLowerCase() === "standing"
  );

  const handleGO = async () => {
    await createEvent(
      {
        userId: user?.id,
        event_type: "PRESSED_GO",
        notes: " i pressed the go button",
      },
      token
    );
    setModal("video");
  };
  console.log(links);
  useEffect(() => {
    getLinks();
    let interval;
    if (isRunning && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            setIsTimerExpired(true);

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
    if (!isRunning && minutes === 0 && seconds === 0) {
      setInterval(() => {
        setToggleClass((prevToggleClass) => !prevToggleClass);
      }, 100);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning, minutes, seconds]);

  const selectReminder = (time) => {
    setSelectedReminder(time);
    setDropdownVisible(false);
  };

  const handleSnooze = async () => {
    setIsRunning(false);
    setIsTimerActive(false);
    setMinutes(selectedReminder);
    console.log(selectedReminder);
    setToggleClass(!toggleClass);
    setSeconds(0);
    setSnoozeClicked(true);
    await createEvent({
      userId: user?.id,
      event_type: "SNOOZE",
      notes: "i hit the snooze button",
    });
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };
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
                  <div
                    className={
                      snoozeClicked
                        ? style.min
                        : toggleClass
                        ? style.min
                        : `${style.alarm} ${style.min}`
                    }
                  >
                    {minutes < 10 ? `0${minutes}` : minutes}
                  </div>
                  <span>Minutes</span>
                </div>
                <div className={style.dots}>:</div>
                <div className={style.seconds}>
                  88
                  <div
                    className={
                      snoozeClicked
                        ? style.sec
                        : toggleClass
                        ? style.sec
                        : `${style.alarm} ${style.sec}`
                    }
                  >
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </div>
                  <span>Seconds</span>
                </div>
              </div>
            </div>
            <div className={`${style.timer_options} ${activeClass}`}>
              {isRunning && (
                <>
                  <div className={style.counting_img}></div>
                  <button className={style.reset_button} onClick={reset}>
                    Reset
                  </button>
                </>
              )}
              {!isRunning && minutes === 0 && seconds === 0 && (
                <>
                  <div>
                    <h1 className={style.remind_me_in}>Remind Me in</h1>
                  </div>
                  <div className={style.selectricWrapper}>
                    <div
                      className={style.selectric}
                      onClick={() => setDropdownVisible((prev) => !prev)}
                    >
                      <div className={style.data}>{selectedReminder} Min</div>
                      <button className={style.selectric_button}>▾</button>
                    </div>
                    {dropdownVisible && (
                      <div className={style.selectricItems}>
                        {reminders.map((reminder) => (
                          <div
                            key={reminder}
                            onClick={() => selectReminder(reminder)}
                          >
                            {reminder} Min
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      className={style.reset_button}
                      onClick={handleSnooze}
                    >
                      SNOOZE
                    </button>
                  </div>
                </>
              )}
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
          <button className={style.go_button} onClick={handleGO}></button>
        </div>
        <button onClick={handlePause} className={style.stop_btn}>
          STOP/PAUSE
        </button>
      </div>
      {modal === "video" && (
        <VideoModal
          url={!isActive ? standingVideo.url : seatedVideo.url}
          cancel={async () => {
            setModal("");

            await createEvent(
              {
                userId: user.id,
                event_type: "DONE_STRETCHING",
                notes: "done stretching",
              },
              token
            );
          }}
        />
      )}
      {modal === "pause/stop" && (
        <TimerStoppedModal
          stopTimer={stopTimer}
          cancel={() => {
            setModal("");
            setIsRunning(true);
          }}
        />
      )}
    </div>
  );
}

export default Timer;
