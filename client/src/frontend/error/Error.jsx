import { useParams } from "react-router-dom";
import { Navbar } from "../components";
import style from "./error.module.css";

function ErrorPage({}) {
  const { title } = useParams();
  return (
    <>
      <Navbar />
      <div className={style.error_page}>
        <h1>{title} has been moved or is under construction⚒️</h1>
      </div>
    </>
  );
}

export default ErrorPage;
