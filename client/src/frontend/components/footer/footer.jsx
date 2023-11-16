import React, { useState, useEffect } from "react";
import style from "./footer.module.css";

function Footer() {
  const [currentTime, setCurrentTime] = useState(getFormattedTime());
  const [dotColor, setDotColor] = useState("#000");
  const [cityInitials, setCityInitials] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const formattedTime = getFormattedTime();
      setCurrentTime(formattedTime);

      const seconds = new Date().getSeconds();
      setDotColor(getDotColor(seconds));
    }, 1000);

    // Get user's time zone
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Get user's city initials from the time zone
    const cityArray = userTimeZone.split("/");
    if (cityArray.length === 2) {
      const cityName = cityArray[1].replace(/_/g, " ");
      setCityInitials(cityName.toUpperCase());
    }

    return () => clearInterval(intervalId);
  }, []);

  function getFormattedTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? " PM" : " AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes}${ampm}`;
  }

  function getDotColor(seconds) {
    const colorIndex = Math.floor(seconds / 0.5) % 3;
    const colors = ["#ff0000", "#094bac", "#000"];

    return colors[colorIndex];
  }

  return (
    <div className={style.footerWrapper}>
      <div className={style.footer}>
        <p>&copy;OR-Stretch {new Date().getFullYear()}</p>

        <span>
          <div
            className={style.time_dot}
            style={{
              background: dotColor,
            }}
          ></div>
          {currentTime}, {cityInitials && `${cityInitials}`}.
        </span>
      </div>
    </div>
  );
}

export default Footer;
