import { Link, useNavigate } from "react-router-dom";
import style from "./navbar.module.css";
import {
  DownIcon,
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
import {
  authenticateUser,
  checkUserIsNew,
  sendOtp,
  verifyOtp,
} from "../../../Apis/auth/loginService";
import { getAllUsers } from "../../../Apis/users/userService";
import { trigBaselineSurvey } from "../../../Apis/surveys/surveyService";
import EnterOtp from "../EnterOtp/EnterOtp";

function Navbar() {
  const [modal, setModal] = useState("");
  const token = sessionStorage.getItem("stretcher_token");
  // console.log(user);
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
    // console.log(user.id);
    await createEvent(
      {
        userid: user?.id,
        event_type: "PRESSED_LOGOUT",
        note: "i pressed logout",
      },
      token
    );
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
        await trigBaselineSurvey(email, token);

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const emailValid = validateEmail(email);
      if (emailValid) {
        const isUserNew = await checkUserIsNew(email);
        console.log(isUserNew);
        if (isUserNew?.isNew === false) {
          const loggedInUser = await authenticateUser(
            email.toLocaleLowerCase()
          );
          if (loggedInUser?.isSuccess === true) {
            const token = loggedInUser?.account?.token;
            const parse = JSON.stringify(loggedInUser?.account);
            console.log(loggedInUser);
            sessionStorage.setItem("strecher", parse);
            sessionStorage.setItem("stretcher_token", token);
            setLoading(false);
            navigate("/stretch");
          } else {
            setLoading(false);
            toast.error("Error logging in");
          }
        } else {
          try {
            const otpState = await sendOtp(email);
            console.log(otpState);
            if (otpState?.isSuccess === true) {
              setLoading(false);
              setModal("enterotp");
            } else {
              toast.error(otpState?.message?.response || otpState?.message);
            }
          } catch (error) {
            setLoading(false);
            toast.error(error.data.message);
          }
        }
      } else {
        setError("Please enter a valid email address");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  const handleVerifyOtp = async (email, otp) => {
    try {
      setLoading(true);
      const otpverified = await verifyOtp(email, otp);
      if (otpverified?.isSuccess === true) {
        setLoading(false);
        setModal("agreeModal");
      } else {
        setLoading(false);
        toast.error(otpverified?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message);
      throw error;
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
            <Link className={style.howtostretchlink_container}>
              How to stretch?
              <DownIcon />
              <div className={style.sub_menu}>
                <Link to={"/how-to-stretch"}>Between surgery</Link>
                <Link to={"/intraoperative-standing"}>
                  Intraoperative (standing)
                </Link>
                <Link to={"/inoperative-seating"}>
                  Intraoperative (seating)
                </Link>
              </div>
            </Link>

            <Link to={"/faqs"}>FAQs</Link>
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
      {modal === "enterotp" && (
        <EnterOtp
          handleVerifyOtp={handleVerifyOtp}
          email={email}
          close={() => setModal("")}
          loading={loading}
        />
      )}
    </>
  );
}

export default Navbar;
