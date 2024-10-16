import axios from "axios";

const user = JSON.parse(localStorage.getItem("user")) || null;

console.log(user?.token);

const AxiosInstance = axios.create({
  baseURL: "https://mern-blog-9kew.onrender.com/api/",
  headers: { Authorization: `Bearer ${user?.token}` },
});

export default AxiosInstance;
