import { useNavigate } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
function RequireAuth({ children }) {
  const { logout } = useAuth();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const itemExists = localStorage.getItem("pact_web-token");
  useEffect(() => {
    if (itemExists) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [itemExists]);

  return itemExists ? <Outlet /> : <Navigate to="/" />;
}

export default RequireAuth;
