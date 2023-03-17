import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import AuthService from "../services/auth.service";

// TODO
/*
  Implement Http Interceptor to handle API requests/responses
*/

export const signup = (name, username, email, password, rememberMe) => (dispatch) => {
  return AuthService.signup(name, username, email, password, rememberMe).then(
    (response) => {      
      const userId = response.id;
      const accessToken = response.auth_resource.access_token;

      const user = {
        userId,
        accessToken,
      };

      localStorage.setItem("userId", userId);
      localStorage.setItem("accessToken", accessToken);
      
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: { user: user },
      });

      return Promise.resolve();
    },
    (error) => {
      const message = error.response.data.message;

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (email, password, rememberMe) => (dispatch) => {
  return AuthService.login(email, password, rememberMe).then(
    (response) => {
      const userId = response.id;
      const accessToken = response.auth_resource.access_token;

      localStorage.setItem("userId", userId);
      localStorage.setItem("accessToken", accessToken);

      const user = {
        userId,
        accessToken,
      }
      
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: user },
      });

      return Promise.resolve();
    },
    (error) => {
      const message = error.response.data.message;

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  return AuthService.logout().then(
    (data) => {
      dispatch({
        type: LOGOUT,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = error.response.data.message;

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
