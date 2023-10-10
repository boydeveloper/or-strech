import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
export const getVideoLinks = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(`${BASE_URL}/links/listLinks`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addVideoLink = async (payload, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      `${BASE_URL}/links/createLink`,

      payload,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateVideoLink = async (payload, name, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(
      `${BASE_URL}/links/updateLink?name=${name}`,
      payload,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteVideoLink = async (name, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(
      `${BASE_URL}/links/deleteLink?name=${name}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getLinkDetails = async (name, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${BASE_URL}/links/linkDetails?name=${name}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
