import axios from "axios";

const { token } = JSON.parse(localStorage.getItem("user")) || null;
console.log(token);

const AxiosInstance = axios.create({
  baseURL: "https://mern-blog-9kew.onrender.com/api/",
  headers: { Authorization: `Bearer ${token}` },
});

export default AxiosInstance;
