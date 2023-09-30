const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
export const getAllTags = async () => {
  try {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(
      `${BASE_URL}/tags/listAllTags`,
      requestOptions
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const createTag = async (payload) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(payload);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(`${BASE_URL}/tags/createTag`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const updateTag = async (payload, name) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(payload);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
    };
    const response = await fetch(
      `${BASE_URL}/tags/updateTag?name=${name}`,
      requestOptions
    );
    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const deleteTag = async (name) => {
  try {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };
    const response = await fetch(
      `${BASE_URL}/tags/deleteTag?name=${name}`,
      requestOptions
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
