import { SET_FEED_PREFERENCE } from "../actions/types";

const initialState = {};

export default function feed (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_FEED_PREFERENCE:
      return { preference: payload };
    default:
      return state;
  }
}
