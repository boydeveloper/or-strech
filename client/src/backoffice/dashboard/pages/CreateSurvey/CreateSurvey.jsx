import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./createsurvey.module.css";
import { createSurvey } from "../../../../Apis/surveys/surveyService";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";

function CreateSurvey() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    endpointLink: "",
    status: "disabled",
    surveyLink: "",
    Q1: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const create = await createSurvey(formData, user?.token);
      toast.success(create?.message);
      navigate("/dashboard/survey-data");
    } catch (error) {
      toast.error(error?.response.data.message);
    }
  };

  return (
    <div className={style.addSurveyWrapper}>
      <header>
        <h1>Back Office | Survey</h1>
      </header>
      <div className={style.addSurveyMain}>
        <h1>Add New Survey</h1>
        <form onSubmit={handleSubmit}>
          <label className={style.inputContainer}>
            <input
              type="text"
              name="name"
              value={formData.name}
              required
              onChange={handleInputChange}
            />
            <span>Name</span>
          </label>
          <label className={style.inputContainer}>
            <input
              type="text"
              name="endpointLink"
              value={formData.endpointLink}
              onChange={handleInputChange}
            />
            <span>Endpoint</span>
          </label>

          <div className={style.addSurveyCta}>
            <button
              type="button"
              onClick={() => navigate("/dashboard/survey-data")}
            >
              Cancel
            </button>
            <button type="submit">Add Survey</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSurvey;
