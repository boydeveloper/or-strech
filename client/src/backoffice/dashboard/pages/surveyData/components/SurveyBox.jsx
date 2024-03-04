import { Link } from "react-router-dom";
import {
  Create,
  Magnifier,
  MegaPhone,
  TrashIcon,
} from "../../../../../frontend/utils/svg";
import style from "./surveybox.module.css";

function SurveyBox({ survey, deleteSurvey, edit }) {
  return (
    <div className={style.survey_box}>
      <div className={style.icon_container}>
        <MegaPhone />
      </div>
      <h1>{survey?.name}</h1>
      <div className={style.cta}>
        <button onClick={edit}>
          <Create />
        </button>
        <button onClick={deleteSurvey}>
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}

export default SurveyBox;
