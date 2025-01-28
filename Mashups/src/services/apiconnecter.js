import axios from "axios";

// Create an Axios instance
export const axiosinstance = axios.create({
  baseURL: process.env.NODE_ENV === "production" 
    ? "https://mashupsbackand.vercel.app/api/" 
    : "http://localhost:4001/api/",
  headers: {  
    "Content-Type": "application/json", // Default Content-Type
  },
});

// Utility function for API calls
export const apiconnecter = (method, url, bodydata = null, headers = {}, params = {}) => {
  return axiosinstance({
    method, // HTTP method (GET, POST, DELETE, etc.)
    url,    // API endpoint
    data: bodydata, // Request body
    headers: { ...axiosinstance.defaults.headers, ...headers }, // Merge default and custom headers
    params, // Query parameters
  });
};

// Example usage:
// apiconnecter("post", "users/addFavorite", { songId: "123", userId: "456" });
