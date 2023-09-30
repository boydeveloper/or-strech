import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "./components/index";
import style from "./styles/dashboard.module.css";

function Dashboard() {
  return (
    <div className={style.dashboard__layout}>
      <Header />
      <div className={style.dashboard__main}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
