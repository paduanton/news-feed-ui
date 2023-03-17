import axios from "axios";
import NEWS_API_BASE_URL from "./env";

const signup = (name, username, email, password, rememberMe)  => {
  return axios.post(`${NEWS_API_BASE_URL}/signup`, {
    name,
    username,
    email,
    password,
    rememberMe,
  })
  .then((response) => {
      const responseBody = JSON.stringify(response.data);

      localStorage.setItem("userId", responseBody.id);
      localStorage.setItem("accessToken", responseBody.accessToken);

    return responseBody;
  });
};

const login = (email, password) => {
  return axios
    .post(`${NEWS_API_BASE_URL}/login`, {
      email,
      password,
    })
    .then((response) => {
      const responseBody = JSON.stringify(response.data);

      localStorage.setItem("userId", responseBody.id);
      localStorage.setItem("accessToken", responseBody.accessToken);

      return responseBody;
    });
};

const logout = () => {
  return axios
    .post(`${NEWS_API_BASE_URL}/logout`, {})
    .then((response) => {

      localStorage.removeItem("userId");
      localStorage.removeItem("accessToken");

      return response;
    });
};

export default {
  signup,
  login,
  logout,
};
