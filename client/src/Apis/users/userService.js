import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const getAllUsers = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${BASE_URL}/users/listAllUsers`, {
      headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getUsers = async (
  page_no,
  no_of_users,
  token,
  name,
  email,
  tag,
  order,
  createdAt,
  updatedAt,
  id
) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${BASE_URL}/users/listUsers/?email=${email}&page_no=${page_no}&no_of_users=${no_of_users}id=${id}&tags=${tag}&name=${name}&order=DESC&sortBy=tags_excel&createdAt=${createdAt}&updatedAt=${updatedAt}`,
      {
        headers,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getUserDetails = async (mail, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${BASE_URL}/users/userDetails?email=${mail}`,
      {
        headers,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserActivities = async (page_no, no_of_events, token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(
      `${BASE_URL}/events/listEvents?page_no=${page_no}&no_of_events=${no_of_events}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (payload, token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${BASE_URL}/users/createUser`, payload, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateUser = async (payload, mail, token) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(
      `${BASE_URL}/users/updateUser?email=${mail}`,
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

export const getExports = async (url, token, name) => {
  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });
    const anchor = document.createElement("a");
    anchor.href = window.URL.createObjectURL(new Blob([response.data]));
    anchor.download = `OR-Stretch ${name}.csv`;
    anchor.click();
    window.URL.revokeObjectURL(anchor.href);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
