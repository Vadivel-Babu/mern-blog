import axios from "axios";

// const user = JSON.parse(localStorage.getItem("user")) || null;

// console.log(user?.token);

const AxiosInstance = axios.create({
  //withCredentials: true,
  baseURL: "http://localhost:4000/api/",
  // headers: { Authorization: `Bearer ${user?.token}` },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token from local storage

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add token to Authorization header
    }

    return config;
  },

  (error) => console.log(error)
);

export default AxiosInstance;
