import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the auth token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Matches your existing cookie logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle global errors (like 401 Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optional: Clear cookies and redirect to login if session expires
      Cookies.remove("token");
      window.location.href = "/"; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;