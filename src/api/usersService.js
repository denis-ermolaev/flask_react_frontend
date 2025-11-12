import axios from "axios";

const URL = "http://localhost:5000";

export async function fetchUsers(page, per_page) {
  try {
    const responce = await axios.get(`${URL}/users`, {
      params: {
        page,
        per_page,
      },
    });
    return responce.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return error.response?.data;
  }
}

export async function fetchUser(id) {
  try {
    const response = await axios.get(`${URL}/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return error.response?.data;
  }
}

export async function addUser(name, email) {
  try {
    const response = await axios.post(`${URL}/user`, {
      name,
      email,
    });
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return error.response?.data;
  }
}
