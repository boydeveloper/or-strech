import { Link } from "react-router-dom";
import style from "./footer.module.css";

function Footer() {
  return (
    <div className={style.footerWrapper}>
      <span>&copy;2023 or-stretch .org</span>
    </div>
  );
}

export default Footer;
