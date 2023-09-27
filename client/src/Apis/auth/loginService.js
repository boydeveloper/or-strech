import axios from "axios";
const BASE_URL = "http://localhost:8081/api";

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
    console.log(error);
  }
};
