const NEWS_API_BASE_URL = "http://localhost:8000/v1";

const authenticationHeader = () => {
	const accessToken = localStorage.getItem("accessToken");
      
	if (accessToken) {
	  return { Authorization: `Bearer ${accessToken}`};
	}
	  return {};
      }
      
module.exports = { NEWS_API_BASE_URL, authenticationHeader } ;
