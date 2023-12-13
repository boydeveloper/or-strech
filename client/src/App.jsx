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
  AddVideos,
  Profile,
  UserActivities,
  UpdateVideos,
} from "./backoffice/dashboard/pages/index";
import ScrollToTop from "./frontend/utils/functions/scrollToTop";

import "./App.css";
import RequireAuth from "./backoffice/auth/utils/requireAuth";
import { AuthProvider } from "./backoffice/context/auth";
import StretcherProfile from "./frontend/profile/StretcherProfile";
// import HowToStretch from "./frontend/instructions/HowToStretch";
import Stretches from "./frontend/stretches/Stretches";
import Faqs from "./frontend/faqs/Faqs";
import PrivacyPolicy from "./frontend/privacypolicy/PrivacyPolicy";
import SurveyData from "./backoffice/dashboard/pages/surveyData/SurveyData";
import Survey from "./frontend/survey/Survey";
import AboutPage from "./frontend/about/AboutPage";
function App() {
  return (
    <AuthProvider>
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
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/backoffice/login" element={<Login />} />
            <Route path="/stretch" element={<Timer />} />
            {/* <Route */}
            {/* <Route path="/about" element={<AboutPage />} /> */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/profile" element={<StretcherProfile />} />
            <Route path="/how-to-stretch" element={<Stretches />} />
            <Route path="/faqs" element={<Faqs />} />
            {/* <Route element={<RequireAuth />}> */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/thankyou" element={<Survey />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />} />
              <Route path="survey-data" element={<SurveyData />} />
              <Route path="users-activities" element={<UserActivities />} />
              <Route path="overview" element={<Overview />} />
              <Route path="add-videos" element={<AddVideos />} />
              <Route path="add-users" element={<AddUsers />} />
              <Route path="update-user/:id" element={<UpdateUser />} />
              <Route path="update-tag/:id" element={<UpdateTag />} />
              <Route
                path="manage-videos/:linkName"
                element={<UpdateVideos />}
              />
              <Route path="manage-tags" element={<ManageTags />} />
              <Route path="manage-videos" element={<ManageVideos />} />
              <Route path="manage-tags/:name" element={<TagDetails />} />
              <Route path="profile" element={<Profile />} />
              {/* <Route path="profile" element={<Profile />} /> */}
            </Route>
            {/* </Route> */}
          </Routes>
        </ScrollToTop>
      </Router>
    </AuthProvider>
  );
}

export default App;
