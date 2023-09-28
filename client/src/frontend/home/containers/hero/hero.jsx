import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../../../Apis/auth/loginService";
import Loader from "../../../../components/Loader";
import { AgreementModal } from "../../../components/index";
import "./hero.css";

function Hero() {
  const [email, setEmail] = useState("");
  const [pending, setLoading] = useState(false);
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
  const closeAgreementModal = () => {
    setModal("'");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const emailValid = validateEmail(email);
    if (emailValid) {
      const loggedInUser = await authenticateUser(email);
      const username = email.split("@")[0];
      localStorage.setItem("username", username);
      if (loggedInUser?.isNew === true) {
        setModal("agreeModal");
        setLoading(false);
      } else {
        setLoading(false);
        setError("");
        navigate("/stretch");
      }
    } else {
      setError("Please enter a valid email address");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="hero__wrapper">
        <div className="bg-overlay"></div>
        <div className="hero__content--wrapper">
          <div className="content__wrapper">
            <div className="hero__textbox">
              <h1 className="slide--headline">
                Surgeon-Designed <br />
                Intraoperative Stretches
              </h1>
              <p>
                The stretches aim to counteract the effects of interoperative
                strains on the surgeon's position and are performed without
                breaking scrub
              </p>
            </div>
            <form className="hero__formbox" onSubmit={(e) => handleSubmit(e)}>
              <div className="inputContainer">
                <h1>Enter email address Login</h1>
                <input
                  type="text"
                  value={email}
                  placeholder="email"
                  onChange={handleInputEmailChange}
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="hero__btn">
                {pending ? <Loader /> : "Start stretching"}
              </button>
            </form>
          </div>
        </div>
      </div>
      {modal === "agreeModal" && <AgreementModal close={closeAgreementModal} />}
    </div>
  );
}

export default Hero;
