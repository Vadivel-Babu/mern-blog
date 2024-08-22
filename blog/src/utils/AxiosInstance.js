import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
});

AxiosInstance.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer`;
  return config;
});

export default AxiosInstance;
