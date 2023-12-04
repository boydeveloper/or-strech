import { Footer, Navbar } from "../components";
import style from "./survey.module.css";
function Survey() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className={style.surveyPageWrapper}>
          <div className={style.survey_imgbox}>
            <img src="/assets/imgs/dang.jpg" alt="surgeons shaking hands" />
          </div>
          <h1>Thank you for using OR-Stretch and completing survey.</h1>
          <p>
            Thank you sincerely for participating in our OR-Stretch program and
            taking the time to complete the survey. Your valuable insights and
            feedback are instrumental in enhancing this innovative stretching
            experience.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Survey;
