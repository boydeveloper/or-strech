import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const getAllTags = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${BASE_URL}/tags/listAllTags`, {
      headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getTags = async (page_no, searchTerm, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${BASE_URL}/tags/listTags?page_no=${page_no}&name=${searchTerm}`,
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
export const createTag = async (payload, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(`${BASE_URL}/tags/createTag`, payload, {
      headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateTag = async (payload, name, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(
      `${BASE_URL}/tags/updateTag?name=${name}`,
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
export const deleteTag = async (name, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(
      `${BASE_URL}/tags/deleteTag?name=${name}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getExportsTags = async (token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(`${BASE_URL}/tags/exportTags`, {
      headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
