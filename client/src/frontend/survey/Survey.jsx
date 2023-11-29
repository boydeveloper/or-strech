import { Footer, Navbar } from "../components";
import style from "./survey.module.css";
function Survey() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className={style.surveyPageWrapper}>
          <div className={style.survey_imgbox}></div>
          <h1>Thank you for using OR-Stretch and completing survey.</h1>
          <p>We appreciate your help with this new stretching experience.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Survey;
