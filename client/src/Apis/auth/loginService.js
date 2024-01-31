import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const authenticateUser = async (email) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      email: email,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(
      `${BASE_URL}/accounts/loginAccount`,
      requestOptions
    );
    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const checkUserIsNew = async (email) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      email: email,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      `${BASE_URL}/accounts/checkIsNew`,
      requestOptions
    );
    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const authenticateAdmin = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/accounts/loginAdminAccount`,
      payload
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
