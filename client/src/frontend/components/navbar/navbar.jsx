import { Link, useNavigate } from "react-router-dom";
import style from "./navbar.module.css";
import { Hamburger, Print, Profile } from "../../utils/svg";
import { createEvent } from "../../../Apis/event/eventService";

function Navbar() {
  const userJSON = sessionStorage?.getItem("strecher");
  const user = JSON?.parse(userJSON);
  const navigate = useNavigate();
  const handleLogout = async () => {
    // await createEvent({
    //   userid: user?.id,
    //   event_type: "PRESSED_LOGOUT",
    //   note: "i pressed logout",
    // });
    sessionStorage.clear("");
    navigate("/");
  };
  return (
    <div className={style.naviagtion_Wrapper}>
      <div className={style.navigation}>
        <Link to={"/"} className={style.logo}>
          <img src="/assets/svgs/mayo-clinic-logo.svg" alt="" />
          <span>OR-stretch</span>
        </Link>
        <div className={style.naviagtion_links}>
          <Link to={"/"} className={style.navLogo}>
            <img src="/assets/svgs/mayo-clinic-logo.svg" alt="" />
          </Link>
          <Link to={"/"}>Home</Link>
          <Link to="/about">About</Link>
          <Link to={"/how-to-stretch"}>How to stretch?</Link>
          {/* <Link>Stretch</Link> */}
          <Link to={"/faqs"}>Faqs</Link>
        </div>

        <button>
          {user ? (
            <div className={style.profile}>
              <Profile />
              <p>{user?.email}</p>

              {/* <Hamburger /> */}
              <div className={style.dropdown}>
                <Link to={"/profile"}>
                  <ion-icon name="person-circle-outline"></ion-icon>Profile
                </Link>
                <span onClick={handleLogout}>
                  <ion-icon name="log-out-outline"></ion-icon>Logout
                </span>
              </div>
            </div>
          ) : (
            <button>Start Stretching</button>
            // <Hamburger />
            // <button>stretch</button>
          )}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
