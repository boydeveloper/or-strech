import { Link } from "react-router-dom";
import style from "./timer.module.css";
function Timer() {
  const name = localStorage.getItem("username");
  return (
    <div className={style.timer__wrapper}>
      <h1>Hi, {name} 👋🏾</h1>
      <p>
        Sorry, The stretch feature is currently under development and not
        available at the moment. We're working hard to bring it to you soon!⚒️
      </p>
      <Link to="/">Back home</Link>
    </div>
  );
}

export default Timer;
