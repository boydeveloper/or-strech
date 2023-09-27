import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./frontend/home/home";
import Timer from "./frontend/timer/timer";
import { Login, Dashboard } from "./backoffice/index";
import { Overview } from "./backoffice/dashboard/pages";
import { Toaster } from "react-hot-toast";
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
          <Route path="/backoffice/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
