import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../../../Apis/auth/loginService";
import { AgreementModal } from "../../../components/index";
import style from "./hero.module.css";
import { createEvent } from "../../../../Apis/event/eventService";
import LoginModal from "./components/loginModal";

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
  const closeModal = () => {
    setModal("");
  };
  const userJSON = sessionStorage?.getItem("strecher");
  const user = JSON?.parse(userJSON);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const emailValid = validateEmail(email);
    if (emailValid) {
      const loggedInUser = await authenticateUser(email);
      console.log(loggedInUser);
      const token = loggedInUser?.account?.token;
      const parse = JSON.stringify(loggedInUser?.account);
      sessionStorage.setItem("strecher", parse);
      sessionStorage.setItem("stretcher_token", token);
      if (loggedInUser?.isSuccess === true) {
        // console.log()
        const event = await createEvent(
          {
            userid: loggedInUser?.account?.id,
            event_type: "ENTERED_CSTRETCH",
            notes: "entered cstretch",
          },
          token
        );
        console.log(event);
        setLoading(false);
        if (loggedInUser?.account?.isNew === true) {
          setLoading(false);
          setModal("agreeModal");
        } else if (loggedInUser?.account?.isNew === false) {
          setLoading(false);
          console.log("/hjffffff");
          navigate("/stretch");
        }
      } else {
        toast.error("error logging in");
        setLoading(false);
      }
    } else {
      setError("Please enter a valid email address");
      setLoading(false);
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
          close={closeModal}
          submit={handleSubmit}
          value={email}
          emailChange={handleInputEmailChange}
        />
      )}

      {modal === "agreeModal" && <AgreementModal close={closeModal} />}
    </>
  );
}

export default Hero;
