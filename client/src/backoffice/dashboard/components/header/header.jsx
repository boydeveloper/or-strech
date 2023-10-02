import React from "react";
import style from "./header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className={style.dashboard__header}>
      <div className={style.header__left}>
        <button>
          <ion-icon name="menu-outline"></ion-icon>
        </button>
        <Link to={"overview"} className={style.logo}>
          <img src="/assets/svgs/mayo-clinic-logo.svg" alt="logo" />
          <h1>OR-Stretch</h1>
        </Link>
      </div>
      <div className={style.header__right}>
        <span>DUKE</span>
        <img src="/assets/imgs/defaultdoc.jpg" alt="default profile img" />
      </div>
    </div>
  );
}

export default Header;
