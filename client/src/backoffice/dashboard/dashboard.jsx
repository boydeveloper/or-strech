import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "./components/index";
import style from "./styles/dashboard.module.css";

function Dashboard() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <div className={style.dashboard__layout}>
      <Header handleSidebarToggle={toggleSidebar} />
      <div className={`${openSidebar && style.open} ${style.dashboard__main}`}>
        <Sidebar openSidebar={openSidebar} />
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
