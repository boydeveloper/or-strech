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
  } catch (error) {}
};
