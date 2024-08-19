import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://mern-blog-9kew.onrender.com/api/",
});

AxiosInstance.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Beara`;
  return config;
});

export default AxiosInstance;
