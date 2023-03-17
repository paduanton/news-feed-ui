import axios from "axios";
import NEWS_API_BASE_URL from "./env";

const signup = (name, username, email, password, rememberMe)  => {
  return axios.post(`${NEWS_API_BASE_URL}/signup`, {
    name,
    username,
    email,
    password,
    remember_me: rememberMe,
  })
  .then((response) => {
      const responseBody = response.data;


      localStorage.setItem("userId", responseBody.id);
      localStorage.setItem("accessToken", responseBody.auth_resource.access_token);

    return responseBody;
  });
};

const login = (email, password, rememberMe) => {
  return axios
    .post(`${NEWS_API_BASE_URL}/login`, {
      email,
      password,
      remember_me: rememberMe,
    })
    .then((response) => {
      const responseBody = response.data;

      localStorage.setItem("userId", responseBody.id);
      localStorage.setItem("accessToken", responseBody.auth_resource.access_token);

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

