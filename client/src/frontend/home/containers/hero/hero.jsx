import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../../../Apis/auth/loginService";
import { AgreementModal } from "../../../components/index";
import style from "./hero.module.css";

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
  const closeAgreementModal = () => {
    setModal("'");
  };
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
      if (
        loggedInUser.isSuccess === true &&
        loggedInUser?.account?.isNew === false
      ) {
        setModal("agreeModal");
        setLoading(false);
      } else if (
        loggedInUser.isSuccess === true &&
        loggedInUser?.account?.isNew === false
      ) {
        setLoading(false);
        navigate("/stretch");
      } else {
        setLoading(false);
        setError("");
        console.log(loggedInUser);
        navigate("/stretch");
      }
    } else {
      setError("Please enter a valid email address");
      setLoading(false);
    }
  };

  return (
    <>
      <section className="container">
        <div className={style.hero_wrapper}>
          <div className={style.hero_wrapper_textbox}>
            <h1>
              Surgeon Designed interoperative <strong>Stretches</strong>
            </h1>
            <p>
              The stretches aim to counteract the effects of interoperative
              strains on the surgeon's position and are performed without
              breaking scrub
            </p>
            <form onSubmit={handleSubmit} className={style.hero_cta}>
              <input
                value={email}
                onChange={handleInputEmailChange}
                type="email"
                placeholder="Enter your email"
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Start Stretching"}{" "}
              </button>
            </form>
          </div>
          <div className={style.hero_wrapper_imgbox}>
            <img src="/assets/imgs/s.png" alt="hero img" />
          </div>
        </div>
      </section>
      {modal === "agreeModal" && <AgreementModal close={closeAgreementModal} />}
    </>
  );
}

export default Hero;
