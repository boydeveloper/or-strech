const BASE_URL = "http://localhost:8081/api";

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
