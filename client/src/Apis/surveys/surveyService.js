import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
export const getEodSurveys = async (page_no) => {
  try {
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    const response = await axios.get(
      `${BASE_URL}/endofdaysurvey/getEndOfDaySurveys?page_no=${page_no}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBaselineSurveys = async (page_no, no_of_baseline) => {
  try {
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    const response = await axios.get(
      `${BASE_URL}/baselinesurvey/getBaselineSurveys?page_no=${page_no}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const trigBaselineSurvey = async (email) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/baselinesurvey/triggerBaselineSurveyWorkflow`,
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const trigEodSurvey = async (email) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/endofdaysurvey/triggerEndOfDaySurveyWorkflow`,
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
