import { Navbar } from "../components";
import style from "./error.module.css";

function ErrorPage() {
  return (
    <>
      <Navbar />
      <div className={style.error_page}>
        <h1>Page has been moved or is under construction⚒️</h1>
      </div>
    </>
  );
}

export default ErrorPage;
