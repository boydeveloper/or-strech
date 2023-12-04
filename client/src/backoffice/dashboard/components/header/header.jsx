import React from "react";
import style from "./header.module.css";
import { Link } from "react-router-dom";
import Dropdown from "./component/dropdown";
import { useAuth } from "../../../context/auth";
import { Profile } from "../../../../frontend/utils/svg";

function Header({ handleSidebarToggle }) {
  const { user, logout } = useAuth();

  return (
    <div className={style.dashboard__header}>
      <div className={style.header__left}>
        <button onClick={handleSidebarToggle}>
          <ion-icon name="menu-outline"></ion-icon>
        </button>
        <Link to={"overview"} className={style.logo}>
          <img src="/assets/svgs/mayo-clinic-logo.svg" alt="logo" />
          <h1>OR-Stretch</h1>
        </Link>
      </div>
      <div className={style.header__right}>
        <span>{user?.email}</span>
        <Profile fill={"#00365a"} />

        <div className={style.quickActionsMenu}>
          <Link to={`/dashboard/profile`}>
            <ion-icon name="person-circle-outline"></ion-icon> Your profile
          </Link>
          <Link
            onClick={logout}
            className={style.logout}
            to="/backoffice/login"
          >
            <ion-icon name="log-out-outline"></ion-icon>
            LOGOUT
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
