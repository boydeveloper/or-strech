import { Link, useNavigate } from "react-router-dom";
import style from "./login.module.css";

function Login() {
  const navigate = useNavigate();
  return (
    <div className={style.auth__wrapper}>
      <div className={style.auth__card}>
        <div className={style.img__box}>
          <div className={style.img__bg}></div>
          <div className={style.login__textbox}>
            <h1>OR-Stretch Back Office</h1>
            <p>Please use your credentials to login.</p>
          </div>
        </div>
        <form className={style.formbox}>
          <h1>Login</h1>
          <div className={style.inputs}>
            <label class={style.inputContainer}>
              <input type="text" />
              <span>E-mail</span>
            </label>
            <label class={style.inputContainer}>
              <input type="text" />
              <span>Password</span>
            </label>
          </div>

          <button onClick={() => navigate("/backoffice/dashboard")}>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
