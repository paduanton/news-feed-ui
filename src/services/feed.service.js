import axios from "axios";
import { NEWS_API_BASE_URL, authenticationHeader } from "./env";

const deleteFeedPreference = (id)  => {
  return axios.delete(`${NEWS_API_BASE_URL}/feed_preferences/${id}`, 
    { 
      headers: authenticationHeader()
    }
  );
};

const storeFeedPreference = (userId, content, type)  => {
  return axios.post(`${NEWS_API_BASE_URL}/users/${userId}/feed_preferences`,
    {
      content,
      type
    },
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



const getUserFeedPreferences = (id)  => {
  return axios.get(`${NEWS_API_BASE_URL}/users/${id}/feed_preferences`, 
    { 
      headers: authenticationHeader()
    }
  )
  .then((response) => {
    const feedPreferences = response.data;

    const parsedFeedPreferences = feedPreferences.map((feedPreference) => {
      const { id, type, content, created_at } = feedPreference;
      
      return {
        id,
        type,
        content,
        createdAt: created_at,
      };
    });

    return parsedFeedPreferences;
  });
};

export default {
  deleteFeedPreference,
  storeFeedPreference,
  getUserFeedPreferences,
};