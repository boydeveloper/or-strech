import { useNavigate, useParams } from "react-router-dom";
import { Switch } from "../../components";
import style from "./editsurvey.module.css";
import { useEffect, useState } from "react";
import {
  getAllCustomSurveys,
  updateSurvey,
} from "../../../../Apis/surveys/surveyService"; // Make sure to import updateSurvey or your relevant update function
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";

function EditSurvey() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  // const history = useHistory();

  const [survey, setSurvey] = useState(null);
  const [formData, setFormData] = useState({
    id,
    name: "",
    endpointLink: "",
    status: "disabled",
    surveyLink: "",
    Q1: "",
  });

  const getSurveyToBeUpdated = async () => {
    try {
      if (user?.token) {
        const csurveys = await getAllCustomSurveys(user?.token);
        const surveyToBeUpdated = csurveys?.surveys?.find(
          (survey) => survey?.id === Number(id)
        );
        setSurvey(surveyToBeUpdated);
        setFormData({
          id: surveyToBeUpdated?.id,
          name: surveyToBeUpdated?.name,
          endpointLink: surveyToBeUpdated?.endpointLink,
          status: surveyToBeUpdated?.status,
          surveyLink: surveyToBeUpdated?.surveyLink,
          Q1: surveyToBeUpdated?.Q1,
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user?.token) {
        // Call your update function here, passing formData
        console.log(formData);
        const surveyUpdate = await updateSurvey(user?.token, id, formData);
        toast.success(surveyUpdate?.message);
        navigate("/dashboard/survey-data");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data.message);
    }
  };
  const handleSwitchChange = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      status: prevFormData.status === "enabled" ? "disabled" : "enabled",
    }));
  };
  useEffect(() => {
    getSurveyToBeUpdated();
  }, [user?.token]);

  return (
    <div className={style.EditSurveyWrapper}>
      <header className={style.EditSurveyHeader}>
        <h1>Back Office | Edit Survey</h1>
      </header>

      <form className={style.EditSurveyMain} onSubmit={handleSubmit}>
        {/* ...other input fields */}
        <label className={style.inputContainer}>
          <input
            type="text"
            disabled
            name="name"
            value={formData.id}
            onChange={handleInputChange}
          />
          <span>Survey Id</span>
        </label>
        <label className={style.inputContainer}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <span> Name</span>
        </label>
        <label className={style.inputContainer}>
          <input
            type="text"
            value={formData.endpointLink}
            name="endpointLink"
            onChange={handleInputChange}
          />
          <span>Endpoint url</span>
        </label>
        {/* ...other input fields */}
        <div className={style.switchContainer}>
          <p>Enable/disable Survey</p>
          <Switch
            checked={formData.status === "enabled"}
            onChange={handleSwitchChange}
          />
        </div>
        <div className={style.edit_cta}>
          <button
            type="button"
            onClick={() => navigate("/dashboard/survey-data")}
          >
            Cancel
          </button>
          <button type="submit">Update Survey</button>
        </div>
      </form>
    </div>
  );
}

export default EditSurvey;
