import { Link } from "react-router-dom";

import style from "./dropdown.module.css";
import { useAuth } from "../../../../context/auth";
function Dropdown() {
  const { logout } = useAuth();
  return (
    <div className={style.quickActionsMenuBox}>
      <div className={style.quickActionsMenu}>
        <Link to={`/dashboard/profile`}>Your profile</Link>
        <Link onClick={logout} className={style.logout} to="/backoffice/login">
          LOGOUT
        </Link>
      </div>
    </div>
  );
}

export default Dropdown;
