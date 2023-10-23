import { Link } from "react-router-dom";
import style from "./header.module.css";
function Header() {
  return (
    <div className={style.header}>
      <Link to="/" className={style.logo}>
        <img src="/assets/svgs/mayo-clinic-logo.svg" alt="logo" />
        <h1>OR-Stretch</h1>
      </Link>
      <div className={style.header__right}>
        <img src="/assets/imgs/defaultdoc.jpg" alt="default profile img" />
        <div className={style.dropdown}>
          <Link>
            <ion-icon name="person-circle-outline"></ion-icon>Profile
          </Link>
          <span>
            <ion-icon name="log-out-outline"></ion-icon>Logout
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
