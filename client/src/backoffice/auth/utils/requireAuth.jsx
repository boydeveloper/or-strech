import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
function RequireAuth({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const itemExists = sessionStorage.getItem("or_user");
  useEffect(() => {
    if (itemExists) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [itemExists]);

  return itemExists ? <Outlet /> : <Navigate to="/backoffice/login" />;
}

export default RequireAuth;
