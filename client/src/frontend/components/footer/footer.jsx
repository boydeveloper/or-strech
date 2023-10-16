import { Link } from "react-router-dom";
import style from "./footer.module.css";

function Footer() {
  return (
    <div className={style.footerWrapper}>
      <div className={style.footer}>
        <div className={style.footerUp}>
          <div className={style.footerMainLinks}>
            <Link>About</Link>
            <Link>Support</Link>
            <Link>Directory</Link>
            <Link>Iterate</Link>
          </div>
          <div className={style.footer__socials}>
            <a href="">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
            <a href="">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
            <a href="">
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
          </div>
        </div>
        <div className={style.footerDown}>
          <span>&copy;2023 or-stretch .org</span>
          <div className={style.legalLinks}>
            <Link>Terms</Link>
            <Link>Cookies</Link>
            <Link>Data</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
