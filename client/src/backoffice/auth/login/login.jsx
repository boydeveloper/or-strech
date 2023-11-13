import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./login.module.css";
import { authenticateAdmin } from "../../../Apis/auth/loginService";
import toast from "react-hot-toast";
import {} from "../../../Apis/users/userService";
import { createEvent } from "../../../Apis/event/eventService";
import { useAuth } from "../../context/auth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const initialFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const validateFormData = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const errors = validateFormData();
      if (Object.keys(errors).length > 0) {
        toast.error("Please fix the following errors:");
        setErrors(errors);
        return;
      }

      setLoading(true);

      const loginAdmin = await authenticateAdmin(formData);
      console.log(loginAdmin);
      if (loginAdmin?.isSuccess === true) {
        await login(loginAdmin.account);
        const event = await createEvent(
          {
            userid: loginAdmin?.account.id,
            event_type: "LOGIN_ADMIN",
            notes: "log in by admin",
          },
          loginAdmin.account.token
        );
        console.log(event);
        setLoading(false);
        toast.success("Login successful");
        navigate("/dashboard/overview");
      } else {
        setLoading(false);
        toast.error("Invalid credentials");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);

      // if (error.response.data.message.name === "SequelizeDatabaseError") {
      //   toast.error("sequelize error");
      //   setLoading(false);
      //   throw new Error("sequelize error");
      // }

      // console.error("An error occurred:", error);
      // toast.error(
      //   error.response ? error.response.data.message : "An error occurred"
      // );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({});

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
        <form className={style.formbox} onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className={style.inputs}>
            <label className={style.inputContainer}>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <span>E-mail</span>
              {errors.email && (
                <p className={style.errorText}>{errors.email}</p>
              )}
            </label>

            <label className={style.inputContainer}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span>Password</span>
              {errors.password && (
                <p className={style.errorText}>{errors.password}</p>
              )}
            </label>
          </div>

          <button disabled={loading} type="submit">
            {loading ? "Loading..." : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
