import { Link, useNavigate } from "react-router-dom";
import style from "./navbar.module.css";
import { Hamburger, Print, Profile } from "../../utils/svg";
import { createEvent } from "../../../Apis/event/eventService";
import { useState } from "react";
import AgreementModal from "../agreementModal/agreementModal";
import LoginModal from "../../home/containers/hero/components/loginModal";
import toast from "react-hot-toast";
import { authenticateUser } from "../../../Apis/auth/loginService";
import { getAllUsers } from "../../../Apis/users/userService";

function Navbar() {
  const userJSON = sessionStorage?.getItem("strecher");
  const user = JSON?.parse(userJSON);
  const [modal, setModal] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleInputEmailChange = (event) => {
    const newEmail = event.target.value;
    setError("");
    setEmail(newEmail);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleIsNewModal = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const loggedInUser = await authenticateUser(email);
      if (loggedInUser?.isSuccess === true) {
        const token = loggedInUser?.account?.token;
        const parse = JSON.stringify(loggedInUser?.account);
        sessionStorage.setItem("strecher", parse);
        sessionStorage.setItem("stretcher_token", token);
        setLoading(false);
        navigate("/stretch");
      } else {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      const emailValid = validateEmail(email);
      if (emailValid) {
        const users = await getAllUsers();
        const userExists = users?.find((user) => user?.email === email);

        if (userExists) {
          const loggedInUser = await authenticateUser(email);
          if (loggedInUser?.isSuccess === true) {
            const token = loggedInUser?.account?.token;
            const parse = JSON.stringify(loggedInUser?.account);
            sessionStorage.setItem("strecher", parse);
            sessionStorage.setItem("stretcher_token", token);
            setLoading(false);
            navigate("/stretch");
          } else {
            setLoading(false);
            toast.error("Error logging in");
          }
        } else {
          setLoading(false);
          setModal("agreeModal");
        }
      } else {
        setLoading(false);
        setError("Please enter a valid email address");
      }
    } catch (error) {
      setLoading(false);
      console.log("jiiii");
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
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

          <div>
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
              <button
                onClick={() =>
                  user ? navigate("/stretch") : setModal("login")
                }
              >
                Start Stretching
              </button>
            )}
          </div>
        </div>
      </div>
      {modal === "login" && (
        <LoginModal
          loading={loading}
          close={() => setModal("")}
          submit={handleSubmit}
          value={email}
          emailChange={handleInputEmailChange}
        />
      )}

      {modal === "agreeModal" && (
        <AgreementModal
          close={() => setModal("")}
          loading={loading}
          submit={handleIsNewModal}
        />
      )}
    </>
  );
}

export default Navbar;
