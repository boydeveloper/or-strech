import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../../../Apis/auth/loginService";
import { AgreementModal } from "../../../components/index";
import style from "./hero.module.css";
import { createEvent } from "../../../../Apis/event/eventService";
import LoginModal from "./components/loginModal";
import { getAllUsers } from "../../../../Apis/users/userService";
import toast from "react-hot-toast";
import { trigBaselineSurvey } from "../../../../Apis/surveys/surveyService";

function Hero() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState("");
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
      console.log(loggedInUser);
      if (loggedInUser?.isSuccess === true) {
        const trig = await trigBaselineSurvey(email);
        console.log(trig);
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
        // console.log(loggedInUser);
        console.log(email);
        const userExists = users?.find(
          (user) =>
            user?.email.toLocaleLowerCase() === email.toLocaleLowerCase()
        );
        // Hallbeck.Susan@mayo.edu
        // hallbeck.susan@mayo.edu

        console.log(users);

        if (userExists) {
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
          setLoading(false);
          console.log(userExists);
          setModal("agreeModal");
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

  return (
    <>
      <div className={style.hero_wrapper}>
        <div className={style.overlay}></div>
        <h1>
          Surgeon.Designed. <br /> Interoperative Stretches.
        </h1>
        <p>
          The stretches aim to counteract the effects of interoperative strains
          on the surgeon's position and are performed without breaking a scrub.
        </p>
        <button
          onClick={() => (user ? navigate("/stretch") : setModal("login"))}
        >
          Start Stretching
        </button>
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

export default Hero;
