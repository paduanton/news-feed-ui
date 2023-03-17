import axios from "axios";
import { NEWS_API_BASE_URL, authenticationHeader } from "./env";

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
      return responseBody;
    });
};

const logout = () => {
  return axios
    .post(`${NEWS_API_BASE_URL}/logout`,  
    { 
      headers: authenticationHeader()
    })
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

