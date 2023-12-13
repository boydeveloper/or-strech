import { Link, useNavigate } from "react-router-dom";
import style from "./navbar.module.css";
import {
  Hamburger,
  Logout,
  MayoLogo,
  Print,
  Profile,
  ProfileIcon,
} from "../../utils/svg";
import { createEvent } from "../../../Apis/event/eventService";
import { useState } from "react";
import AgreementModal from "../agreementModal/agreementModal";
import LoginModal from "../../home/containers/hero/components/loginModal";
import toast from "react-hot-toast";
import { authenticateUser } from "../../../Apis/auth/loginService";
import { getAllUsers } from "../../../Apis/users/userService";

function Navbar() {
  const [modal, setModal] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogout = async () => {
    console.log(user.id);
    await createEvent({
      userid: user?.id,
      event_type: "PRESSED_LOGOUT",
      note: "i pressed logout",
    });
    sessionStorage.clear("");
    navigate("/");
  };

  const handleOpenNav = () => {
    setIsNavOpen(true);
  };
  const handleCloseNav = () => {
    setIsNavOpen(false);
  };
  const handleInputEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Email validation
    setEmailError(
      newEmail.trim() === ""
        ? "Email address cannot be empty"
        : validateEmail(newEmail)
        ? ""
        : "Please enter a valid email address"
    );
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
  const userJSON = sessionStorage?.getItem("strecher");
  const user = JSON?.parse(userJSON);

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
        setError("Please enter a valid email address");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <div
        className={`${style.naviagtion_Wrapper} ${isNavOpen ? style.open : ""}`}
      >
        <div className={style.navigation}>
          <div className={style.logoWrapper}>
            <button onClick={handleOpenNav} className={style.menuBtn}>
              <Hamburger />
            </button>
            <Link to={"/"} className={style.logo}>
              <img src="/assets/svgs/mayo-clinic-logo.svg" alt="" />
              <span>OR-stretch</span>
            </Link>
          </div>
          {isNavOpen && (
            <div onClick={handleCloseNav} className={style.overlay}></div>
          )}
          <div className={style.naviagtion_links}>
            <Link to={"/"} className={style.navLogo}>
              <MayoLogo />
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
                    <ProfileIcon />
                    Profile
                  </Link>
                  <span onClick={handleLogout}>
                    <Logout /> Logout
                  </span>
                </div>
              </div>
            ) : (
              <button
                className={style.cta}
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
          value={email}
          onChange={handleInputEmailChange}
          onSubmit={handleSubmit}
          onClose={() => setModal("")}
          loading={loading}
          emailError={emailError}
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
