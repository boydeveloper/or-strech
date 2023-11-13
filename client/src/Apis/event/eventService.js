import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
export const createEvent = async (payload, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(
      `${BASE_URL}/events/createEvent`,
      payload,
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

export const getRecentLogin = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${BASE_URL}/events/getPreviousLogins`, {
      headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getExportsEvents = async (token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(`${BASE_URL}/events/exportEvents`, {
      headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
