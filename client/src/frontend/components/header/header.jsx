import { Link, useNavigate } from "react-router-dom";
import style from "./header.module.css";
import { createEvent } from "../../../Apis/event/eventService";
function Header() {
  const userJSON = sessionStorage?.getItem("strecher");
  const user = JSON?.parse(userJSON);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await createEvent({
      userId: user?.id,
      event_type: "PRESSED_LOGOUT",
      note: "i pressed logout",
    });
    sessionStorage.clear("");
    navigate("/");
  };
  return (
    <div className={style.header}>
      <Link to="/" className={style.logo}>
        <img src="/assets/svgs/mayo-clinic-logo.svg" alt="logo" />
        <h1>OR-Stretch</h1>
      </Link>

      <div className={style.header__right}>
        {/* <Link className={style.link} to={"/stretch"}>
          Stretch
        </Link> */}
        <div className={style.profile}>
          <p>{user?.email}</p>
          <img src="/assets/imgs/default.jpg" alt="default profile img" />
          <div className={style.dropdown}>
            <Link to={"/profile"}>
              <ion-icon name="person-circle-outline"></ion-icon>Profile
            </Link>
            <span onClick={handleLogout}>
              <ion-icon name="log-out-outline"></ion-icon>Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
