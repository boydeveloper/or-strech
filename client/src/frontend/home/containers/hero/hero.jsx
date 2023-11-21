import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../../../Apis/auth/loginService";
import { AgreementModal } from "../../../components/index";
import style from "./hero.module.css";
import { createEvent } from "../../../../Apis/event/eventService";
import LoginModal from "./components/loginModal";
import { getAllUsers } from "../../../../Apis/users/userService";
import toast from "react-hot-toast";

function Hero() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState("");
  const navigate = useNavigate();
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
        console.log(userExists);
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
          console.log("hiii");
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
      <div className={style.hero_wrapper}>
        <div className={style.overlay}></div>
        <h1>
          Surgeon.Designed. <br /> Interoperative Stretches.
        </h1>
        <p>
          The stretches aim to counteract the effects of interoperative strains
          on the surgeon's position and are performed without breaking a scrub💪🏾
        </p>
        <button
          onClick={() => (user ? navigate("/stretch") : setModal("login"))}
        >
          Start Stretching
        </button>
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

export default Hero;
