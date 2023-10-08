import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const userString = sessionStorage.getItem("or_user");

export const deleteUser = async (mail, token) => {
  const user = await JSON.parse(userString);
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(
      `${BASE_URL}/users/deleteUser?email=${mail}`,
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
