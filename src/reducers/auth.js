import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

const userId = localStorage.getItem("userId");
const accessToken = localStorage.getItem("accessToken");
const user = {
  userId,
  accessToken,
}
const initialState = (userId && accessToken)
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function auth (state = initialState, action) {
  const { type, payload } = action;
  
  switch (type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
