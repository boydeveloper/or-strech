const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const getAllUsers = async () => {
  try {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(
      `${BASE_URL}/users/listAllUsers`,
      requestOptions
    );
    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const getUsers = async (page_no, no_of_users) => {
  try {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(
      `${BASE_URL}/users/listUsers/?page_no=${page_no}&no_of_users=${no_of_users}`,
      requestOptions
    );
    const data = response.json();
    return data;
  } catch (error) {}
};

export const updateUser = async (payload, mail) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(payload);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(
      `${BASE_URL}/users/updateUser?email=${mail}`,
      requestOptions
    );
    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
