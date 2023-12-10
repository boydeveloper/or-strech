import React from "react";
import style from "./header.module.css";
import { Link } from "react-router-dom";
import Dropdown from "./component/dropdown";
import { useAuth } from "../../../context/auth";
import {
  Logout,
  Menu,
  Profile,
  ProfileIcon,
} from "../../../../frontend/utils/svg";

function Header({ handleSidebarToggle }) {
  const { user, logout } = useAuth();

  return (
    <div className={style.dashboard__header}>
      <div className={style.header__left}>
        <button onClick={handleSidebarToggle}>
          <Menu />
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
            <ProfileIcon />
            Your profile
          </Link>
          <Link
            onClick={logout}
            className={style.logout}
            to="/backoffice/login"
          >
            <Logout />
            LOGOUT
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
