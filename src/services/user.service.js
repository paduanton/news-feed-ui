import axios from "axios";
import { NEWS_API_BASE_URL, authenticationHeader } from "./env";

const getUser = (id)  => {
  return axios.get(`${NEWS_API_BASE_URL}/users/${id}`, 
    { 
      headers: authenticationHeader()
    }
  )
  .then((response) => {
    const { name, email, username, created_at} = response.data;
    return {
      name,
      username,
      email,
      createdAt: created_at,
    };
  });
};

const getUserFeedPreferences = (id)  => {
  return axios.get(`${NEWS_API_BASE_URL}/users/${id}/feed_preferences`, 
    { 
      headers: authenticationHeader()
    }
  )
  .then((response) => {
    const { type, content, created_at } = response.data;
    return {
      type,
      content,
      createdAt: created_at,
    };
  });
};




export default {
  getUser,
  getUserFeedPreferences,
};