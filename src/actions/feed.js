import {
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_FEED_PREFERENCE,
  SET_MESSAGE,
} from "./types";

import FeedService from "../services/feed.service";

// TODO
/*
  Implement Http Interceptor to handle API requests/responses
*/

export const storeFeedPreference = (userId, content, type) => (dispatch) => {
  return FeedService.storeFeedPreference(userId, content, type).then(
    (response) => {      
      dispatch({
        type: SET_FEED_PREFERENCE,
        payload: { content, type},
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

export const deleteFeedPreference = (id) => (dispatch) => {
  return FeedService.deleteFeedPreference(id).then(
    (data) => {
      
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
