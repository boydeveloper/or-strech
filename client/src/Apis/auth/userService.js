const BASE_URL = "http://localhost:8081/api";
export const deleteUser = async (mail) => {
  console.log(mail);
  try {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    const res = await fetch(
      `${BASE_URL}/users/deleteUser?email=${mail}`,
      requestOptions
    );
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
