import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./frontend/home/home";
import Timer from "./frontend/timer/timer";
import { Login, Dashboard } from "./backoffice/index";
import { Toaster } from "react-hot-toast";
import {
  Overview,
  Users,
  AddUsers,
  UpdateUser,
  ManageTags,
  ManageVideos,
  UpdateTag,
  TagDetails,
} from "./backoffice/dashboard/pages/index";

import "./App.css";
function App() {
  return (
    <>
      <Router>
        <Toaster
          toastOptions={{
            className: "text-white",
            style: {
              border: "0.2rem solid #003569",
              fontFamily: "inherit",
              backgroundColor: "#003569",
              color: "#fff",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/backoffice/login" element={<Login />} />
          <Route path="/stretch" element={<Timer />} />

          <Route path="dashboard" element={<Dashboard />}>
            <Route path="users" element={<Users />} />
            <Route path="overview" element={<Overview />} />
            <Route path="add-users" element={<AddUsers />} />
            <Route path="update-user/:id" element={<UpdateUser />} />
            <Route path="update-tag/:id" element={<UpdateTag />} />
            <Route path="manage-tags" element={<ManageTags />} />
            <Route path="manage-videos" element={<ManageVideos />} />
            <Route path="manage-tags/:name" element={<TagDetails />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
