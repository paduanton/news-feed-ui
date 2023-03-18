import axios from "axios";
import { NEWS_API_BASE_URL, authenticationHeader } from "./env";

const getArticles = (keyword, categories = [], sources = [], authors = [], dateSort = 'newest')  => {

  const queryParams = new URLSearchParams({
    categories: categories.toString(),
    sources: sources.toString(),
    authors: authors.toString(),
    dateSort
  }).toString()

  return axios.get(`${NEWS_API_BASE_URL}/users/${keyword}/feed_preferences?${queryParams}`, 
    { 
      headers: authenticationHeader()
    }
  )
  .then((response) => {
    const { total_results, articles } = response.data;
    const parsedArticles = articles.map((article) => {
      const { title, section , image_url, category, author, source, source_url, published_at } = article;
      return {
        title,
        section,
        imageURL: image_url,
        category,
        author,
        source,
        sourceURL: source_url,
        publishedAt: published_at
      }
    });

    return {
      total_results,
      articles: parsedArticles,
    }
  });
};

export default {
  getArticles,
};