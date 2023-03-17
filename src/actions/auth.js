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
      dispatch({
        type: SIGNUP_SUCCESS,
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
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
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
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
