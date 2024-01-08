import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
function RequireAuthStretch({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const itemExists = sessionStorage.getItem("stretcher_token");
  useEffect(() => {
    if (itemExists) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [itemExists]);

  return itemExists ? <Outlet /> : <Navigate to="/" />;
}

export default RequireAuthStretch;
