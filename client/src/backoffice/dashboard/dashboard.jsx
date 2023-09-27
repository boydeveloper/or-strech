import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header, Sidebar } from "./components/index";
import {
  Overview,
  Users,
  AddUsers,
  ManageTags,
  ManageVideos,
} from "./pages/index";
import style from "./styles/dashboard.module.css";

function Dashboard() {
  return (
    <div className={style.dashboard__layout}>
      <Header />
      <div className={style.dashboard__main}>
        <Sidebar />

        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="users" element={<Users />} />
          <Route path="add-user" element={<AddUsers />} />
          <Route path="manage-tags" element={<ManageTags />} />
          <Route path="manage-videos" element={<ManageVideos />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
