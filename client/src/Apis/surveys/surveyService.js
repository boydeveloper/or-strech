import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
export const getEodSurveys = async (
  token,
  page_no,
  surveys_per_page,
  userid,
  day,
  createdAt,
  complex_surgeries,
  difficult_surgeries,
  distracting,
  flow_impact,
  id,
  impact_fatigue,
  impact_mental,
  impact_pain,
  impact_physical,
  mentaly_demanding_surgeries,
  physically_demanding_surgeries,
  updatedAt
) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log(token, "tokehn survey");
    const response = await axios.get(
      `${BASE_URL}/endofdaysurvey/getEndOfDaySurveys?page_no=${page_no}&surveys_per_page=${surveys_per_page}&userid=${userid}&day=${day}&createdAt=${createdAt}&complex_surgeries=${complex_surgeries}&difficult_surgeries=${difficult_surgeries}&distracting=${distracting}&flow_impact=${flow_impact}&id=${id}&impact_fatigue=${impact_fatigue}&impact_mental=${impact_mental}&impact_pain=${impact_pain}&impact_physical=${impact_physical}&mentaly_demanding_surgeries=${mentaly_demanding_surgeries}&physically_demanding_surgeries=${physically_demanding_surgeries}&updatedAt=${updatedAt}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBaselineSurveys = async (
  token,
  page_no,
  no_of_baseline,
  days_per_week,
  age,
  pain_open_surgery,
  pain_laparoscopic_surgery,
  pain_robotic_surgery,
  pain_past_six_months,
  pain_interfered_relations,
  pain_interfered_sleep,
  height,
  gender,
  handness,
  glove_size,
  userid,
  surgical_procedures_day,
  exercise,
  primary_speciality,
  years_open_surgery,
  years_laparoscopic_surgery,
  years_robotic_surgery,
  most_common_procedures_a,
  most_common_procedures_b,
  most_common_procedures_c,
  createdAt,
  updatedAt
) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log(token, "tokehn survey");
    const response = await axios.get(
      `${BASE_URL}/baselinesurvey/getBaselineSurveys?page_no=${page_no}&no_of_surveys=${no_of_baseline}&age=${age}&pain_open_surgery=${pain_open_surgery}&days_per_week=${days_per_week}&pain_laparoscopic_surgery=${pain_laparoscopic_surgery}&pain_robotic_surgery=${pain_robotic_surgery}&pain_past_six_months=${pain_past_six_months}&pain_interfered_relations=${pain_interfered_relations}&pain_interfered_sleep=${pain_interfered_sleep}&height=${height}&gender=${gender}&handness=${handness}&glove_size=${glove_size}&surgical_procedures_day=${surgical_procedures_day}&exercise=${exercise}&primary_speciality=${primary_speciality}&years_open_surgery=${years_open_surgery}&years_laparoscopic_surgery=${years_laparoscopic_surgery}&years_robotic_surgery=${years_robotic_surgery}&most_common_procedures_a=${most_common_procedures_a}&most_common_procedures_b=${most_common_procedures_b}&most_common_procedures_c=${most_common_procedures_c}&createdAt=${createdAt}&updatedAt=${updatedAt}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const trigBaselineSurvey = async (email, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(
      `${BASE_URL}/baselinesurvey/triggerBaselineSurveyWorkflow`,
      {
        email,
      },
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const trigEodSurvey = async (email, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(
      `${BASE_URL}/endofdaysurvey/triggerEndOfDaySurveyWorkflow`,
      {
        email,
      },
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCustomSurveys = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${BASE_URL}/survey/getAllSurveys`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCustomSurvey = async (id, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(`${BASE_URL}/survey/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createSurvey = async (data, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${BASE_URL}/survey/createSurvey`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateSurvey = async (token, id, data) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(`${BASE_URL}/survey/edit/${id}`, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
